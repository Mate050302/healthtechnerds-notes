export const meta = {
  name: 'htn-report',
  description: '32회차에서 소비자 헬스케어 관점으로 건질 것을 한 편의 리포트로 정리',
  phases: [
    { title: 'Issues', detail: '회차를 나눠 맡아 항목마다 읽을 수 있는 설명으로 다시 씀' },
    { title: 'Overview', detail: '전체를 관통하는 줄기를 뽑아 머리글 작성' },
  ],
}

const ROOT = '/Users/gravitylabs/dev/healthtechnerds-notes'

const COMMON = `## 읽는 사람
한국인이고, 미국 헬스케어 산업을 모르고, 영어도 편하지 않다.
한국 의료(전국민 건강보험, 병원에 그냥 가면 됨)만 안다. 영어 약어를 모른다.

## 먼저 읽을 것
- 목적 문서: ${ROOT}/GOAL.md
- 한국어 문장 지침: ~/.claude/output-styles/fluent-korean-not-coding.md (전문을 그대로 적용한다)
- 재료: ${ROOT}/data/_report_src.json (회차별 건질 것 전량)
- 회사 목록: ${ROOT}/data/_report_companies.json (프로필이 있는 회사 33곳의 슬러그)

## 이 리포트가 놓이는 자리
독자는 회차 노트 32건을 다 읽을 시간이 없다. 이 리포트 하나만 보고 "이 뉴스레터에서 우리가
건질 게 무엇인지"를 파악한 뒤, 더 볼 것만 골라 회차로 들어간다.
그러므로 **이 리포트만 읽어도 이해되어야 한다.** 회차 노트를 읽어야 뜻이 통하는 글은 실패다.

## 반드시 지킬 것
- 재료에 있는 사실만 쓴다. 새 사실을 지어내지 않는다.
- 숫자는 재료에 적힌 그대로 옮긴다. 회사가 스스로 낸 수치라는 단서가 있으면 그 단서도 함께 옮긴다.
- 이모지와 엠대시를 쓰지 않는다. 문체는 "~다" 체로 통일한다.
- 비유 표현을 쓰지 않는다. 특히 지렛대, 발목을 잡다, 몸집, 판을 흔들다, 무대, 노릇, 단골, 분수령은 쓰지 않는다.
- 영어 약어가 처음 나오는 자리에 한글 풀이를 붙인다.`

