export const meta = {
  name: 'htn-pon2',
  description: 'PON 32개를 원문과 대조해 확신도를 매기고, 착수 후보 카드(사람 말 제목·장면·크기·빈도·심각성·왜 지금·만들 것·위험·근거·상황 이해)로 다시 쓴다',
  phases: [
    { title: 'Grade', detail: '항목 4개씩 맡아 원문 대조, 확신도, 3개월 판정, 카드 본문 작성' },
    { title: 'Context', detail: '살아남은 항목의 상황 이해(어떻게 굴러가나, 왜 아무도 안 풀었나, 누가 겪나, 사람 수, 한국에 빗대면)' },
    { title: 'Reverdict', detail: '32개 판정을 한 사람이 다시 본다: 크기 미측정은 탈락 사유가 아니다' },
    { title: 'Overview', detail: '머리글, 거르기 깔때기, 카테고리 두 축, 용어 선정' },
  ],
}

const ROOT = '/Users/gravitylabs/dev/healthtechnerds-notes'
const SRC = '/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910'

const COMMON = `## 읽는 사람
한국인이고, 미국 헬스케어 산업을 모르고, 영어도 편하지 않다. 영어 약어를 모른다.
한국 의료(전국민 건강보험, 병원에 그냥 가면 됨)만 안다.

${STYLE}

## 이 작업의 목적 (GOAL.md 전문을 먼저 읽는다: ${ROOT}/GOAL.md)
미국에 가서 3개월 동안, 미국인에게 지금 우리 앱에 없는 건강 가치를 주어 앱을 쓸 이유를 만든다.
그 후보를 뉴스레터 32회차에서 뽑은 것이 PON 리스트다. 지금 있는 리스트는 근거를 원문과 대조하지 않았고,
제목이 길어 한눈에 읽히지 않으며, 얼마나 확실한지와 얼마나 큰 문제인지가 적혀 있지 않다.
이번에 그것을 채운다. 참고 형식은 다른 작업자가 만든 "미국 3개월 P/O/N 리스트" 페이지이며,
그 페이지의 항목은 이렇게 생겼다.

  제목: "고지서 금액 보고 던져놨더니 보험이 안 켜져 있었다" (겪는 사람이 하는 말처럼 한 문장)
  한 줄 요약: "가입은 했는데 첫 달 보험료를 안 내서 보장이 시작되지 않은 사람들. 해지가 아니라 회피다."
  장면: "1월 초, 우편함에 보험료 고지서가 한 장 들어와 있다. ... 그 보험은 아직 한 번도 켜진 적이 없다."
  핵심 숫자: "2026년 1월 ACA 개인시장 가입자의 14%가 첫 보험료 미납" (출처: 계리법인 Wakely 보고서, WSJ 인용)
  크기(겪는 사람): "ACA 가입자의 14%" 등급 중간 / 빈도: "연 1회, 1월에 몰림" 연간 / 심각성: "자기도 모르게 무보험, 청구서 전액" 큼
  왜 지금 / 만들 것 / 가장 큰 위험 : 각 한두 문장
  근거: 핵심·보강·반증으로 나눈 사실 문장 3~6개, 각각 회차 번호와 출처 성격
  상황 이해: 이게 어떻게 굴러가길래 / 왜 아직 아무도 안 풀었나 / 정확히 누가 겪나 / 숫자를 사람 수로 풀면 / 한국에 빗대면

## P / O / N 의 뜻
- P (문제): 미국 소비자가 실제로 겪는 곤란. "무엇이 안 되는가".
- O (기회): 우리 앱이 3개월 안에 들어갈 수 있는 자리. "우리가 무엇을 해 볼 수 있는가".
- N (니즈): 소비자가 이미 돈이나 시간을 쓰고 있거나 직접 찾고 있는 것. "소비자가 무엇을 원하고 있는가".

## 재료
- 현재 PON 리스트: ${ROOT}/data/extras/pon.json (items 32개, 각 항목에 refs[{issue, section}]이 있다)
- 회차 노트: ${ROOT}/data/notes/<회차>.json (sections[] 배열, 인덱스는 0부터. refs.section 은 1부터 세는 번호이므로 section-1 번째 원소다)
- 원문 한국어 번역본: ${ROOT}/data/raw_ko/<회차>.json (sections[].heading_en, body)
- 원문(영어): ${SRC}/<회차>_*.md  (예: 33회차는 33_2026-04-19_Weekly-Health-Tech-Reads-4-19-26.md). 숫자와 주체를 확인할 때는 반드시 이 원문을 연다.
- 회사 프로필: ${ROOT}/data/companies/<slug>.json
- 기존 HF0 작업(어제 만든 28개, 기각 결론): ${ROOT}/data/_hf0_prior.json

## 반드시 지킬 것
- 재료에 있는 사실만 쓴다. 숫자는 원문에서 확인한 것만 쓰고, 확인 못 한 숫자는 "확인 못 함"으로 적는다.
- 회사가 스스로 낸 수치, 뉴스레터 필자의 추정, 제삼자 실측을 구분해서 출처 성격을 적는다.
- 이모지와 엠대시를 쓰지 않는다. 문체는 "~다" 체. 비유 표현(지렛대, 발목을 잡다, 몸집, 무대, 노릇, 단골, 분수령, 판을 흔들다)을 쓰지 않는다.
- 영어 약어 첫 등장에 한글 풀이를 붙인다. 회사 이름은 원어 그대로.
- JSON 문자열 안에 이모지나 특수 유니코드를 넣지 않는다.`

