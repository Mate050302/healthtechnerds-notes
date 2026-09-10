#!/usr/bin/env python3
"""회사 프로필을 더 조사할 대상을 고른다.

소비자가 스스로 고르고 자기 돈을 내는 회사(consumer, mixed)만 고른다.
병원·보험사·고용주를 상대하는 회사는 뉴스레터 한 줄로 충분하므로 조사하지 않는다.

사용법:
  python3 scripts/pick_companies.py            # 조사 대상 목록
  python3 scripts/pick_companies.py --todo     # 그중 아직 프로필이 없는 곳만
  python3 scripts/pick_companies.py --all      # 판정 결과 전체를 보여 준다
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGET = {"consumer", "mixed"}


def main():
    args = sys.argv[1:]
    rows, unset = [], []
    for f in sorted((ROOT / "data" / "notes").glob("*.json")):
        d = json.loads(f.read_text(encoding="utf-8"))
        for i, s in enumerate(d.get("sections") or []):
            for c in s.get("cases") or []:
                name = (c.get("name") or "").strip()
                if not name:
                    continue
                st = c.get("sells_to")
                row = {"issue": d["index"], "section": i + 1, "name": name,
                       "sells_to": st, "what": (c.get("what") or "")[:70],
                       "scale": (c.get("scale") or "")[:40],
                       "slug": re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")}
                (rows if st else unset).append(row)

    seen, picked = set(), []
    for r in rows:
        if r["sells_to"] in TARGET and r["slug"] not in seen:
            seen.add(r["slug"])
            picked.append(r)
    if "--todo" in args:
        picked = [r for r in picked
                  if not (ROOT / "data" / "companies" / f"{r['slug']}.json").exists()]

    if "--all" in args:
        from collections import Counter
        print("판매 대상 판정 분포:", dict(Counter(r["sells_to"] for r in rows)))
        print(f"판정이 아직 없는 사례 {len(unset)}건\n")

    print(f"조사 대상 {len(picked)}곳 (전체 사례 {len(rows) + len(unset)}건 중)")
    for r in picked:
        print(f"  {r['issue']}-{r['section']:2d}  {r['name'][:26]:28s} [{r['sells_to']}]  {r['what']}")
    if unset:
        print(f"\n판매 대상 판정이 없는 사례 {len(unset)}건 (옛 판본으로 만든 회차다)")
        for r in unset[:10]:
            print(f"  {r['issue']}-{r['section']:2d}  {r['name'][:26]:28s} {r['what']}")
        if len(unset) > 10:
            print(f"  … 외 {len(unset) - 10}건")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
