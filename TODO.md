# 남은 작업 (2026-09-10 사용 한도로 중단)

세션 한도는 한국 시간 밤 12시 30분에 풀린다.

## 1. 회차 감사 12건

노트는 만들어졌으나 원문 대조 감사를 거치지 않은 회차다.
주장 귀속과 사실 오류가 걸러지지 않은 상태이므로 인용할 때 주의한다.

대상: 33, 36, 42, 43, 44, 48, 49, 50, 51, 52, 53, 55

```
Workflow({scriptPath: 'scripts/wf_run_gen.js', resumeFromRunId: 'wf_cbdb896c-f59'})
```

## 2. 회차 정제 22건

억지 인사이트를 걷어내고 문체 지침 위반을 고치는 작업이다.
10회차만 마쳤고, 그 10회차에서만 억지 인사이트 15개가 걸러졌다.

대상: 18, 22, 24, 26, 30, 33, 36, 39, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55

```
Workflow({scriptPath: 'scripts/wf_polish_run.js', resumeFromRunId: 'wf_1579c3a2-a65'})
```

## 3. 회사 프로필 15곳

대상: chapter-medicare, lillydirect, suppco, talkspace, oscar-health, cost-plus-drugs,
oula, carbon-health, lotus-health-ai, torch-health, chatgpt-health, withings,
climatic, protocole, blueprint-immortals, ayble-health, oshi-health, alan-health

```
Workflow({scriptPath: 'scripts/wf_co_run.js', resumeFromRunId: 'wf_b851c604-226'})
```

## 4. 부록 문서 5종 (아직 손대지 않음)

미국 헬스케어 101, 소비자 시장, 주제별, 타임라인, 용어사전.
화면에는 메뉴가 있으나 내용이 비어 있다.

```
scripts/digest.py 로 다이제스트를 먼저 만든 뒤 scripts/wf_extras.js 를 돌린다.
```

## 5. 용어사전 병합 고치기

`scripts/build.py` 의 `merge_glossary` 가 옛 스키마(`terms`)를 찾고 있어
새 구조(`notes`)의 용어 1,022건이 용어사전에 모이지 않는다. 빌드 로그에 "용어 0개"로 나온다.

## 6. PON 리스트 작성

위가 모두 끝난 뒤 `GOAL.md` 기준으로 Problem / Opportunity / Needs 를 나눠 표로 정리한다.
건질 것 53개와 시장 신호 89개, 회사 프로필이 재료가 된다.
건강 카테고리 구분은 리스트를 다 뽑은 뒤 마지막에 한다.
