export const meta = {
  name: 'htn-pon',
  description: '리포트 항목 101개와 회사 33곳에서 Problem / Opportunity / Needs 리스트를 뽑고 마지막에 건강 카테고리를 붙임',
  phases: [
    { title: 'Extract', detail: '회차 묶음별로 PON 후보 추출 (기존 HF0 28개와 중복 회피)' },
    { title: 'Merge', detail: '중복 제거, 3개월 게이트 재검, P/O/N 확정' },
    { title: 'Categorize', detail: '리스트가 다 나온 뒤 건강 카테고리 부여' },
  ],
}

const ROOT = '/Users/gravitylabs/dev/healthtechnerds-notes'

const COMMON = `## 읽는 사람
한국인이고, 미국 헬스케어 산업을 모르고, 영어도 편하지 않다. 영어 약어를 모른다.

## 먼저 읽을 것 (전부)
- 목적: ${ROOT}/GOAL.md
- 한국어 문장 지침: ~/.claude/output-styles/fluent-korean-not-coding.md (전문을 적용한다)
- 재료 1: ${ROOT}/data/extras/report.json (32회차에서 건진 항목 101개. 만들 것 25 + 시장 신호 76)
- 재료 2: ${ROOT}/data/_report_companies.json (프로필이 있는 회사 33곳 목록). 상세는 ${ROOT}/data/companies/<slug>.json
- 기존 작업: ${ROOT}/data/_hf0_prior.json (어제 만든 PON 28개, 생활 상황 352개, 기각 결론)

## P / O / N 의 뜻 (이 정의를 그대로 쓴다)
- **P (Problem)**: 미국 소비자가 실제로 겪는 곤란. 뉴스레터에 근거가 있고, 아직 풀리지 않았거나 잘못 풀리고 있는 것.
  "무엇이 안 되는가"로 적는다.
- **O (Opportunity)**: 우리 앱이 3개월 안에 들어갈 수 있는 자리. 구조적 빈틈이거나, 이미 되는 선례가 있어 따라 들어갈 수 있는 곳.
  "우리가 무엇을 해 볼 수 있는가"로 적는다.
- **N (Needs)**: 소비자가 이미 돈이나 시간을 쓰고 있거나 직접 찾고 있는 것. 수요는 확인됐는데 우리 앱에 없는 것.
  "소비자가 무엇을 원하고 있는가"로 적는다.
하나의 사실이 P 이면서 O 일 수 있다. 그럴 때는 더 강한 쪽 하나로만 태그하고 설명에 다른 면을 적는다.

## 제외 규칙 (GOAL.md)
- 현금 리워드, 건강 나이는 이미 앱에 있으므로 제외.
- 웨어러블 개발, 원천 기술, 규제 허가, 보험 청구 연동처럼 3개월 안에 소프트웨어 인력만으로 불가능한 것은 제외.
- B2C 앱 화면에서 되는 일이면 조금 어려워도 포함.
- 이미 하는 회사가 있어도 포함한다. 그 회사가 어떤 고객 문제를 푸는지가 중요하다.

## 기존 28개와의 관계
기존 28개와 **같은 내용을 되풀이하지 않는다.** 다만 뉴스레터가 그 28개 중 하나에 새 근거나 반대 근거를 보태면,
그것은 새 항목으로 적되 설명에 "기존 N번을 보강/반박"이라고 밝힌다.
기각 결론(kill_conclusions)에서 이미 죽은 방향("미국엔 가격 투명화가 없다" 류)은 되살리지 않는다.

## 반드시 지킬 것
- 재료에 있는 사실만 쓴다. 회사가 스스로 낸 수치는 그 단서를 같이 옮긴다.
- 근거 필드에는 **어느 회차 몇 번 꼭지의 어떤 사실**인지 적는다. 회차 번호가 없는 항목은 만들지 않는다.
- 이모지와 엠대시를 쓰지 않는다. "~다" 체. 비유 표현(지렛대, 발목을 잡다, 몸집, 무대, 노릇, 단골, 분수령)을 쓰지 않는다.
- 영어 약어 첫 등장에 한글 풀이를 붙인다.`

