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

    payload = {"issues": issues, "extras": extras, "themeLabels": THEME_LABELS,
               "raw": raw, "companies": companies}
    data = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    data = data.replace("</script", "<\\/script").replace("<!--", "<\\!--")

    html = TPL.read_text(encoding="utf-8").replace("__DATA__", data)
    OUT.write_text(html, encoding="utf-8")

    n_sec = sum(len(i.get("sections") or []) for i in issues)
    print(
        f"빌드 완료 → {OUT}\n"
        f"  회차 {len(issues)}건 · 꼭지 {n_sec}개 · 용어 {n_terms}개 · 원문 번역본 {len(raw)}건 · 회사 {len(companies)}곳 · "
        f"부록 {', '.join(sorted(extras)) or '없음'}\n"
        f"  크기 {OUT.stat().st_size/1024:.0f}KB"
    )


if __name__ == "__main__":
    main()
