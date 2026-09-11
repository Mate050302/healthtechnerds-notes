# Health Tech Nerds 정리 노트

미국 헬스테크 업계 뉴스레터 **Health Tech Nerds** 의 Weekly Health Tech Reads 32회차(2026-01 ~ 2026-08)를,
미국 헬스케어를 처음 보는 한국어 독자 기준으로 다시 쓴 학습 노트입니다.

- 각 회차를 **무슨 일 / 왜 중요한가 / 구조상 어디 이야기 / 소비자 입장에서는** 4단으로 풀어 씁니다.
- 부록: 미국 헬스케어 101, 소비자 시장, 주제별 정리, 타임라인, 용어사전.
- 원문 뉴스레터 본문은 이 저장소에 포함하지 않습니다. 요약과 해설만 있습니다.
- 원문의 추적 링크(수신자 식별자 포함)는 전량 제거했습니다.

## 구조

```
data/notes/NN.json     회차별 정리 노트
data/extras/*.json     부록 문서(101·소비자시장·주제·타임라인·용어사전)
scripts/template.html  페이지 템플릿
scripts/build.py       노트 + 부록 -> index.html 단일 파일로 빌드
scripts/gen_args.py    원문 목록에서 처리 인자 생성
scripts/digest.py      부록 집필용 다이제스트 생성
index.html             빌드 결과 (GitHub Pages 가 서빙)
```

## PON 리스트 2판 (`#/pon`)
다른 작업자의 "미국 3개월 P/O/N 리스트" 형식을 따른다. 32개 항목을 영어 원문과 대조해 확신도(높음·중간·낮음)를 매기고,
착수 후보 · 보류 · 제외로 가른 뒤, 착수 후보는 사람 말 제목 · 장면 · 핵심 숫자 · 크기·빈도·심각성(없으면 미측정) ·
왜 지금 · 만들 것 · 가장 큰 위험 · 핵심·보강·반증 근거 · 상황 이해 다섯 문단으로 쓴다.

- 생성: `scripts/wf_pon2.js` (채점 8묶음 → 상황 이해 → 재판정 → 머리글) · 합치기 `scripts/merge_pon2.py`
- 조각: `data/_pon2_part_N.json`(카드) · `data/_pon2_ctx_N.json`(상황 이해) · `data/_pon2_verdict.json`(최종 판정) · `data/_pon2_overview.json`(머리글·카테고리·용어)
- 1판(표 형식 32개)은 `data/pon_v1.json`

## 빌드

```bash
python3 scripts/build.py       # index.html 재생성
python3 -m http.server 8791    # 로컬 확인
```

검색엔진 색인은 `robots.txt` 와 `noindex` 메타로 막아 두었습니다.
