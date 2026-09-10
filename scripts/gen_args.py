#!/usr/bin/env python3
"""저장된 뉴스레터 .md 를 훑어 워크플로우 args(JSON 배열)를 만든다."""
import json
import pathlib
import re
import sys

SRC = pathlib.Path.home() / "Downloads" / "HealthTechNerds_뉴스레터_20260910"


def classify(subject: str, size: int = 0) -> str:
    """제목으로 종류를 가른다. '오늘 라이브' 안내 메일이라도 본문이 통째로 들어있는
    경우(20KB 이상)가 많아, 크기로 안내(event)와 실제 회차를 다시 가른다."""
    s = subject.lower()
    announce = bool(re.search(r"\bjoin\b|live on|will be live|pop-?up|today[,!]|register|rsvp|reminder", s))
    if "weekly health tech reads" in s:
        return "reads"
    if "health policy briefing" in s:
        return "policy"
    if "grand roundup" in s:
        return "event" if (announce and size < 20000) else "roundup"
    if re.search(r"joins htn|htn chats|discuss|conversation|interview|podcast|sits down|q&a", s):
        return "interview"
    if announce or size < 15000:
        return "event"
    return "roundup"


def main() -> int:
    out = []
    for p in sorted(SRC.glob("*.md")):
        if not re.match(r"^\d{2}_\d{4}-\d{2}-\d{2}_", p.name):
            continue  # 00_INDEX.md 처럼 회차가 아닌 파일은 건너뛴다.
        txt = p.read_text(encoding="utf-8", errors="replace")[:2000]
        fm = {}
        m = re.match(r"^---\n(.*?)\n---", txt, re.S)
        if m:
            for line in m.group(1).splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    fm[k.strip()] = v.strip()
        idx = fm.get("index") or p.name[:2]
        date = fm.get("newsletter_date") or p.name[3:13]
        subject = fm.get("subject") or p.stem[14:].replace("-", " ")
        out.append(
            {
                "index": str(idx).zfill(2),
                "date": date,
                "type": classify(subject, p.stat().st_size),
                "subject": subject,
                "path": str(p),
                "bytes": p.stat().st_size,
            }
        )
    out.sort(key=lambda x: x["index"])

    dest = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("wf_args.json")
    dest.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

    seen = [int(x["index"]) for x in out]
    missing = [i for i in range(1, (max(seen) if seen else 0) + 1) if i not in seen]
    from collections import Counter

    print(f"{len(out)}건 → {dest}")
    print("  종류:", dict(Counter(x["type"] for x in out)))
    print("  크기: 총 %.1fMB, 최대 %dKB" % (sum(x["bytes"] for x in out) / 1e6, max(x["bytes"] for x in out) / 1024))
    if missing:
        print("  빠진 번호:", missing)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
