#!/usr/bin/env python3
"""회차 노트를 훑어 교차 문서(101·주제·타임라인·용어) 작성용 다이제스트를 만든다.

- data/_digest.md   : 회차별 제목/훅/요약/꼭지제목/테마  (전체 흐름 파악용)
- data/_terms.md    : 용어 빈도표 (정본 정의를 다시 쓸 상위 용어 고르기용)
- data/_players.md  : 등장 회사 빈도표
"""
import collections
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
NOTES = ROOT / "data" / "notes"
DATA = ROOT / "data"

TYPE_KO = {"reads": "테크 리즈", "policy": "정책 브리핑", "roundup": "그랜드 라운드업",
           "interview": "인터뷰", "event": "안내"}


def main():
    notes = []
    for p in sorted(NOTES.glob("*.json")):
        try:
            notes.append(json.loads(p.read_text(encoding="utf-8")))
        except Exception as e:  # noqa: BLE001
            print(f"! {p.name}: {e}")
    notes.sort(key=lambda x: str(x.get("index", "")))

    # ---------- digest ----------
    out = ["# Health Tech Nerds 회차 다이제스트",
           f"총 {len(notes)}회차. 각 회차의 제목·핵심요약·꼭지 목록·테마만 뽑은 것.", ""]
    for n in notes:
        out.append(f"## [{n.get('index')}] {n.get('date')} · {TYPE_KO.get(n.get('type'), n.get('type'))} — {n.get('title_ko')}")
        if n.get("hook"):
            out.append(f"- 훅: {n['hook']}")
        for t in n.get("tldr") or []:
            out.append(f"- 요약: {t}")
        secs = n.get("sections") or []
        if secs:
            out.append(f"- 꼭지 {len(secs)}개:")
            for s in secs:
                nums = ", ".join(f"{x.get('value')}({x.get('meaning','')[:22]})" for x in (s.get("numbers") or [])[:3])
                out.append(f"    - {s.get('heading_ko')}" + (f"  [{nums}]" if nums else ""))
        if n.get("themes"):
            out.append(f"- 테마: {', '.join(n['themes'])}")
        if n.get("for_later"):
            for f in n["for_later"]:
                out.append(f"- 나중에: {f}")
        out.append("")
    (DATA / "_digest.md").write_text("\n".join(out), encoding="utf-8")

    # ---------- terms ----------
    cnt = collections.Counter()
    defs = collections.defaultdict(list)
    for n in notes:
        seen = set()
        for s in n.get("sections") or []:
            for t in s.get("terms") or []:
                en = (t.get("en") or "").strip()
                if not en:
                    continue
                k = re.sub(r"\W+", "", en.lower())
                if k in seen:
                    continue
                seen.add(k)
                cnt[k] += 1
                defs[k].append((en, t.get("ko", ""), t.get("plain", ""), n.get("index")))
    lines = ["# 용어 빈도표", f"고유 용어 {len(cnt)}개. 회차 등장 수 기준 내림차순.", ""]
    for k, c in cnt.most_common():
        en, ko, plain, _ = defs[k][0]
        variants = {d[1] for d in defs[k] if d[1]}
        lines.append(f"- **{en}** ({c}회차) — {ko} / {plain}")
        if len(variants) > 1:
            lines.append(f"    - 회차별 다른 번역: {' | '.join(sorted(variants))}")
    (DATA / "_terms.md").write_text("\n".join(lines), encoding="utf-8")

    # ---------- players ----------
    pc = collections.Counter()
    pd = {}
    for n in notes:
        seen = set()
        for s in n.get("sections") or []:
            for pl in s.get("players") or []:
                nm = (pl.get("name") or "").strip()
                if not nm or nm.lower() in seen:
                    continue
                seen.add(nm.lower())
                pc[nm] += 1
                pd.setdefault(nm, pl.get("what", ""))
    plines = ["# 등장 회사·기관 빈도표", f"총 {len(pc)}곳.", ""]
    for nm, c in pc.most_common():
        plines.append(f"- **{nm}** ({c}회차) — {pd.get(nm,'')}")
    (DATA / "_players.md").write_text("\n".join(plines), encoding="utf-8")

    print(f"다이제스트 생성: 회차 {len(notes)} · 용어 {len(cnt)} · 회사 {len(pc)}")
    for f in ("_digest.md", "_terms.md", "_players.md"):
        print(f"  data/{f}  {(DATA/f).stat().st_size/1024:.0f}KB")


if __name__ == "__main__":
    main()
