#!/usr/bin/env python3
"""정리 노트가 한국어 문장 지침을 지키는지 기계적으로 검사한다.

사용법:
  python3 scripts/check_style.py data/notes/01.json
  python3 scripts/check_style.py data/notes/01.json data/notes_prestyle/01.json   # 비교
  python3 scripts/check_style.py data/notes                                        # 폴더 전체
"""
import json
import pathlib
import re
import sys

# 지침 '구 단위 3번'이 지목한, 일반 어휘 자리를 대신 차지하기 쉬운 비유 표현.
METAPHORS = [
    "지렛대", "줄타기", "노릇", "단골", "씨름", "꼴찌", "골격", "값어치", "주범",
    "발목을 잡", "판을 흔들", "밑거름", "실탄", "몸집", "허리띠", "칼자루", "물꼬",
    "불씨", "뇌관", "시금석", "분수령", "아킬레스건", "양날의 검", "수면 위로",
    "급물살", "청신호", "적신호", "제동을 걸", "쐐기를 박", "무대", "판이 바뀌",
    "총알", "먹거리", "파이를 키", "밥그릇", "손사래", "목줄", "숨통", "빗장",
]

# 설명문에서 정상적으로 나타나는 종결 형태. 이 목록을 벗어나면 사람이 확인한다.
ENDINGS = re.compile(
    r"(다|까|요|죠|네|라|자|군|구나|음|함|임|겠다|한다|된다|이다|아니다)$"
)

FIELDS = ("hook", "what", "why", "structure", "consumer")


def sentences(text):
    """문장 단위로 자른다. 숫자 사이의 점과 약어 안의 점은 경계로 보지 않는다."""
    t = re.sub(r"(\d)\.(\d)", r"\1<DOT>\2", text)
    t = re.sub(r"\b([A-Z])\.([A-Z])\.", r"\1<DOT>\2<DOT>", t)
    out = []
    for s in re.split(r"(?<=[.!?])\s+|\n+", t):
        s = s.replace("<DOT>", ".").strip()
        if s:
            out.append(s)
    return out


def collect(note):
    """검사 대상 한국어 문자열을 (위치, 내용) 목록으로 모은다.
    회차 노트 구조가 바뀌어도 견디도록, 문자열이 아닌 값은 건너뛴다."""
    items = []

    def add(where, val):
        if isinstance(val, str) and val.strip():
            items.append((where, val))

    for k in ("title_ko", "hook"):
        add(k, note.get(k))

    for t in note.get("tldr") or []:
        if isinstance(t, dict):
            add("tldr.point", t.get("point"))
            add("tldr.note", t.get("note"))
        else:
            add("tldr", t)

    ii = note.get("issue_insight") or {}
    add("issue_insight.summary", ii.get("summary"))
    for kind in ("build", "signal"):
        for b in ii.get(kind) or []:
            if isinstance(b, dict):
                add(f"issue_insight.{kind}.title", b.get("title"))
                add(f"issue_insight.{kind}.detail", b.get("detail"))

    for i, s in enumerate(note.get("sections") or []):
        n = i + 1
        for k in ("heading_ko", "summary", "insight", "signal", *FIELDS):
            add(f"sec{n}.{k}", s.get(k))
        for c in s.get("author") or []:
            add(f"sec{n}.author", c.get("claim"))
            add(f"sec{n}.author.evidence", c.get("evidence"))
        for c in s.get("experts") or []:
            add(f"sec{n}.expert({c.get('who','')})", c.get("claim"))
            add(f"sec{n}.expert.role", c.get("role"))
            add(f"sec{n}.expert.evidence", c.get("evidence"))
        for c in s.get("cases") or []:
            add(f"sec{n}.case({c.get('name','')})", c.get("what"))
            add(f"sec{n}.case.scale", c.get("scale"))
            add(f"sec{n}.case.note", c.get("note"))
        for t in s.get("notes") or []:
            add(f"sec{n}.term({t.get('term','')})", t.get("plain"))
        # 옛 판본 호환
        for t in s.get("terms") or []:
            add(f"sec{n}.term({t.get('en','')})", t.get("plain"))
        for pl in s.get("players") or []:
            add(f"sec{n}.player({pl.get('name','')})", pl.get("what"))

    for f in note.get("for_later") or []:
        add("for_later", f)
    return items