const ISSUE_SCHEMA = {
  type: 'object',
  properties: {
    part: { type: 'string' },
    issues_written: { type: 'integer' },
    items_written: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['part', 'issues_written', 'saved'],
}

const OVERVIEW_SCHEMA = {
  type: 'object',
  properties: {
    themes: { type: 'integer' },
    saved: { type: 'boolean' },
    headline: { type: 'string', description: '이 리포트의 가장 중요한 발견 한 줄' },
    note: { type: 'string' },
  },
  required: ['themes', 'saved'],
}

const GROUPS = args || []

/* 1단계: 회차를 나눠 맡아 항목을 다시 쓴다 */
const parts = await pipeline(
  GROUPS,
  (g) => agent(
    `${COMMON}

## 할 일
재료에서 **${g.from}회차부터 ${g.to}회차까지** 맡아, 리포트에 실을 회차별 항목을 쓴다.

각 회차마다 아래 형태로 만든다.

{
  "index": "04",
  "date": "2026-01-11",
  "title_ko": "재료의 title_ko 를 그대로",
  "why_read": "이 회차를 왜 보는지 한두 문장. 건질 것이 없는 회차면 왜 없는지 적는다.",
  "items": [
    { "kind": "build" 또는 "signal",
      "title": "짧은 제목 한 줄",
      "detail": "3~5문장. **이 리포트만 읽어도 이해되게** 쓴다. 아래 작성법 참고.",
      "why": "이것이 왜 눈여겨볼 만한지 한두 문장. 없으면 빈 문자열.",
      "section": 5,
      "companies": ["doctronic"] }
  ]
}

## detail 작성법 (가장 중요)
재료의 detail 은 회차 노트를 읽은 사람 기준으로 짧게 적혀 있다. 그대로 옮기면 리포트에서 읽히지 않는다.
다음을 채워 3~5문장으로 다시 쓴다.

1. **무슨 사실에서 나왔는지 먼저 밝힌다.** 어느 회사가 무엇을 했고 숫자가 얼마인지 적는다.
   재료의 sec_titles 와 issue_summary 에서 그 꼭지가 무슨 이야기였는지 확인해 배경을 한 문장 깐다.
2. **그래서 무엇을 해 볼 수 있는지**(build) 또는 **소비자가 어떻게 움직이고 있는지**(signal)를 적는다.
3. **한계나 조건**이 재료에 적혀 있으면 반드시 함께 옮긴다. 회사가 스스로 낸 수치인지,
   원문이 밝히지 않은 것이 무엇인지 같은 단서가 여기 해당한다.

## companies
그 항목에 등장하는 회사 가운데 프로필이 있는 곳의 슬러그를 넣는다.
회사 목록 파일에서 이름을 맞춰 보고, 없으면 빈 배열로 둔다. 억지로 연결하지 않는다.

## 건질 것이 없는 회차
items 를 빈 배열로 두고 why_read 에 왜 없는지 적는다.
"병원과 보험사 사이의 돈 이야기가 대부분이었다" 처럼 구체적으로 적는다.
재료의 issue_summary 에 그 이유가 적혀 있는 경우가 많다.

## 저장
Write 도구로 ${ROOT}/data/_report_part_${g.part}.json 에 저장한다.
형태는 { "issues": [ 위 객체들 ] } 이고, ${g.from}회차부터 ${g.to}회차까지 **빠짐없이** 넣는다.
건질 것이 없는 회차도 빼지 않는다.`,
    { label: `report:${g.part}`, phase: 'Issues', schema: ISSUE_SCHEMA }
  )
)

const ok = parts.filter(Boolean).filter((r) => r.saved)
log(`회차 정리 ${ok.length}/${GROUPS.length} 묶음 완료`)

/* 2단계: 전체를 관통하는 줄기 */
const overview = await agent(
  `${COMMON}

## 할 일
리포트의 **머리글**을 쓴다. 회차별 정리는 다른 작업자가 이미 끝냈다.
너는 32회차 전체를 겹쳐 보았을 때만 드러나는 것을 뽑는다.

먼저 ${ROOT}/data/_report_src.json 전체를 읽어라.
그다음 다른 작업자가 만든 ${ROOT}/data/_report_part_*.json 도 모두 읽어 어떤 항목들이 실렸는지 확인한다.

## 쓸 것

{
  "title": "리포트 제목. 무엇을 정리한 것인지 드러나게.",
  "lede": "이 리포트가 무엇인지 한 문장.",
  "overview": {
    "summary": "머리글 본문. 400~800자. 마크다운은 문단 나눔만 쓴다(빈 줄로 문단 구분).",
    "themes": [
      { "title": "줄기 제목 한 줄", "detail": "3~5문장", "refs": ["04", "26"] }
    ]
  }
}

## summary 에 담을 것
- 이 뉴스레터가 어떤 매체이고 무엇을 다루는지 한두 문장.
- **32회차를 다 읽고 나면 무엇이 보이는지.** 이것이 머리글의 핵심이다.
- 만들 것이 25개, 시장 신호가 76개이고 32회차 가운데 17회차는 만들 것이 없다는 사실을 밝힌다.
  그리고 **왜 그런지** 적는다. 이 뉴스레터가 누구를 독자로 쓰였는지와 관련이 있다.
- 이 리포트를 어떻게 읽으면 되는지 한 문장.

## themes 에 담을 것
32회차를 겹쳐야 드러나는 줄기 **5~8개**를 뽑는다.
한 회차만 보고는 알 수 없고, 여러 회차에 흩어진 사실을 모아야 보이는 것이어야 한다.
각 줄기는 3~5문장이고, 근거가 된 회차 번호를 refs 에 넣는다.

좋은 줄기의 예를 들면 이런 성격이다.
- 여러 회차에서 같은 방향으로 움직이는 소비자 행동
- 서로 다른 회차의 사실을 겹쳤을 때만 보이는 구조
- 뉴스레터가 그때그때 전한 것과 달리, 모아 놓고 보면 다르게 읽히는 대목

억지로 숫자를 채우지 않는다. 진짜로 겹쳐야 보이는 것만 넣는다.

## 저장
Write 도구로 ${ROOT}/data/_report_overview.json 에 저장한다.`,
  { label: 'report:overview', phase: 'Overview', schema: OVERVIEW_SCHEMA }
)

return {
  parts: ok.length,
  total_groups: GROUPS.length,
  issues_written: ok.reduce((a, r) => a + (r.issues_written || 0), 0),
  items_written: ok.reduce((a, r) => a + (r.items_written || 0), 0),
  overview: overview ? { themes: overview.themes, headline: overview.headline } : null,
}
