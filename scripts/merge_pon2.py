#!/usr/bin/env python3
"""PON 재정리 조각을 하나로 합쳐 data/extras/pon.json (2판)을 만든다.

- data/_pon2_part_*.json : 항목 카드 (원문 대조, 확신도, 판정, 크기·빈도·심각성, 근거)
- data/_pon2_ctx_*.json  : 상황 이해 (착수 후보·보류만)
- data/_pon2_overview.json : 머리글, 깔때기, 카테고리 두 축, 용어

1판(data/extras/pon.json, 32개 표 형식)은 data/pon_v1.json 으로 남긴다.
"""
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT = DATA / "extras" / "pon.json"
V1 = DATA / "pon_v1.json"

CONF_ORDER = {"높음": 0, "중간": 1, "낮음": 2}
VERDICT_ORDER = {"착수 후보": 0, "보류": 1, "제외": 2}


def load_parts(pattern):
    items = {}
    for f in sorted(DATA.glob(pattern)):
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            print(f"  ! {f.name} 파싱 실패: {e}")
            continue
        for it in d.get("items") or []:
            if it.get("id"):
                items[it["id"]] = it
    return items


def main():
    if OUT.exists() and not V1.exists():
        old = json.loads(OUT.read_text(encoding="utf-8"))
        if old.get("version") != 2:
            shutil.copy(OUT, V1)
            print(f"1판 보관 → {V1}")

    cards = load_parts("_pon2_part_*.json")
    ctxs = load_parts("_pon2_ctx_*.json")
    verdicts = load_parts("_pon2_verdict.json")  # 재판정이 있으면 그것이 최종
    ov_file = DATA / "_pon2_overview.json"
    ov = json.loads(ov_file.read_text(encoding="utf-8")) if ov_file.exists() else {}

    v1_ids = [x["id"] for x in json.loads(V1.read_text(encoding="utf-8"))["items"]] if V1.exists() else []
    missing = [i for i in v1_ids if i not in cards]
    if missing:
        print("  ! 카드가 없는 항목:", ", ".join(missing))

    have_notes = {p.stem for p in (DATA / "notes").glob("*.json")}
    have_co = {p.stem for p in (DATA / "companies").glob("*.json")}
    assign = {a["id"]: a for a in ((ov.get("categories") or {}).get("assignments") or []) if a.get("id")}

    items = []
    bad_issue, bad_slug = set(), set()
    for cid, c in cards.items():
        it = dict(c)
        it.update({k: v for k, v in (ctxs.get(cid) or {}).items() if k != "id"})
        rv = verdicts.get(cid)
        if rv:
            it["verdict_first"] = c.get("verdict", "")
            it["verdict_first_why"] = c.get("verdict_why", "")
            it["verdict"] = rv.get("verdict") or it.get("verdict")
            it["verdict_why"] = rv.get("verdict_why") or it.get("verdict_why")
            it["merge_into"] = rv.get("merge_into", it.get("merge_into", ""))
        a = assign.get(cid) or {}
        it["axis1"] = a.get("axis1", "")
        it["axis2"] = a.get("axis2", "")
        it["cat_note"] = a.get("note", "")
        for e in it.get("evidence") or []:
            e["issue"] = str(e.get("issue", "")).zfill(2)
            if e["issue"] not in have_notes:
                bad_issue.add(f"{cid}:{e['issue']}")
        for q in it.get("quotes") or []:
            q["issue"] = str(q.get("issue", "")).zfill(2)
        for cs in it.get("cases") or []:
            if cs.get("slug") and cs["slug"] not in have_co:
                bad_slug.add(cs["slug"])
                cs["slug"] = ""
        it["verdict"] = it.get("verdict") or "보류"
        it["confidence"] = it.get("confidence") or "낮음"
        items.append(it)

    items.sort(key=lambda x: (VERDICT_ORDER.get(x["verdict"], 9), CONF_ORDER.get(x["confidence"], 9), x["id"]))
    kept = [x for x in items if x["verdict"] == "착수 후보"]
    for n, x in enumerate(kept, 1):
        x["num"] = f"{n:02d}"

    counts = {
        "kept": len(kept),
        "held": sum(1 for x in items if x["verdict"] == "보류"),
        "dropped": sum(1 for x in items if x["verdict"] == "제외"),
        "kind": {k: sum(1 for x in kept if x.get("kind") == k) for k in "PON"},
        "conf": {k: sum(1 for x in kept if x.get("confidence") == k) for k in CONF_ORDER},
        "cases": len({c.get("name") for x in kept for c in (x.get("cases") or []) if c.get("name")}),
        "evidence": sum(len(x.get("evidence") or []) for x in kept),
        "fixes": sum(1 for x in items for ch in (x.get("checks") or []) if ch.get("status") in ("틀림", "원문에 없음")),
        "measured": sum(1 for x in kept if all((x.get(k) or {}).get("grade") not in (None, "", "미측정") for k in ("size", "freq", "sev"))),
    }

    funnel = ov.get("funnel") or [
        {"n": 32, "label": "회차"}, {"n": 101, "label": "건질 것"}, {"n": 77, "label": "후보"},
        {"n": 32, "label": "병합"}, {"n": len(kept), "label": "착수 후보"},
    ]
    if funnel and funnel[-1].get("n") != len(kept):
        funnel[-1]["n"] = len(kept)

    cats = ov.get("categories") or {}
    cats.pop("assignments", None)

    out = {
        "version": 2,
        "title": re.sub(r"\d+개", f"{len(kept)}개", ov["title"]) if ov.get("title") else f"미국인이 우리 앱을 열 이유가 될 만한 문제 · 기회 · 니즈 {len(kept)}개",
        "lede": ov.get("lede") or "",
        "funnel": funnel,
        "funnel_text": ov.get("funnel_text") or "",
        "dropped_pattern": ov.get("dropped_pattern") or "",
        "verified_note": ov.get("verified_note") or "",
        "magnitude_text": ov.get("magnitude_text") or "",
        "categories": cats,
        "glossary": ov.get("glossary") or [],
        "counts": counts,
        "items": items,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"PON 2판 생성 → {OUT}")
    print(f"  항목 {len(items)}개 = 착수 후보 {counts['kept']} + 보류 {counts['held']} + 제외 {counts['dropped']}")
    print(f"  착수 후보 P{counts['kind']['P']} O{counts['kind']['O']} N{counts['kind']['N']} · 확신 높음 {counts['conf']['높음']} 중간 {counts['conf']['중간']} 낮음 {counts['conf']['낮음']}")
    print(f"  세 축 모두 측정 {counts['measured']}개 · 원문 대조로 고친 것 {counts['fixes']}건 · 사례 {counts['cases']} · 근거 {counts['evidence']}")
    print(f"  상황 이해 {sum(1 for x in items if x.get('how_it_works'))}개 · 카테고리 배정 {sum(1 for x in items if x.get('axis1'))}개 · 용어 {len(out['glossary'])}개")
    if not ov:
        print("  ! 머리글(_pon2_overview.json)이 아직 없다.")
    if verdicts:
        print(f"  재판정 반영 {len(verdicts)}개 · 1차와 달라진 것 {sum(1 for x in items if x.get('verdict_first') and x['verdict_first'] != x['verdict'])}개")
    if bad_issue:
        print("  ! 노트가 없는 회차를 가리키는 근거:", ", ".join(sorted(bad_issue)))
    if bad_slug:
        print("  ! 프로필이 없는 회사 슬러그(비움):", ", ".join(sorted(bad_slug)))


if __name__ == "__main__":
    main()
