export const meta = {
  name: 'htn-notes-v2',
  description: '뉴스레터 회차를 원문 번역 + 주장·근거·사례 구조 노트로 정리하고 원문 대조 검수',
  phases: [
    { title: 'Translate', detail: '원문을 설명 없이 그대로 옮긴 번역본' },
    { title: 'Note', detail: '요약·인사이트 + 필자 주장 + 전문가 주장 + 실제 사례 + 필요한 설명' },
    { title: 'Audit', detail: '원문 대조 — 누락·오귀속·억지 인사이트 걸러내기' },
  ],
}

const RAW = '/Users/gravitylabs/dev/healthtechnerds-notes/data/raw_ko'
const OUT = '/Users/gravitylabs/dev/healthtechnerds-notes/data/notes'

const READER = `## 읽는 사람
한국인이고, 미국 헬스케어 산업을 모르고, 영어도 편하지 않다.
한국 의료(전국민 건강보험, 병원에 그냥 가면 됨)만 안다.
영어 약어(MA, PBM, ACA, FFS, RCM, HCC, PMPM, TiC, LTSS 등)를 모른다.`

const GOAL = `## 이 노트를 읽는 사람이 하려는 일 (인사이트 판단 기준)
우리 팀은 미국에 가서 3개월 동안, 미국인에게 **지금 우리 앱에 없는 건강 가치**를 주어 앱을 쓸 이유를 만들려 한다.
- 현금 리워드와 건강 나이는 이미 있으므로 제외한다.
- 3개월 안에 **소프트웨어 개발 인력만으로** 만들 수 있어야 한다.
  웨어러블 기기 개발, 원천 기술 확보, 규제 허가 취득처럼 3개월 안에 불가능한 것은 제외한다.
- B2C 앱 화면에서 할 수 있는 일이면 조금 어려워도 포함한다.
- 이미 같은 일을 하는 회사가 있어도 상관없다. **그 회사가 어떤 고객 문제를 푸는지**가 중요하다.

이 목적에 실제로 쓸 수 있는 것이 보일 때만 insight 를 적는다.
**대부분의 꼭지에는 인사이트가 없는 것이 정상이다.** 없으면 null 로 두고 억지로 만들어 내지 않는다.
업계 동향이라서 흥미롭다는 이유만으로는 인사이트가 아니다.
"그래서 앱에서 무엇을 해 볼 수 있는가"에 답이 되어야 인사이트다.`

const RULES = `## 반드시 지킬 것
- 원문을 처음부터 끝까지 전부 읽는다. 앞부분만 보고 쓰지 않는다.
- 원문에 없는 사실, 수치, 주장을 지어내지 않는다.
- 주장을 누가 했는지 반드시 가른다. 필자가 한 말과 인터뷰이가 한 말을 섞지 않는다.
- 트래킹 URL(elinkfef.healthtechnerds.com 등)은 결과에 넣지 않는다.
- 이모지를 쓰지 않는다.
- 문체는 담백한 설명체이며 "~다" 체로 통일한다.
- **분량을 늘리지 않는다.** 원문 번역본이 왼쪽에 나란히 표시되므로, 노트가 번역을 되풀이할 필요가 없다.
  노트는 원문을 구조로 정리하고, 모르면 막히는 대목만 설명한다.`