const ITEM_SHAPE = `{
  "kind": "P" | "O" | "N",
  "title": "어떤 P/O/N 인지 한 줄로 설명하는 제목. 기존 28개처럼 문장형으로.",
  "description": "부연 3~5문장. 왜 이것이 문제/기회/수요인지, 미국 구조에서 어디에 놓이는지, 우리 앱에서 무엇을 해 볼 수 있는지.",
  "evidence": "근거. 어느 회차 몇 번 꼭지의 어떤 사실인지, 숫자가 있으면 숫자와 출처 성격(회사 발표/제삼자)까지.",
  "refs": [{"issue": "26", "section": 9}],
  "cases": [{"name": "회사·서비스 이름", "slug": "프로필이 있으면 슬러그, 없으면 빈 문자열", "note": "이 사례가 무엇을 보여 주는지 한 줄"}],
  "prior": "기존 28개 중 관련 번호와 관계(보강/반박/무관). 무관이면 빈 문자열",
  "feasibility": "3개월·소프트웨어·B2C 조건을 어떻게 통과하는지 한두 문장. 조건부면 조건을 적는다."
}`

const EXTRACT_SCHEMA = {
  type: 'object',
  properties: {
    part: { type: 'string' },
    count: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['part', 'count', 'saved'],
}
const MERGE_SCHEMA = {
  type: 'object',
  properties: {
    total_in: { type: 'integer' },
    total_out: { type: 'integer' },
    removed_dup: { type: 'integer' },
    removed_gate: { type: 'integer' },
    p: { type: 'integer' }, o: { type: 'integer' }, n: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['total_out', 'saved'],
}
const CAT_SCHEMA = {
  type: 'object',
  properties: {
    categories: { type: 'integer' },
    items: { type: 'integer' },
    saved: { type: 'boolean' },
    scheme: { type: 'string', description: '카테고리 체계를 한 줄로' },
  },
  required: ['categories', 'items', 'saved'],
}

const GROUPS = args || []
log(`PON 추출 ${GROUPS.length}묶음 시작`)

/* 1단계: 묶음별 후보 추출 */
const parts = await pipeline(
  GROUPS,
  (g) => agent(
    `${COMMON}

## 할 일
재료 1(report.json)의 issues 가운데 **${g.from}회차부터 ${g.to}회차까지**를 맡아 PON 후보를 뽑는다.
그 회차들의 항목에 연결된 회사(items[].companies)가 있으면 그 회사 프로필도 읽고, 회사 프로필에서만 드러나는
문제나 기회도 후보에 넣는다. 특히 프로필의 "caveats", "for_us", "differentiator" 를 본다.

후보는 많이 뽑되 억지로 만들지 않는다. 항목 하나가 P/O/N 하나로 이어지는 것이 보통이고,
서로 다른 회차의 사실을 겹쳐야 보이는 것도 있다. 각 후보는 아래 형태다.
${ITEM_SHAPE}

## 저장
Write 도구로 ${ROOT}/data/_pon_part_${g.part}.json 에 { "items": [ ... ] } 로 저장한다.`,
    { label: `pon:${g.part}`, phase: 'Extract', schema: EXTRACT_SCHEMA }
  )
)
const okParts = parts.filter(Boolean).filter((r) => r.saved)
log(`추출 완료 ${okParts.length}/${GROUPS.length} · 후보 ${okParts.reduce((a, r) => a + (r.count || 0), 0)}개`)

/* 2단계: 병합 (전체를 함께 봐야 하므로 배리어) */
const merged = await agent(
  `${COMMON}

## 할 일
네 명이 나눠 뽑은 PON 후보(${ROOT}/data/_pon_part_1.json ~ _pon_part_4.json)를 모두 읽고 하나의 리스트로 만든다.
너는 편집자다. 늘리는 사람이 아니라 줄이는 사람이다.

1. **중복 제거**: 같은 사실을 다른 말로 적은 것은 하나로 합친다. 합칠 때 근거(refs)와 사례(cases)는 모두 모은다.
2. **기존 28개 대조**: ${ROOT}/data/_hf0_prior.json 의 existing_pon_28 과 내용이 같은 것은 뺀다.
   새 근거를 보태는 것이면 남기되 prior 필드에 관계를 적는다. kill_conclusions 에 걸리는 방향은 뺀다.
3. **3개월 게이트 재검**: feasibility 가 비어 있거나 기기·규제·청구 연동이 필요한 것은 뺀다.
   현금 리워드·건강 나이와 겹치는 것도 뺀다. 금전 가치뿐이고 건강 가치가 없는 것도 뺀다.
4. **P/O/N 확정**: 정의에 맞게 태그를 다시 본다. 한 항목에 두 성격이 있으면 더 강한 쪽 하나로.
5. **근거 검사**: refs 가 비어 있거나 evidence 에 회차 번호가 없는 항목은 뺀다.
6. 항목마다 id 를 "PON-01" 부터 순서대로 붙인다. 순서는 근거가 강한 것부터.

카테고리는 **아직 붙이지 않는다.** 다음 단계에서 리스트 전체를 보고 붙인다.

## 저장
Write 도구로 ${ROOT}/data/_pon_merged.json 에 { "items": [ ... ] } 로 저장한다. 각 항목은 위 형태에 id 를 더한 것이다.`,
  { label: 'pon:merge', phase: 'Merge', schema: MERGE_SCHEMA }
)
log(`병합: ${merged ? merged.total_in : '?'} → ${merged ? merged.total_out : '?'} (P${merged && merged.p} O${merged && merged.o} N${merged && merged.n})`)

/* 3단계: 카테고리는 리스트가 다 나온 뒤에 */
const cat = await agent(
  `${COMMON}

## 할 일
확정된 PON 리스트(${ROOT}/data/_pon_merged.json)에 **건강 카테고리**를 붙인다.
사용자 지시: "카테고리 구분은 리스트업 다 한 다음에 최종적으로 마지막에 한다. 그래야 정확하다."
그러므로 먼저 리스트 전체를 읽고, 실제로 어떤 축으로 갈리는지 본 뒤에 체계를 정한다. 미리 정한 틀에 끼워 맞추지 않는다.

## 카테고리 체계를 정하는 법
사용자가 든 두 가지 축을 참고한다.
  (a) 특정 건강 행동: 운동, 수면, 식단, 정서, 복약, 검진 같은 것
  (b) 미국 의료·보험 체계에서 어느 단계에서 생기는 문제인지: 증상 판단, 어디로 갈지, 예약, 진료, 처방·약, 청구·보험, 지속 관리 같은 것
리스트를 읽고 어느 축이 더 잘 가르는지, 또는 두 축을 함께 써야 하는지 판단한다.
카테고리는 5~10개 사이가 보통이다. 한 항목은 하나의 주 카테고리를 갖고, 필요하면 보조 카테고리 하나를 더 가질 수 있다.

## 저장
각 항목에 "category" 와 필요시 "category2" 를 붙이고, 최상위에 카테고리 정의를 넣는다.
{
  "scheme": "체계를 한 문단으로 설명",
  "categories": [{"key": "짧은 키", "label": "한글 이름", "definition": "무엇이 여기 들어가는가 한두 문장", "count": 3}],
  "items": [ ... category 가 붙은 항목들 ... ]
}
Write 도구로 ${ROOT}/data/extras/pon.json 에 저장한다.`,
  { label: 'pon:categorize', phase: 'Categorize', schema: CAT_SCHEMA }
)

return {
  parts: okParts.length,
  candidates: okParts.reduce((a, r) => a + (r.count || 0), 0),
  merged: merged ? { out: merged.total_out, p: merged.p, o: merged.o, n: merged.n, dup: merged.removed_dup, gate: merged.removed_gate } : null,
  categories: cat ? { n: cat.categories, items: cat.items, scheme: cat.scheme } : null,
}