def collect_text(path):
    """일반 텍스트(마크다운, 채팅 답변)를 줄 단위로 모은다.
    표의 행, 제목 줄, 코드 블록은 지침 예외라서 건너뛴다."""
    items = []
    in_code = False
    for i, line in enumerate(pathlib.Path(path).read_text(encoding="utf-8").splitlines(), 1):
        s = line.strip()
        if s.startswith("```"):
            in_code = not in_code
            continue
        if in_code or not s:
            continue
        if s.startswith("#") or s.startswith("|") or set(s) <= set("-=| "):
            continue
        kind = "목록" if re.match(r"^[-*+]\s|^\d+\.\s", s) else "본문"
        items.append((f"{kind}:{i}행", re.sub(r"^[-*+]\s|^\d+\.\s", "", s)))
    return items


def audit(path, as_text=False):
    if as_text:
        items = collect_text(path)
    else:
        note = json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
        items = collect(note)
    blob = "\n".join(t for _, t in items)

    res = {
        "파일": str(path),
        "검사한 문자열": len(items),
        "총 글자수": len(blob),
        "엠대시": [],
        "미완결 의심 문장": [],
        "미완결(사전 항목)": [],
        "'~의' 중첩": [],
        "비유 표현": [],
        "이모지": [],
        "문단 나뉜 항목": 0,
        "긴 항목(300자 초과)": 0,
    }

    for where, text in items:
        if "—" in text:
            for m in re.finditer(r".{0,22}—.{0,22}", text):
                res["엠대시"].append(f"{where}: …{m.group(0)}…")

        # 용어 풀이, 회사 한 줄 소개, 제목은 사전 항목에 해당해서
        # 명사구로 끝나는 것이 자연스럽다. 지침도 헤더와 목록을 예외로 둔다.
        is_entry = (("term(" in where) or ("player(" in where) or ("case(" in where)
                    or where.endswith(".role") or where.endswith(".scale")
                    or where.endswith(".title") or where == "title_ko" or where.endswith(".heading_ko") or where.startswith("목록"))
        for s in sentences(text):
            core = re.sub(r"[.!?\"')\]]+$", "", s).strip()
            if not core or len(core) < 6:
                continue
            if not ENDINGS.search(core):
                bucket = "미완결(사전 항목)" if is_entry else "미완결 의심 문장"
                res[bucket].append(f"{where}: …{core[-34:]}")

        for m in re.finditer(r"\S+의\s+\S+의\s", text):
            res["'~의' 중첩"].append(f"{where}: {m.group(0).strip()}")

        for w in METAPHORS:
            if w in text:
                m = re.search(r".{0,18}" + re.escape(w) + r".{0,18}", text)
                res["비유 표현"].append(f"{where}: …{m.group(0)}…")

        if re.search(r"[\U0001F300-\U0001FAFF☀-➿]", text):
            res["이모지"].append(where)

        if where.split(".")[-1] in FIELDS:
            if "\n" in text:
                res["문단 나뉜 항목"] += 1
            if len(text) > 300:
                res["긴 항목(300자 초과)"] += 1

    return res


def report(res):
    print(f"\n■ {res['파일']}")
    print(f"  검사 대상 {res['검사한 문자열']}개 문자열, 총 {res['총 글자수']:,}자")
    print(f"  300자 넘는 서술 {res['긴 항목(300자 초과)']}개 중 문단이 나뉜 것 {res['문단 나뉜 항목']}개")
    for key in ("엠대시", "미완결 의심 문장", "미완결(사전 항목)", "'~의' 중첩", "비유 표현", "이모지"):
        hits = res[key]
        mark = "통과" if not hits else f"{len(hits)}건"
        print(f"  [{mark:>5}] {key}")
        for h in hits[:6]:
            print(f"          - {h}")
        if len(hits) > 6:
            print(f"          … 외 {len(hits)-6}건")


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 1
    as_text = "--text" in args
    args = [a for a in args if a != "--text"]
    targets = []
    for a in args:
        p = pathlib.Path(a)
        targets.extend(sorted(p.glob("*.json")) if p.is_dir() else [p])
    for t in targets:
        report(audit(t, as_text or t.suffix != ".json"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
