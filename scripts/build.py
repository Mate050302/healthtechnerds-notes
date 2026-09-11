#!/usr/bin/env python3
"""Health Tech Nerds 정리 노트 — 정적 사이트 빌더.

data/notes/*.json (회차별 노트) + data/extras/*.json (101/용어/주제/타임라인/홈)
을 읽어 단일 index.html 을 만든다. 외부 의존성 없음.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
NOTES = ROOT / "data" / "notes"
EXTRAS = ROOT / "data" / "extras"
TPL = ROOT / "scripts" / "template.html"
OUT = ROOT / "index.html"

THEME_LABELS = {
    "medicare": "메디케어",
    "medicare-advantage": "메디케어 어드밴티지",
    "medicaid": "메디케이드",
    "aca-exchange": "ACA 거래소",
    "employer-insurance": "고용주 보험",
    "payer-ops": "보험사 운영",
    "hospital-health-system": "병원·헬스시스템",
    "primary-care": "1차 진료",
    "value-based-care": "성과기반 진료",
    "rcm-billing": "청구·수납",
    "pbm-drug-pricing": "PBM·약값",
    "pharmacy-retail": "약국·리테일",
    "pharma-glp1": "제약·GLP-1",
    "price-transparency": "가격 투명성",
    "consumer-dtc": "소비자 직접판매",
    "cash-pay": "현금 결제 시장",
    "employer-benefits": "복리후생",
    "ai-clinical": "임상 AI",
    "ai-admin": "행정 AI",
    "data-interop": "데이터 상호운용",
    "telehealth": "원격진료",
    "behavioral-mental": "정신건강",
    "chronic-care": "만성질환 관리",
    "senior-care": "시니어 케어",
    "women-health": "여성 건강",
    "dental-vision": "치과·안과",
    "devices-wearables": "기기·웨어러블",
    "digital-health-funding": "투자·펀딩",
    "ma-consolidation": "인수합병",
    "regulation-cms": "CMS 규제",
    "regulation-fda": "FDA 규제",
    "policy-legislation": "입법·정책",
    "public-health": "공중보건",
    "workforce": "인력",
    "rural-access": "의료 접근성",
    "clinical-trials": "임상시험",
    "insurance-brokerage": "보험 유통",
    "startups": "스타트업",
    "market-earnings": "실적·시장",
}

TYPES = {"reads", "policy", "roundup", "interview", "event"}


def load_notes():
    items = []
    problems = []
    for p in sorted(NOTES.glob("*.json")):
        try:
            d = json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            problems.append(f"{p.name}: JSON 파싱 실패 — {e}")
            continue
        for k in ("index", "date", "type", "title_ko"):
            if not d.get(k):
                problems.append(f"{p.name}: 필수 필드 '{k}' 없음")
        if d.get("type") not in TYPES:
            problems.append(f"{p.name}: 알 수 없는 type={d.get('type')!r}")
        d["index"] = str(d.get("index", "")).zfill(2)
        d.setdefault("themes", [])
        d["themes"] = [t for t in d["themes"] if t]
        items.append(d)
    items.sort(key=lambda x: x["index"])
    return items, problems


def load_extras():
    out = {}
    for p in sorted(EXTRAS.glob("*.json")):
        try:
            out[p.stem] = json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            print(f"  ! extras/{p.name} 파싱 실패: {e}", file=sys.stderr)
    return out


def merge_glossary(issues, extras):
    """회차별 terms 를 전부 모아 전역 용어사전에 없는 항목을 채우고 refs 를 붙인다."""
    glo = extras.setdefault("glossary", {"items": []})
    items = glo.setdefault("items", [])
    by_key = {}
    for it in items:
        by_key[re.sub(r"\W+", "", (it.get("en") or "").lower())] = it
    for iss in issues:
        seen_here = set()
        pool = list(iss.get("glossary") or [])
        for s in iss.get("sections") or []:
            # 새 구조는 notes(term/ko/plain), 옛 구조는 terms(en/ko/plain) 를 쓴다.
            for t in s.get("notes") or []:
                pool.append({"en": t.get("term", ""), "ko": t.get("ko", ""), "plain": t.get("plain", "")})
            pool.extend(s.get("terms") or [])
        for t in pool:
            en = (t.get("en") or "").strip()
            if not en:
                continue
            key = re.sub(r"\W+", "", en.lower())
            if key in seen_here:
                continue
            seen_here.add(key)
            tgt = by_key.get(key)
            if tgt is None:
                tgt = {"en": en, "ko": t.get("ko", ""), "plain": t.get("plain", ""), "refs": []}
                by_key[key] = tgt
                items.append(tgt)
            if not tgt.get("plain") and t.get("plain"):
                tgt["plain"] = t["plain"]
            if not tgt.get("ko") and t.get("ko"):
                tgt["ko"] = t["ko"]
            tgt.setdefault("refs", [])
            if iss["index"] not in tgt["refs"]:
                tgt["refs"].append(iss["index"])
    items.sort(key=lambda x: (x.get("en") or "").lower())
    for t in items:
        t["refs"] = sorted(t.get("refs", []))
    return len(items)


def fill_theme_refs(issues, extras):
    themes = extras.get("themes")
    if not themes:
        return
    for x in themes.get("items", []):
        keys = x.get("keys") or []
        refs = [i["index"] for i in issues if set(keys) & set(i.get("themes", []))]
        if refs and not x.get("refs"):
            x["refs"] = refs


def main():
    issues, problems = load_notes()
    extras = load_extras()
    if problems:
        print("데이터 경고:")
        for p in problems:
            print("  -", p)
    n_terms = merge_glossary(issues, extras)
    fill_theme_refs(issues, extras)

    used = sorted({t for i in issues for t in i.get("themes", [])})
    unknown = [t for t in used if t not in THEME_LABELS]
    if unknown:
        print("라벨 없는 테마(원문 표기로 노출됨):", ", ".join(unknown))

    raw = {}
    raw_dir = ROOT / "data" / "raw_ko"
    if raw_dir.exists():
        for p2 in sorted(raw_dir.glob("*.json")):
            try:
                raw[p2.stem] = json.loads(p2.read_text(encoding="utf-8"))
            except Exception as e:  # noqa: BLE001
                print(f"  ! raw_ko/{p2.name} 파싱 실패: {e}")

    companies = {}
    cdir = ROOT / "data" / "companies"
    if cdir.exists():
        for p3 in sorted(cdir.glob("*.json")):
            try:
                c = json.loads(p3.read_text(encoding="utf-8"))
                companies[c.get("slug") or p3.stem] = c
            except Exception as e:  # noqa: BLE001
                print(f"  ! companies/{p3.name} 파싱 실패: {e}")

    # 회차가 늘수록 한 파일이 무거워지므로, 본문은 조각 파일로 빼고
    # 첫 화면에는 목록을 그리는 데 필요한 만큼만 담는다.
    site = ROOT / "site"
    if site.exists():
        for old_f in site.glob("*.json"):
            old_f.unlink()
    site.mkdir(exist_ok=True)

    def dump(name, obj):
        (site / name).write_text(json.dumps(obj, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    index_issues = []
    for it in issues:
        secs = it.get("sections") or []
        ii = it.get("issue_insight") or {}
        # 검색은 목록에서 이루어지므로 훑을 만큼의 글자만 색인에 넣는다.
        bits = [it.get("title_ko", ""), it.get("title_en", ""), it.get("hook", "")]
        for t in it.get("tldr") or []:
            bits.append(t.get("point", "") if isinstance(t, dict) else str(t))
        for sec in secs:
            bits.append(sec.get("heading_ko", ""))
            bits.append(sec.get("heading_en", ""))
            for c in sec.get("cases") or []:
                bits.append(c.get("name", ""))
            for n in sec.get("notes") or []:
                bits.append(n.get("term", ""))
        index_issues.append({
            "index": it["index"], "date": it.get("date", ""), "type": it.get("type", ""),
            "title_ko": it.get("title_ko", ""), "title_en": it.get("title_en", ""),
            "hook": it.get("hook", ""), "themes": it.get("themes", []),
            "n_sec": len(secs),
            "n_build": len(ii.get("build") or []), "n_signal": len(ii.get("signal") or []),
            "q": " ".join(x for x in bits if x).lower(),
        })
        dump(f"issue-{it['index']}.json", {"issue": it, "raw": raw.get(it["index"])})

    index_companies = []
    for slug, c in companies.items():
        cd = c.get("card") or {}
        index_companies.append({
            "slug": slug, "name": c.get("name", ""), "one_liner": c.get("one_liner", ""),
            "sells_to": c.get("sells_to", ""), "seen_in": c.get("seen_in", []),
            "card": cd, "screenshots": (c.get("screenshots") or [])[:3],
            "q": json.dumps(c, ensure_ascii=False).lower(),
        })
        dump(f"company-{slug}.json", c)

    dump("extras.json", extras)

    payload = {"issues": index_issues, "companies": index_companies,
               "themeLabels": THEME_LABELS, "split": True}
    data = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    data = data.replace("</script", "<\\/script").replace("<!--", "<\\!--")

    html = TPL.read_text(encoding="utf-8").replace("__DATA__", data)
    OUT.write_text(html, encoding="utf-8")
    n_parts = len(list(site.glob("*.json")))

    n_sec = sum(len(i.get("sections") or []) for i in issues)
    print(
        f"빌드 완료 → {OUT}\n"
        f"  회차 {len(issues)}건 · 꼭지 {n_sec}개 · 용어 {n_terms}개 · 원문 번역본 {len(raw)}건 · 회사 {len(companies)}곳 · "
        f"부록 {', '.join(sorted(extras)) or '없음'}\n"
        f"  첫 화면 {OUT.stat().st_size/1024:.0f}KB · 조각 파일 {n_parts}개"
    )


if __name__ == "__main__":
    main()
