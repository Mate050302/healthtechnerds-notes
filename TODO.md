# 남은 작업 (2026-09-11 갱신)

주요 산출물은 모두 완성됐다. 남은 것은 다듬기다.

## 1. 문체 잔여 위반 65건
`python3 scripts/check_style.py data/notes` 기준 비유 25 · 미완결 26 · '~의' 중첩 14.
`wf_polish.js` 를 해당 회차만 골라 다시 돌리면 된다.

## 2. PON 리스트 검토 후 반영
`data/extras/pon.json` (사본 `data/pon_final.json`). 사용자가 보고 뺄 것·합칠 것을 정하면 반영한다.

## 3. 갱신 절차
```
python3 scripts/build.py && git add -A && git commit && git push   # Actions 가 자동 배포
```