const SCHEMA = `## 저장할 JSON 스키마
{
  "index": "01",
  "date": "2026-01-04",
  "type": "reads",
  "title_en": "원문 제목 그대로",
  "title_ko": "이 회차가 무슨 이야기였는지 보이는 한글 제목. 20자 안팎.",
  "hook": "이 회차를 한 문장으로. 60자 안팎.",
  "tldr": [
    { "point": "이 회차에서 딱 이것만 기억하면 되는 것. 한 문장.",
      "note": "그 문장을 이해하는 데 필요한 설명 한 문장. 아래 '요약 쓰는 법' 참고." }
  ],
  "issue_insight": {
    "verdict": "yes 또는 no",
    "summary": "이 회차 전체 판단 한두 문장. 길게 쓰지 않는다.",
    "build": [
      { "title": "짧은 제목 한 줄", "detail": "무엇을 만들 수 있는지 한두 문장", "section": 5 }
    ],
    "signal": [
      { "title": "짧은 제목 한 줄", "detail": "미국 소비자가 어디에 돈과 시간을 쓰는지 한두 문장", "section": 9 }
    ]
  },
  "sections": [
    {
      "heading_ko": "꼭지 제목(한글)",
      "heading_en": "원문 소제목. 없으면 빈 문자열",
      "skip": null,
      "summary": "이 꼭지가 무슨 이야기인지 2~4문장. 왼쪽 번역본을 읽기 전에 방향을 잡아 주는 글이다.",
      "insight": "3개월 안에 앱에서 만들 수 있는 것이 보일 때만 2~4문장. 없으면 null.",
      "signal": "미국 소비자 시장의 흐름이 드러날 때만 2~4문장. 없으면 null. 아래 '시장 신호' 참고.",
      "author": [
        { "claim": "필자가 한 주장 한 줄", "evidence": "그 주장을 뒷받침하려고 필자가 든 근거. 없으면 '근거를 대지 않았다'라고 적는다." }
      ],
      "experts": [
        { "who": "이름", "role": "어디 소속의 누구인지 한 줄", "claim": "그 사람이 한 주장", "evidence": "그 사람이 든 근거. 없으면 '근거를 대지 않았다'." }
      ],
      "cases": [
        { "name": "회사·기관·제도 이름", "what": "무엇을 했는지 1~2문장",
          "scale": "금액·건수·비율 같은 규모. 원문에 없으면 빈 문자열",
          "note": "이 사례에서 눈여겨볼 대목. 없으면 빈 문자열",
          "sells_to": "consumer | mixed | provider | payer | employer | pharma | other | none" }
      ],
      "notes": [
        { "term": "PBM", "ko": "약제비 관리 회사",
          "plain": "모르면 이 꼭지가 안 읽히는 말만 넣는다. 2~4문장. 필요하면 한국 제도와 견주어 설명한다." }
      ]
    }
  ],
  "themes": ["최대 6개, 아래 목록 키만"],
  "for_later": []
}

## 각 항목을 채우는 법

**tldr (요약 쓰는 법)** — 3~6개다.

  **한 항목에 한 주제를 통째로 담는다.** 같은 사건, 같은 회사, 같은 논쟁을 두 항목으로 쪼개지 않는다.
  쪼개 놓으면 읽는 사람이 두 항목을 스스로 이어 붙여야 해서 오히려 헷갈린다.
  point 가 두 줄이 되어도 괜찮다. 다만 세 줄은 넘기지 않는다.
    나쁜 예 (같은 사건을 둘로 쪼갬):
      1. "시 직원 보험 플랜이 응급실 체인 한 곳 때문에 예산을 4,000만 달러 넘겼다"
      2. "그 체인은 중재 절차로 값을 두 배로 올렸고 넘긴 건의 99.6%에서 이겼다"
    좋은 예 (한 항목에 담음):
      1. "시 직원 보험 플랜이 응급실 체인 한 곳 때문에 한 해 예산을 4,000만 달러 넘겼는데,
         그 체인은 No Surprises Act 중재로 값을 두 배로 올리고 넘긴 건의 99.6%에서 이겼다"
  항목 수는 회차에 담긴 **주제 수**에 맞춘다. 여섯 개를 채우려고 한 주제를 나누지 않는다.

  point 는 그 주제의 핵심을 적는다.
  note 는 그 문장을 이해하는 데 필요한 설명 **한 문장**이다. 배경, 용어 풀이, 왜 그런 일이 벌어지는지 가운데
  가장 막히는 것 하나만 고른다. point 에 이미 있는 말을 되풀이하지 않는다.
    나쁜 예: point "AI 투자가 접수 창구로 몰렸다" / note "AI 투자가 접수 창구 쪽으로 몰렸다는 뜻이다"
    좋은 예: point "AI 투자가 접수 창구로 몰렸다" / note "미국 병원은 진료비를 스스로 올릴 수 없어 이익을 늘리려면 인건비를 줄여야 하고, 전화 응대가 사람이 가장 많이 필요한 자리다"
  point 만으로 충분히 읽히면 note 를 빈 문자열로 둔다. 억지로 채우지 않는다.

**summary** — 왼쪽 번역본을 읽기 전에 방향을 잡아 주는 글이다. 2~4문장. 사건을 되풀이하지 말고 무슨 이야기인지 알려 준다.

**insight** — 위 '이 노트를 읽는 사람이 하려는 일'을 기준으로 판단한다.
  앱에서 시험해 볼 수 있는 것이 실제로 보일 때만 적는다. 그럴 때도 "무엇을 해 볼 수 있는지"를 구체적으로 적는다.
  보이지 않으면 **null 로 둔다.** 억지로 만들지 않는다. 인사이트가 없는 꼭지가 대부분이다.

**signal (시장 신호)** — 지금 당장 만들 것은 아니지만, **미국 소비자가 무엇에 돈과 시간을 쓰고 있는지**
  보여 주는 흐름이다. 실행할 것을 찾으려면 먼저 사람들이 어디에 이미 돈을 쓰고 있는지 알아야 하므로,
  insight 와 따로 모은다.
  예를 들면 승인 절차 밖의 주사제를 스스로 사 오는 흐름, 무료 AI 상담 창구로 사람이 몰리는 흐름,
  비만 치료제를 시작한 사람이 계속 맞기 어려워하는 흐름 같은 것이다.
  판단 기준은 두 가지이고 **둘 다** 맞아야 한다.
    (1) 미국 소비자가 직접 돈이나 시간을 쓰는 행동이 드러나는가
    (2) 그 규모나 방향을 보여 주는 근거가 원문에 있는가
  규제나 기기 개발이 필요해서 우리가 못 만드는 것이어도, 수요가 어디 있는지 보여 주면 signal 로 남긴다.
  다만 병원과 보험사 사이의 돈 이야기, 청구 업무, 기업 인수합병은 소비자 행동이 아니므로 signal 이 아니다.
  보이지 않으면 null 로 둔다.

**issue_insight (회차 전체)** — build 와 signal 두 갈래로 나눠 **불렛으로** 적는다.
  summary 는 회차 전체 판단 한두 문장이다. 길게 늘어놓지 않는다. 상세한 내용은 불렛으로 옮긴다.
  build 에는 3개월 안에 앱에서 만들 수 있는 것을, signal 에는 소비자 시장의 흐름을 넣는다.
  각 불렛의 title 은 한 줄로 짧게, detail 은 한두 문장으로 적는다. section 에는 근거가 된 꼭지 번호를 넣는다.
  build 와 signal 이 둘 다 비면 verdict 를 "no" 로 두고 summary 에 왜 없는지 적는다.

**author** — 필자(뉴스레터를 쓰는 사람)가 자기 의견으로 내놓은 주장만 담는다.
  사실 전달은 여기에 넣지 않는다. 근거가 없으면 없다고 적는다. 주장이 없으면 빈 배열로 둔다.

**experts** — 필자가 아닌 사람이 한 말이다. 인터뷰이, 임원, 연구자, 정부 인사, 인용된 글의 저자가 여기에 들어간다.
  role 에는 그 사람이 어느 편에 선 사람인지 적는다. 예를 들어 "성과 기반 진료로 사업하는 회사의 공동창업자"처럼
  이해관계가 드러나게 적는다. 그래야 주장을 어느 정도로 받아들일지 판단할 수 있다.
  없으면 빈 배열로 둔다.

**cases** — 실제로 벌어진 일이다. 투자 유치, 인수합병, 제품 출시, 소송, 제도 시행, 실적 발표가 여기 들어간다.
  회사가 무엇을 파는 곳인지 what 안에서 한 줄로 밝힌다. 없으면 빈 배열로 둔다.

  **sells_to (누구에게 파는가)** 를 반드시 붙인다. 나중에 이 값으로 더 조사할 회사를 고른다.
  기준은 **누가 고르고 누가 돈을 내는가** 하나다.
    - "consumer" : 소비자가 스스로 찾아와 가입하고 자기 돈을 낸다. 앱이나 웹에서 바로 쓸 수 있다.
    - "mixed"    : 소비자 직접 판매와 고용주·보험사 판매를 함께 한다.
    - "provider" : 병원, 의원, 의사에게 판다. 소비자는 그 존재를 모른다.
    - "payer"    : 보험사에게 판다.
    - "employer" : 고용주에게 판다. 직원이 쓰더라도 고를 권한과 지불은 회사에 있다.
    - "pharma"   : 제약사나 기기 회사에게 판다.
    - "other"    : 위 어디에도 안 맞는다. 정부 기관이나 제도가 여기 들어간다.
    - "none"     : 회사가 아니다. 소송, 규제, 제도 같은 사례다.
  환자를 직접 보더라도 지불하는 쪽이 정부나 보험사라면 consumer 가 아니다. 그때는 payer 나 other 다.
  판단이 서지 않으면 원문 표현을 그대로 따르되, 소비자가 직접 돈을 낸다는 근거가 없으면 consumer 로 적지 않는다.

**notes** — **모르면 그 꼭지가 안 읽히는 말만** 넣는다. 뜻이 뻔한 말은 넣지 않는다.
  꼭지마다 0~4개다. 하나도 필요 없으면 빈 배열로 둔다.
  넣을 때는 2~4문장으로 제대로 설명한다. 번역어만 적어 놓으면 그 번역어가 또 하나의 암호가 되어 소용이 없다.
  제도나 지불 방식을 설명할 때는 (1) 그전에는 어땠는지 (2) 돈이 누구에게서 누구에게 흐르는지
  (3) 어디서 말썽이 나는지 (4) 한국 제도와 견주면 무엇인지를 담는다.`

