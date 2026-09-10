#!/usr/bin/env python3
"""워크플로우 실행본을 만든다.

wf_notes2.js 는 틀이고, 실제로 돌릴 때는 (1) 한국어 문장 지침 전문과
(2) 처리할 회차 목록을 주입한 실행본이 필요하다. 두 가지를 빠뜨리기 쉬워서
이 스크립트로 한 번에 묶는다.

사용법:
  python3 scripts/make_run.py 26 54            # 특정 회차만
  python3 scripts/make_run.py --all-reads      # Weekly Health Tech Reads 32건 전부
  python3 scripts/make_run.py --all-reads --todo   # 그중 노트가 아직 없는 회차만
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path.home() / "Downloads" / "HealthTechNerds_뉴스레터_20260910"
STYLE_FILE = pathlib.Path.home() / ".claude/output-styles/fluent-korean-not-coding.md"
TEMPLATE = ROOT / "scripts" / "wf_notes2.js"
OUT = ROOT / "scripts" / "wf_run_gen.js"


def style_const() -> str:
    body = re.sub(r"^---\n.*?\n---\n", "", STYLE_FILE.read_text(encoding="utf-8"), flags=re.S).strip()
    text = (
        "## 한국어 문장 지침 (사용자 전역 출력 지침, 전문)\n"
        "아래는 이 사용자가 모든 한국어 산출물에 요구하는 문장 지침이다. "
        "요약하지 말고 전문을 그대로 적용한다.\n"
        "다만 이 노트는 설명문이므로 종결 어미는 '~다' 체로 통일한다. "
        "'~다' 체 역시 종결 어미이므로 아래 지침의 2번 조항에 어긋나지 않는다.\n\n" + body
    )
    return "const STYLE = " + json.dumps(text, ensure_ascii=False)


def issues(only_reads=True):
    out = []
    for p in sorted(SRC.glob("*.md")):
        if not re.match(r"^\d{2}_\d{4}-\d{2}-\d{2}_", p.name):
            continue
        head = p.read_text(encoding="utf-8", errors="replace")[:2000]
        m = re.match(r"^---\n(.*?)\n---", head, re.S)
        if not m:
            continue
        fm = {k.strip(): v.strip() for k, v in
              (l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)}
        subject = fm.get("subject", "")
        if only_reads and "Tech Reads" not in subject:
            continue
        idx = str(fm.get("index") or p.name[:2]).zfill(2)
        out.append({
            "index": idx,
            "date": fm.get("newsletter_date", p.name[3:13]),
            "type": "reads",
            "subject": subject,
            "path": str(p),
            "hasRaw": (ROOT / "data" / "raw_ko" / f"{idx}.json").exists(),
        })
    return out


def main():
    args = sys.argv[1:]
    todo_only = "--todo" in args
    picks = issues()
    if not any(a.startswith("--") for a in args):
        want = {a.zfill(2) for a in args}
        picks = [x for x in picks if x["index"] in want]
    if todo_only:
        picks = [x for x in picks if not (ROOT / "data" / "notes" / f"{x['index']}.json").exists()]
    if not picks:
        print("처리할 회차가 없다.")
        return 1

    src = TEMPLATE.read_text(encoding="utf-8")
    head = re.search(r"^\}\n", src, flags=re.M)
    src = src[: head.end()] + "\n" + style_const() + "\n" + src[head.end():]
    src = re.sub(r"^const files = args \|\| \[\]$",
                 "const files = " + json.dumps(picks, ensure_ascii=False), src, count=1, flags=re.M)
    OUT.write_text(src, encoding="utf-8")

    need_raw = sum(1 for x in picks if not x["hasRaw"])
    print(f"실행본 생성 → {OUT}")
    print(f"  대상 {len(picks)}건 (번역본을 새로 만들어야 하는 회차 {need_raw}건)")
    print("  번호:", " ".join(x["index"] for x in picks))
    print(f"  에이전트 예상 {len(picks) * 3 - (len(picks) - need_raw)}개")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