const GRADE_SCHEMA = {
  type: 'object',
  properties: {
    part: { type: 'string' },
    graded: { type: 'integer' },
    kept: { type: 'integer' },
    dropped: { type: 'integer' },
    fixes: { type: 'integer', description: '원문 대조에서 고친 숫자·귀속 수' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['part', 'graded', 'kept', 'saved'],
}
const CTX_SCHEMA = {
  type: 'object',
  properties: { part: { type: 'string' }, written: { type: 'integer' }, saved: { type: 'boolean' }, note: { type: 'string' } },
  required: ['part', 'written', 'saved'],
}
const RV_SCHEMA = {
  type: 'object',
  properties: { kept: { type: 'integer' }, held: { type: 'integer' }, dropped: { type: 'integer' }, changed: { type: 'integer' }, saved: { type: 'boolean' }, note: { type: 'string' } },
  required: ['kept', 'saved'],
}
const OV_SCHEMA = {
  type: 'object',
  properties: {
    kept: { type: 'integer' }, high: { type: 'integer' }, mid: { type: 'integer' }, low: { type: 'integer' },
    glossary: { type: 'integer' }, saved: { type: 'boolean' }, headline: { type: 'string' },
  },
  required: ['kept', 'saved'],
}

const GROUPS = args || []
log(`PON 재정리 ${GROUPS.length}묶음 시작`)

/* 1단계: 원문 대조 + 확신도 + 카드 본문 → 2단계: 살아남은 항목의 상황 이해 */
const results = await pipeline(
  GROUPS,
  (g) => agent(
    `${COMMON}

## 할 일
PON 리스트 가운데 **${g.ids.join(', ')}** 네 항목을 맡는다. 항목마다 아래 순서로 일한다.

### 1. 원문 대조
항목의 evidence 와 refs 에 적힌 숫자·주체·연도를 해당 회차의 **원문(영어 md)** 에서 찾아 확인한다.
노트나 번역본만 보고 넘어가지 않는다. 확인 결과를 checks 배열에 적는다:
  { "claim": "대조한 문장", "status": "맞음" | "틀림" | "원문에 없음" | "확인 못 함", "fix": "틀렸으면 바른 값과 근거, 아니면 빈 문자열", "issue": "33" }
틀린 것은 카드 본문에서 바른 값으로 고쳐 쓰고, 원문에 없는 것은 근거로 쓰지 않는다.

### 2. 확신도 (근거가 얼마나 확실한가)
- 높음: 제삼자 실측이나 공시·정부 통계가 있고, 서로 다른 회차나 출처 둘 이상이 같은 방향을 가리키며, 대조에서 틀린 것이 없다.
- 중간: 근거는 있으나 회사 자체 발표뿐이거나, 회차 하나에만 나오거나, 소비자 쪽 숫자가 아니라 회사 쪽 숫자다.
- 낮음: 필자의 추정이나 방향성뿐이고 숫자가 없거나, 대조에서 핵심 숫자가 틀렸다.

### 3. 3개월 판정
GOAL.md 조건(3개월, 소프트웨어 인력만, B2C 화면, 현금 리워드·건강 나이 제외)을 다시 댄다.
verdict 는 "착수 후보" | "보류" | "제외" 중 하나이고 verdict_why 에 이유를 두세 문장으로 적는다.
- 제외: 근거가 무너졌거나(핵심 숫자 틀림, 원문에 없음), 3개월 조건을 못 넘거나, 기존 HF0 28개와 같은 내용이거나 기각 결론에 걸리는 것.
- 보류: 방향은 맞지만 사람 축 숫자가 없어 크기를 못 재는 것, 또는 다른 항목과 합쳐야 하는 것(merge_into 에 상대 id).
- 착수 후보: 확신도 높음이나 중간이고 3개월 조건을 넘는 것.
억지로 살리지 않는다. 32개 중 절반이 떨어져도 정상이다.

### 4. 카드 본문 (verdict 와 무관하게 전부 쓴다. 제외된 항목도 왜 제외됐는지 보여 줘야 한다)
{
  "id": "PON-07",
  "kind": "P" | "O" | "N"  (정의에 맞게 다시 본다),
  "verdict": "착수 후보" | "보류" | "제외",
  "verdict_why": "...",
  "merge_into": "PON-03 또는 빈 문자열",
  "confidence": "높음" | "중간" | "낮음",
  "confidence_why": "두세 문장. 어떤 출처가 있고 무엇이 빠졌는지.",
  "checks": [ ... ],
  "voice": "겪는 사람이 하는 말처럼 쓴 제목 한 문장. 20~35자. 예: 고지서 금액 보고 던져놨더니 보험이 안 켜져 있었다",
  "gist": "한 줄 요약. 무슨 상황인지, 무엇이 핵심인지 한두 문장.",
  "who": "정확히 누가 겪나 한 구절. 예: ACA 개인시장에서 보험을 산 미국인",
  "scene": "장면 서술 한 문단(3~5문장). 그 사람이 언제 어디서 무엇을 보고 무엇을 하는지. 숫자 없이 상황만.",
  "key_number": "이 항목을 떠받치는 숫자 한 줄. 예: 2026년 1월 ACA 가입자의 14%가 첫 보험료 미납",
  "key_number_src": "출처 성격. 예: 계리법인 Wakely 보고서, WSJ 인용",
  "size": { "label": "겪는 사람 규모 한 구절 (예: ACA 가입자의 14%). 원문에 사람 축 분모가 없으면 미측정(무엇이 없는지)", "grade": "큼" | "중간" | "작음" | "미측정", "why": "한두 문장", "denom": "분모가 무엇인지" },
  "freq": { "label": "얼마나 자주 (예: 연 1회, 1월에 몰림 / 매일 / 평생 몇 번)", "grade": "매일" | "주간" | "월간" | "연간" | "평생몇번" | "미측정", "why": "한두 문장" },
  "sev": { "label": "한 번 겪으면 무슨 결과 (예: 자기도 모르게 무보험, 청구서 전액)", "grade": "큼" | "중간" | "작음" | "미측정", "why": "한두 문장", "money": "돈으로 환산된 것이 있으면, 없으면 빈 문자열" },
  "magnitude_note": "세 축을 겹쳐 봤을 때 무엇이 보이는지 한두 문장. 숫자가 없는 축은 없다고 솔직히 적는다.",
  "why_now": "왜 지금인가 한두 문장",
  "build": "만들 것. 화면에 무엇이 뜨고 사용자가 무엇을 하는지 구체적으로 두세 문장. 현금 리워드·건강 나이는 쓰지 않는다.",
  "risk": "가장 큰 위험 한두 문장",
  "evidence": [ { "text": "사실 문장 하나. 숫자와 연도와 주체를 넣는다.", "issue": "33", "section": 10, "src": "출처 성격(회사 발표 / 상장사 공시 / 제삼자 실측 / 정부 통계 / 필자 추정)", "kind": "핵심" | "보강" | "반증" } ],
  "counter": "반대 방향 근거를 한 문장으로. 없으면 빈 문자열",
  "cases": [ { "name": "회사·서비스", "slug": "프로필이 있으면 슬러그", "note": "이 사례가 무엇을 보여 주는지 한 줄" } ],
  "prior": "기존 HF0 28개와의 관계. 무관이면 빈 문자열",
  "feasibility": "3개월·소프트웨어·B2C 조건을 어떻게 넘는지 한두 문장"
}
evidence 는 핵심 2개 이상, 반증이 있으면 반드시 넣는다. 각 줄의 issue 와 section 은 실제로 그 사실이 있는 회차 노트의 번호다.

## 저장
Write 도구로 ${ROOT}/data/_pon2_part_${g.part}.json 에 { "items": [ ...4개... ] } 로 저장한다.`,
    { label: `grade:${g.part}`, phase: 'Grade', schema: GRADE_SCHEMA }
  ),
  (graded, g) => graded && graded.saved ? agent(
    `${COMMON}

## 할 일
다른 작업자가 ${ROOT}/data/_pon2_part_${g.part}.json 에 PON 항목 4개의 카드 본문을 써 두었다.
그 가운데 **verdict 가 "착수 후보" 또는 "보류"인 항목**에 대해 "상황 이해" 다섯 문단을 쓴다. "제외"는 건너뛴다.
독자는 미국 의료 제도를 전혀 모르므로, 이 다섯 문단만 읽어도 그 상황이 미국에서 왜 생기는지 이해되어야 한다.
카드의 evidence 에 적힌 회차의 원문(영어 md)과 노트를 다시 열어 사실을 확인하면서 쓴다. 새 사실을 지어내지 않는다.

각 항목:
{
  "id": "PON-07",
  "how_it_works": "이게 어떻게 굴러가길래. 미국 제도에서 이 상황이 생기는 구조를 5~8문장으로. 제도 이름이 나오면 그 자리에서 풀이한다.",
  "why_stuck": "왜 아직 아무도 안 풀었나. 첫째, 둘째, 셋째로 나눠 이해관계와 구조를 4~7문장으로.",
  "who_exactly": "정확히 누가 겪나. 미국인 전체가 아니라 어떤 조건의 사람인지 2~4문장. 사람 수나 비율이 원문에 있으면 넣는다.",
  "numbers_plain": "숫자를 사람 수로 풀면. '100명 중 몇 명' 식으로 2~3문장. 숫자가 없으면 없다고 적는다.",
  "korea_analogy": "한국에 빗대면. 한국 제도에서 대응물이 있는지, 없다면 왜 없는지 2~4문장.",
  "sources_note": "근거를 어느 대목에서 가져왔나. 어떤 회차의 어떤 꼭지에서 무엇을 가져왔고 어떤 성격의 자료인지 한 문단(3~5문장). 못 연 자료가 있으면 밝힌다.",
  "quotes": [ { "issue": "33", "section": 10, "ko": "그 꼭지의 번역본(raw_ko)에서 근거가 된 문장 한두 개를 그대로 옮긴다", "what": "이 대목에서 무엇을 가져왔는지 한 문장" } ]
}

## 저장
Write 도구로 ${ROOT}/data/_pon2_ctx_${g.part}.json 에 { "items": [ ... ] } 로 저장한다.`,
    { label: `context:${g.part}`, phase: 'Context', schema: CTX_SCHEMA }
  ) : null
)

const okGrade = results.filter(Boolean).length
log(`카드 작성 완료 ${okGrade}/${GROUPS.length} 묶음`)

/* 3단계: 판정을 한 사람이 다시 본다 (묶음별로 기준이 흔들린 것을 맞춘다) */
const rv = await agent(
  `${COMMON}

## 할 일
여덟 명이 나눠 쓴 카드(${ROOT}/data/_pon2_part_1.json ~ _pon2_part_8.json, 32개)의 **판정(verdict)만** 한 기준으로 다시 본다.
1차 판정은 "사람 축 숫자가 없으면 보류"로 기울어 착수 후보가 4개뿐이고 보류가 15개다.
참고 형식(다른 작업자의 P/O/N 리스트)은 크기가 미측정이어도 방향이 확실하고 3개월 안에 만들 수 있으면 착수 후보에 넣고,
크기 칸에 "미측정"이라고 정직하게 적었다. 그 기준을 여기에도 쓴다.

### 기준
- **착수 후보**: 확신도가 높음 또는 중간이고, 3개월·소프트웨어·B2C 조건을 넘고, 소비자에게 줄 건강 가치가 있는 '만들 것'이 카드에 적혀 있는 항목.
  크기·빈도·심각성이 미측정이어도 탈락 사유가 아니다. 미측정은 표에 그대로 드러난다.
- **보류**: 확신도가 낮음이거나(핵심 근거가 필자 추정뿐, 또는 회사 한 곳의 자체 발표 하나뿐), 다른 항목과 합쳐야 하는 것(merge_into).
- **제외**: 핵심 근거가 원문에 없거나 틀렸거나, 3개월 조건을 못 넘거나, 기존 HF0 28개·기각 결론과 같은 내용이거나,
  '만들 것'이 아니라 '지켜야 할 규칙·원칙'인 항목(예: 의료기기 경계, 해지 규제, 가입 관문 설계).
  규칙·원칙 항목은 제외하되 verdict_why 에 "원칙으로 남김"이라고 적어 리스트 밖에서 살릴 수 있게 한다.
- 1차에 "제외"였던 항목을 착수 후보로 올리지 않는다(근거 붕괴나 중복으로 죽은 것이라 되살릴 근거가 없다). 보류를 착수 후보나 제외로, 착수 후보를 보류나 제외로 옮기는 것만 한다.
- 같은 사람을 다른 말로 겨냥한 항목이 둘이면 하나를 merge_into 로 접는다.

### 저장
Write 도구로 ${ROOT}/data/_pon2_verdict.json 에 아래 형태로 저장한다. 32개 전부 넣는다(바뀌지 않은 것도).
{ "items": [ { "id": "PON-07", "verdict": "착수 후보" | "보류" | "제외", "verdict_why": "새 기준으로 다시 쓴 이유 두세 문장. 1차 판정과 달라졌으면 무엇 때문에 달라졌는지 밝힌다.", "merge_into": "", "changed": true } ] }`,
  { label: 'reverdict', phase: 'Reverdict', schema: RV_SCHEMA }
)
log(`재판정: 착수 후보 ${rv ? rv.kept : '?'} · 보류 ${rv ? rv.held : '?'} · 제외 ${rv ? rv.dropped : '?'} (바뀐 것 ${rv ? rv.changed : '?'})`)

/* 4단계: 전체를 보고 머리글·깔때기·카테고리·용어 */
const overview = await agent(
  `${COMMON}

## 할 일
${ROOT}/data/_pon2_part_*.json (카드 32개, 여덟 파일 전부)와 ${ROOT}/data/_pon2_ctx_*.json (상황 이해)을 전부 읽고, 리스트 전체에만 붙는 부분을 쓴다.
**판정은 ${ROOT}/data/_pon2_verdict.json 이 최종이다.** 카드 파일의 verdict 가 아니라 이 파일의 verdict 로 착수 후보·보류·제외를 센다. (2차 실행: 1묶음이 뒤늦게 합류했고 판정이 한 기준으로 다시 정리됐다.)
그리고 ${ROOT}/data/_pon_part_1.json ~ _pon_part_4.json 의 후보 수(77개)와 ${ROOT}/data/_pon_merged.json (32개),
${ROOT}/data/extras/report.json (회차 32, 항목 101)을 확인해 거르기 숫자를 맞춘다.

{
  "title": "페이지 제목. 참고 형식은 '미국인이 우리 앱을 열 이유가 될 만한 문제 · 기회 · 니즈 N개'. N은 착수 후보 수.",
  "lede": "부제 한두 문장. 무엇을 빼고 무엇만 남겼는지.",
  "funnel": [ { "n": 32, "label": "회차" }, { "n": 101, "label": "건질 것" }, { "n": 77, "label": "후보" }, { "n": 32, "label": "병합" }, { "n": 착수후보수, "label": "착수 후보" } ],
  "funnel_text": "어떻게 걸렀나. 각 단계에서 무엇을 기준으로 줄였는지 3~5문장.",
  "dropped_pattern": "떨어진 것들의 공통점. 제외·보류된 항목들을 겹쳐 보고 왜 떨어졌는지 유형별로 한 문단(4~7문장). 항목 id 를 괄호로 적는다.",
  "verified_note": "원문 대조에서 무엇이 고쳐졌나. checks 에서 틀림·원문에 없음으로 판정된 것을 모아 한 문단. 없으면 없다고.",
  "magnitude_text": "크기·빈도·심각성 절의 머리말. 착수 후보 가운데 세 축이 다 측정된 것이 몇 개이고 미측정이 몇 개인지, 왜 그런지(이 뉴스레터가 누구를 위한 매체인지) 3~5문장.",
  "categories": {
    "axis1_name": "축 이름", "axis1_values": ["..."],
    "axis2_name": "축 이름", "axis2_values": ["..."],
    "why": "왜 이 두 축인가. 착수 후보와 보류 항목 전체를 읽고 실제로 갈리는 선을 찾은 과정을 한두 문단으로. 사용자가 예로 든 축(운동·수면·식단·정서·복약·검진 / 증상 판단·어디로 갈지·예약·진료·처방·청구·지속 관리)을 먼저 대 보고, 맞지 않으면 왜 버렸는지 적는다.",
    "assignments": [ { "id": "PON-07", "axis1": "값", "axis2": "값", "note": "왜 이 칸인지 한 문장" } ],
    "distribution": "분포에서 보이는 것. 어느 칸에 몰렸고 우리 본업(걸음·식단·수면·기분 기록)과 닿는 칸이 몇 개인지 한 문단."
  },
  "glossary": [ { "t": "ACA", "k": "제도" | "회사" | "서류" | "돈" | "절차" | "약", "full": "정식 명칭과 한글", "d": "설명 2~4문장. 독자가 미국 제도를 모른다고 가정.", "w": "헷갈리는 점 한 문장. 어떤 항목에서 쓰이는지." } ]
}
- glossary 는 착수 후보와 보류 항목의 본문에 실제로 나오는 용어 가운데 모르면 막히는 것 12~18개를 고른다. ${ROOT}/data/extras/glossary.json (911개)에서 뜻을 가져와 다듬는다.
- assignments 는 제외 항목을 뺀 전부에 붙인다. 카테고리는 리스트를 다 읽은 뒤에 정한다.

## 저장
Write 도구로 ${ROOT}/data/_pon2_overview.json 에 저장한다.`,
  { label: 'overview', phase: 'Overview', schema: OV_SCHEMA }
)

return {
  groups: okGrade,
  reverdict: rv ? { kept: rv.kept, held: rv.held, dropped: rv.dropped, changed: rv.changed } : null,
  overview: overview ? { kept: overview.kept, high: overview.high, mid: overview.mid, low: overview.low, glossary: overview.glossary, headline: overview.headline } : null,
}
