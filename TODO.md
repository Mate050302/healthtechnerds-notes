# 남은 작업 (2026-09-11 갱신)

주요 산출물은 모두 완성됐다. 남은 것은 다듬기다.

## 1. 문체 잔여 위반 65건
`python3 scripts/check_style.py data/notes` 기준 비유 25 · 미완결 26 · '~의' 중첩 14.
`wf_polish.js` 를 해당 회차만 골라 다시 돌리면 된다.

## 2. PON 리스트 검토 후 반영
`data/extras/pon.json` 은 2판(확신도·거르기·크기빈도심각성·착수 후보 카드)이다. 1판 표 형식은 `data/pon_v1.json` 에 남아 있다.
착수 후보 9 · 보류 10 · 제외 13. 사용자가 보고 올릴 것·내릴 것을 정하면 `data/_pon2_verdict.json` 의 verdict 를 고치고
`python3 scripts/merge_pon2.py && python3 scripts/build.py` 로 반영한다. 카드 본문을 고칠 때는 `data/_pon2_part_N.json`(4개씩 8묶음)을 고친다.
다시 채점하려면 `scripts/wf_pon2.js` 를 `make_run.py` 방식으로 STYLE·GROUPS 주입해 돌린다(실행본 예: `wf_pon2_run.js`).

## 3. 갱신 절차
```
python3 scripts/build.py && git add -A && git commit && git push   # Actions 가 자동 배포
```