const SKIP = `## 건너뛰는 꼭지 (skip)
독자가 읽지 않아도 되는 자리는 표시해 둔다. 화면에서 접힌 채로 나온다.
- "sponsor" : 후원사가 돈을 내고 실은 광고 자리
- "promo"   : 뉴스레터가 자기 커뮤니티, 행사, 유료 상품을 알리는 자리
- "admin"   : 인사말, 일정 공지, 다음 호 예고처럼 내용이 거의 없는 자리
- 실제 소식과 분석은 skip 을 null 로 둔다.

**skip 이 붙은 꼭지는 거의 비워 둔다.** summary 만 1~2문장 적고,
insight 는 null, author·experts·cases·notes 는 모두 빈 배열로 둔다.
채용 공고, 구독·수신거부 안내는 꼭지로 만들지 않고 아예 뺀다.`

const THEMES = [
  'medicare 메디케어', 'medicare-advantage 메디케어 어드밴티지', 'medicaid 메디케이드',
  'aca-exchange ACA 거래소', 'employer-insurance 고용주 보험', 'payer-ops 보험사 운영',
  'hospital-health-system 병원·헬스시스템', 'primary-care 1차 진료', 'value-based-care 성과기반 진료',
  'rcm-billing 청구·수납', 'pbm-drug-pricing PBM·약값', 'pharmacy-retail 약국·리테일',
  'pharma-glp1 제약·GLP-1', 'price-transparency 가격 투명성', 'consumer-dtc 소비자 직접판매',
  'cash-pay 현금 결제 시장', 'employer-benefits 복리후생', 'ai-clinical 임상 AI',
  'ai-admin 행정 AI', 'data-interop 데이터 상호운용', 'telehealth 원격진료',
  'behavioral-mental 정신건강', 'chronic-care 만성질환 관리', 'senior-care 시니어 케어',
  'women-health 여성 건강', 'dental-vision 치과·안과', 'devices-wearables 기기·웨어러블',
  'digital-health-funding 투자·펀딩', 'ma-consolidation 인수합병', 'regulation-cms CMS 규제',
  'regulation-fda FDA 규제', 'policy-legislation 입법·정책', 'public-health 공중보건',
  'workforce 인력', 'rural-access 의료 접근성', 'clinical-trials 임상시험',
  'insurance-brokerage 보험 유통', 'startups 스타트업', 'market-earnings 실적·시장',
].join(', ')

