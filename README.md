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

## 빌드

```bash
python3 scripts/build.py       # index.html 재생성
python3 -m http.server 8791    # 로컬 확인
```

검색엔진 색인은 `robots.txt` 와 `noindex` 메타로 막아 두었습니다.
