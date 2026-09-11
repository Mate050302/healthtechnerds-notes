#!/usr/bin/env python3
"""리포트 조각을 하나로 합쳐 data/extras/report.json 을 만든다.

- data/_report_part_*.json : 회차별 정리 (네 묶음)
- data/_report_overview.json : 머리글

머리글이 아직 없으면 회차별 정리만으로 리포트를 만든다.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
OUT = DATA / "extras" / "report.json"


def main():
    issues = []
    for f in sorted(DATA.glob("_report_part_*.json")):
        d = json.loads(f.read_text(encoding="utf-8"))
        issues.extend(d.get("issues") or [])
    issues.sort(key=lambda x: str(x.get("index", "")))

    ov_file = DATA / "_report_overview.json"
    ov = json.loads(ov_file.read_text(encoding="utf-8")) if ov_file.exists() else {}

    report = {
        "title": ov.get("title") or "32회차에서 건질 것",
        "lede": ov.get("lede") or "미국 헬스테크 뉴스레터 32회차를 소비자 헬스케어 관점으로 훑어 건질 것만 모은 리포트다.",
        "overview": ov.get("overview") or {},
        "issues": issues,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")

    n_items = sum(len(x.get("items") or []) for x in issues)
    n_build = sum(1 for x in issues for i in (x.get("items") or []) if i.get("kind") == "build")
    n_signal = n_items - n_build
    n_empty = sum(1 for x in issues if not (x.get("items") or []))
    n_theme = len((report["overview"] or {}).get("themes") or [])
    n_co = len({c for x in issues for i in (x.get("items") or []) for c in (i.get("companies") or [])})

    print(f"리포트 생성 → {OUT}")
    print(f"  회차 {len(issues)}건 (건질 것 없는 회차 {n_empty}건)")
    print(f"  항목 {n_items}개 = 만들 것 {n_build} + 시장 신호 {n_signal}")
    print(f"  관통하는 줄기 {n_theme}개 · 연결된 회사 {n_co}곳")
    if not n_theme:
        print("  ! 머리글이 아직 없다. _report_overview.json 이 만들어지면 다시 돌린다.")

    # 연결된 회사 슬러그가 실재하는지 확인한다.
    have = {p.stem for p in (DATA / "companies").glob("*.json")}
    bad = {c for x in issues for i in (x.get("items") or []) for c in (i.get("companies") or []) if c not in have}
    if bad:
        print("  ! 프로필이 없는 회사 슬러그:", ", ".join(sorted(bad)))


if __name__ == "__main__":
    main()