const TRANS_SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    sections: { type: 'integer' },
    chars: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['index', 'sections', 'saved'],
}

const NOTE_SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    title_ko: { type: 'string' },
    section_count: { type: 'integer' },
    insight_count: { type: 'integer', description: 'insight 가 null 이 아닌 꼭지 수' },
    expert_count: { type: 'integer' },
    case_count: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['index', 'title_ko', 'section_count', 'saved'],
}

const AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    misattributed_fixed: { type: 'integer', description: '필자와 전문가 주장이 섞여 있던 것을 고친 수' },
    forced_insights_removed: { type: 'integer', description: '억지 인사이트를 null 로 되돌린 수' },
    missing_added: { type: 'integer' },
    notes_trimmed: { type: 'integer', description: '설명이 필요 없는데 들어가 있어 뺀 수' },
    verdict: { type: 'string', enum: ['clean', 'patched', 'rebuilt'] },
    summary: { type: 'string' },
  },
  required: ['index', 'verdict', 'summary'],
}

const files = args || []
log(`회차 ${files.length}건 처리 시작`)

const results = await pipeline(
  files,
  /* 1단계: 원문을 설명 없이 옮긴 번역본 */
  (f) => f.hasRaw
    ? { index: f.index, sections: -1, saved: true, note: '기존 번역본 재사용' }
    : agent(
      `뉴스레터 원문을 한국어로 옮기는 작업이다. 이 번역본은 화면 왼쪽에 본문으로 표시되고,
오른쪽에는 같은 내용을 정리한 노트가 나란히 놓인다.

- 원문 파일: ${f.path}
- 저장 위치: ${RAW}/${f.index}.json

## 이 작업의 성격
설명을 덧붙인 정리물이 아니라 **원문을 그대로 옮기기만 한 번역본**이다.

**반드시 지킬 것**
- 원문에 있는 문장만 옮긴다. 배경 설명, 용어 풀이, 구조 해설을 덧붙이지 않는다.
- 영어 약어는 원문에 나온 그대로 둔다. VBC, PBM, FFS 처럼 원문이 약어로 쓴 것은 약어로 옮긴다.
- 회사 이름, 사람 이름은 원문 표기 그대로 둔다. 한글 음차를 병기하지 않는다.
- 문장 순서와 문단 구분을 원문대로 유지한다. 요약하거나 생략하지 않는다.
- 다만 읽을 수 있는 한국어로 옮긴다. 어순이 뒤틀린 기계 번역체로 만들지 않는다.
- 트래킹 URL 은 넣지 않는다. 구독 안내, 수신 거부, 채용 공고는 제외한다.
- 광고와 스폰서 블록, 커뮤니티·행사 홍보는 남긴다. 뒤에서 접어서 보여 줄 것이다.

## 꼭지 나누기
원문의 소제목을 기준으로 나눈다. 소제목 하나 아래에 서로 다른 소식이 여러 건 묶여 있으면
(예: Other Top Headlines 아래 여러 항목) 소식마다 따로 꼭지를 만들고 heading_en 은 같은 소제목을 되풀이해 넣는다.

## 저장할 JSON
{
  "index": "${f.index}",
  "title_en": "${f.subject}",
  "subtitle": "원문 부제를 직역. 없으면 빈 문자열",
  "sections": [ { "heading_en": "원문 소제목. 없으면 빈 문자열",
                  "body": "그 꼭지의 원문 번역. 문단 구분은 줄바꿈 두 개로 유지한다." } ]
}

Write 도구로 저장한 뒤, 파일을 다시 읽어 꼭지 수와 트래킹 URL 잔존 여부를 확인하고 StructuredOutput 을 반환한다.`,
      { label: `raw:${f.index}`, phase: 'Translate', schema: TRANS_SCHEMA }
    ),

  /* 2단계: 구조 노트 */
  (prev, f) => {
    if (!prev || !prev.saved) return null
    return agent(
      `${READER}

${GOAL}

## 할 일
뉴스레터 한 회차를 구조 노트로 정리한다.

- 원문 파일: ${f.path}
- 원문 번역본: ${RAW}/${f.index}.json  (화면 왼쪽에 본문으로 나온다. **꼭지 순서와 개수를 여기에 맞춘다.**)
- 저장 위치: ${OUT}/${f.index}.json
- 이 회차 index "${f.index}" / date "${f.date}" / type "${f.type}"
- 원문 제목: ${f.subject}

먼저 원문 번역본을 읽어 꼭지 구성을 파악하고, 원문도 함께 읽어 인용과 수치를 확인한다.
노트의 sections 는 번역본의 sections 와 **같은 순서, 같은 개수**여야 한다. 나란히 놓고 보기 때문이다.

${RULES}

${SCHEMA}

${SKIP}

## 고를 수 있는 themes 키 (키만 쓴다)
${THEMES}

Write 도구로 ${OUT}/${f.index}.json 에 저장한 뒤 StructuredOutput 을 반환한다.

${STYLE}`,
      { label: `note:${f.index}`, phase: 'Note', schema: NOTE_SCHEMA }
    )
  },

  /* 3단계: 원문 대조 감사 */
  (prev, f) => {
    if (!prev || !prev.saved) return null
    return agent(
      `${READER}

${GOAL}

## 할 일
방금 만든 구조 노트를 원문과 대조해 고친다. 너는 감사자다. 좋게 봐주지 않는다.

- 원문 파일: ${f.path}
- 원문 번역본: ${RAW}/${f.index}.json
- 노트 파일: ${OUT}/${f.index}.json

셋을 모두 읽고 아래를 점검한다.

1. **꼭지 대응**: 노트의 sections 가 번역본의 sections 와 같은 순서, 같은 개수인가. 어긋나면 맞춘다.
2. **주장 귀속**: 필자가 한 말이 experts 에 들어가 있거나, 인터뷰이가 한 말이 author 에 들어가 있지 않은가.
   섞여 있으면 갈라 놓는다. 이것이 이 감사에서 가장 중요한 항목이다.
3. **근거**: claim 마다 evidence 가 원문에 실제로 있는가. 없는데 있는 것처럼 적었으면 "근거를 대지 않았다"로 고친다.
3-1. **요약이 쪼개져 있는가**: tldr 의 두 항목이 같은 사건이나 같은 회사를 나눠 담고 있으면 한 항목으로 합친다.
   합칠 때 point 가 두 줄이 되어도 괜찮다. 합친 뒤 note 도 다시 쓴다.
4-0. **회차 전체 인사이트**: issue_insight 가 build 와 signal 두 갈래 불렛으로 되어 있는가.
   summary 가 한두 문장을 넘겨 장황하면 줄이고 내용을 불렛으로 옮긴다.
   build 와 signal 의 section 번호가 실제 꼭지와 맞는지 확인한다.
   tldr 의 note 가 point 를 되풀이하고 있으면 배경 설명으로 바꾸거나 빈 문자열로 둔다.
4-1. **시장 신호**: 소비자가 직접 돈이나 시간을 쓰는 흐름이 드러난 꼭지에 signal 이 비어 있으면 채운다.
   반대로 병원과 보험사 사이의 돈 이야기, 청구 업무, 기업 인수합병에 signal 이 붙어 있으면 null 로 되돌린다.
   그것은 소비자 행동이 아니다.
4. **억지 인사이트**: insight 가 위 목적에 정말로 쓸 수 있는 것인가.
   "업계 흐름이라 흥미롭다" 수준이거나, 웨어러블 개발·규제 허가처럼 3개월 안에 불가능한 것을 적었으면 **null 로 되돌린다.**
   인사이트가 없는 꼭지가 대부분인 것이 정상이다. 억지로 채운 것을 걷어내는 일이 이 항목의 목적이다.
5. **불필요한 설명**: notes 에 뜻이 뻔한 말이 들어가 있으면 뺀다.
   반대로 모르면 안 읽히는 말인데 빠져 있으면 넣고 2~4문장으로 제대로 설명한다.
6. **사실**: 수치, 회사 이름, 날짜가 원문과 다르면 고친다. 원문에 없는 내용은 지운다.
7. **건너뛰는 꼭지**: 광고·홍보·인사말에 skip 값이 붙어 있는가. skip 이 붙은 꼭지는 summary 만 남기고 나머지를 비운다.
8. **분량**: 노트가 번역본을 되풀이하고 있지 않은가. 되풀이하는 문장은 지운다.
   노트는 구조로 정리하고 막히는 대목만 설명하는 자리다.
9. **한국어 문장 지침**: 아래 지침에 어긋난 문장을 고친다. 특히 비유 표현, 엠대시,
   명사구로 끝나 완결되지 않은 문장, 조사·어미 생략을 본다. 문장 형태만 바꾸고 사실은 바꾸지 않는다.

고친 결과를 같은 경로에 전체 JSON 으로 덮어쓰고 StructuredOutput 을 반환한다.

${STYLE}`,
      { label: `audit:${f.index}`, phase: 'Audit', schema: AUDIT_SCHEMA }
    )
  }
)

const ok = results.filter(Boolean)
log(`완료 ${ok.length}/${files.length}`)

return {
  processed: ok.length,
  total: files.length,
  failures: results.map((r, i) => (r ? null : files[i].index)).filter(Boolean),
  audits: ok.map((r) => ({
    i: r.index, v: r.verdict,
    귀속수정: r.misattributed_fixed, 억지인사이트제거: r.forced_insights_removed,
    설명정리: r.notes_trimmed, s: r.summary,
  })),
}
