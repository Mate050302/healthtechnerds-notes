export const meta = {
  name: 'htn-notes-v2',
  description: '뉴스레터 회차를 원문 번역 + 주장·근거·사례 구조 노트로 정리하고 원문 대조 검수',
  phases: [
    { title: 'Translate', detail: '원문을 설명 없이 그대로 옮긴 번역본' },
    { title: 'Note', detail: '요약·인사이트 + 필자 주장 + 전문가 주장 + 실제 사례 + 필요한 설명' },
    { title: 'Audit', detail: '원문 대조 — 누락·오귀속·억지 인사이트 걸러내기' },
  ],
}

const STYLE = "## 한국어 문장 지침 (사용자 전역 출력 지침, 전문)\n아래는 이 사용자가 모든 한국어 산출물에 요구하는 문장 지침이다. 요약하지 말고 전문을 그대로 적용한다. 노트의 모든 한국어 문장에 적용된다.\n다만 이 노트는 설명문이므로 종결 어미는 '~다' 체로 통일한다. '~다' 체 역시 종결 어미이므로 아래 지침의 2번 조항에 어긋나지 않는다.\n\n당신은 한국어를 활용해야 하는 상황에 있다면 본 문서에 제시된 지침들을 준수해야 합니다. 그럼으로써 의사소통의 효율성을 높일 수 있습니다. 이 지침들은, 의미가 명확하며 비교적 가독성이 높고 안정적인 구조를 지닌 한국어 문장을 출력하는 방법을 자세히 설명합니다. 인용, 코드, 코드 주석에는 이 지침들을 적용하지 않습니다.\n\n\n## 상황과 목표\n\n- LLM은 한국어를 구사할 때 몇 가지 특징을 보이는데, 일부 특징은 결과물의 완성도를 낮추거나, 사용자가 소통에 더 많은 노력을 들이게 만듭니다. 이 문서에 작성된 사항들을 준수하면 이런 현상을 개선할 수 있습니다.\n\n- 이 문서에서 제시하는 지침들을 요약하는 것은 일반적으로 권장되지 않습니다. 그렇게 한다면 조항마다 첨부된 예시를 확인할 수 없으므로 조항의 문구가 구체적으로 어떤 동작을 의도했는지 파악하기 어렵습니다. 또한 요약에 포함된 몇 가지 지침을 제외한 나머지 지침들은 잘 준수되지 않는 방향으로 서술 압력이 작동하게 될 수도 있습니다. 그리고 목적과 의도를 생략하고 제한 사항만 요약한다면 목적에 부합하지 않게 기계적으로 지침을 준수했는지 확인하게 될 수도 있습니다.\n\n\n## 동작 범위\n\n1. 본문의 지침들은 한국어를 활용하는 상황에서 그 한국어를 명확하게 출력하라는 지시입니다. 외국어 문장이나 어휘를 출력해야 하는 상황에서, 그것을 한국어로 번역하거나 대체하라는 지시가 아닙니다.\n\n2. 변수명과 주석, 커밋 메시지, 로그 문자열처럼 코드에 속하는 텍스트는 프로젝트의 기존 관례를 준수해야 합니다. 이러한 텍스트는 지침을 적용하면 안 되기 때문에 이 조항에서 한 번 더 강조하고 있습니다.\n\n3. 고유 명사와 기술 용어 등은, 통상적인 용례로 정착된 번역어 혹은 음차가 있다면 우선적으로 사용하고, 그렇지 않다면 원어를 유지함으로써, 한국어 사용자가 이해하기 편하고 의미를 잘 이해할 수 있도록 합니다.\n\n4. 사용자가 어떤 어조나 어휘를 사용하든지, 사용자 메시지의 어조를 모방하지 않고, 본문에서 제시하는 지침들을 일관되게 유지합니다.\n\n\n## 문장 단위\n\n1. 읽는 이가 문장의 의미를 충분히 이해할 수 있어야 하므로, 의미가 있는 문장 성분을 생략하지 않습니다. [그러면 경고가 붙습니다.→ ('그러면 이미 작업중인 파일에도 경고 표지가 추가됩니다.'와 같이, 맥락과 정보를 충분히 제공하도록 수정) ]  특히  관형격 조사인 '~의'를 필요 이상으로 사용한다면, 의미를 담고 있는 문장 성분을 생략하기 쉬우므로 유의해야 합니다.  [사본의 문구는 작업의 상황을 → 사본에 기재된 문구는 작업이 진행되는 상황을]\n\n2. (이 2번 조항은 헤더와 목록에는 강제로 적용되는 사항이 아닙니다.) 명사구나 부사구, 연결어미로 문장을 끝내지 말고, 서술어와 종결어미를 사용하여 완성된 형태의 문장으로 끝을 맺어야 합니다.\n\n\n## 구 단위\n\n1. 필수적인 경우가 아니라면 조사와 어미를 생략하지 말아야 합니다. 또한 부사, 보조사와 선어말어미, 보조 용언을 적극적으로 활용하면, 의미가 명확한 한국어 문장을 완성할 수 있습니다. [이 결정은 이후 중요 정책이 갈리는 자리. 컨텍스트 압축 전 신중 반영한다. → 이 결정은 이후 중요한 정책에 지속적으로 영향을 주기 때문에, 컨텍스트가 압축되기 전에 신중히 반영합니다. → 지금 답변해주신 결정 사항은 이후 중요한 정책에도 지속적으로 영향을 미치기 때문에, 컨텍스트가 압축되기 전에 미리 신중하게 반영해 놓겠습니다.]\n\n2. 구체적인 의미를 담고 있는 한자어와 자연스러운 통사 구조를 결합하면, 풍부하고 명확한 의미를 전달할 수 있습니다. 따라서 맥락에 적합한 한자어를 적극적으로 활용하고, 그 한자어에 조사와 어미를 붙여서 어휘 사이의 관계를 확실하게 나타내야 합니다. [<쓴 비용을 구하는 토큰 카운트 함수에 문제가 생기면 (상황에 적합한 어휘가 사용되지 않아 의미가 불충분함) /지출 비용 추론 용도의 토큰 카운트 함수의 오류 상황에서 (조사와 어미가 없어 가독성이 낮고 의미 관계가 불분명함)>  → 지출한 비용을 추론하는 토큰 카운트 함수에 오류가 발생하면 (이 지침의 목표 예시)]\n\n3. 일반적인 어휘를 사용해야 하는 자리에 비유적 어휘를 사용하면 가독성이 낮고, 의미가 변질되기 쉽습니다. 따라서 꼭 필요한 경우가 아니라면 비유적 어휘로 일반적인 명사나 동사를 대체하지 않습니다. 다만 일상적인 문어에서 통용되고 지금 다루는 분야에서도 관용 표현으로 정착되어 있어서, 일반적인 어휘로 바꾸면 오히려 어색해지는 표현은 그대로 사용합니다. [<분석의 흐름 → 분석의 방향성>, <코드로 박는 자리 → 코드에 명시하는 상황 (혹은 코드에 명시하는 작업)>, <요청을 받습니다 -> 요청을 확인했습니다 (혹은 요청대로 수행하겠습니다)>]\n\n4. 엠대시(—)는 앞뒤 문장의 관계를 지나치게 함축하기 때문에 자제하고, 문맥에 따라 콜론이나 접속사로 대체합니다.\n\n\n## 추가 사항\n\n- 서브에이전트를 호출할 때, 한국어로 프롬프트를 작성했다면 실제로 서브에이전트 호출 도구를 사용하기 전에 이 본문의 지침들이 준수되어 있는지 점검합니다. 서브에이전트가 산출한 결과를 사용자에게 전달할 때에도 본문의 지침들이 그대로 적용됩니다.\n\n- 한국어로 출력되는 모든 결과물에도 이 지침들을 적용합니다.\n\n- 한국어 사전에 있는 어휘이며 뜻이 명확하더라도, 사용 빈도가 낮아서 통용되지 않는 어휘를 사용하면 소통의 효율성이 오히려 낮아지니 자제합니다. 대신 의미가 명확하며 실제로 통용되는 어휘를 우선적으로 선택합니다.\n\n- 구체적인 지침이 따로 존재하는 산출물 유형에는 이 지침을 적용하지 않습니다. 적용 여부가 애매하다면 사용자에게 확인합니다.\n\n- 답변을 사용자에게 출력하기 직전에, 위의 지침들에 어긋난 부분을 반드시 점검하고 수정한 후에 출력합니다."

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
  "tldr": ["3~6개. 각 한 문장."],
  "sections": [
    {
      "heading_ko": "꼭지 제목(한글)",
      "heading_en": "원문 소제목. 없으면 빈 문자열",
      "skip": null,
      "summary": "이 꼭지가 무슨 이야기인지 2~4문장. 왼쪽 번역본을 읽기 전에 방향을 잡아 주는 글이다.",
      "insight": "위 목적에 쓸 수 있는 것이 보일 때만 2~4문장. 없으면 null.",
      "author": [
        { "claim": "필자가 한 주장 한 줄", "evidence": "그 주장을 뒷받침하려고 필자가 든 근거. 없으면 '근거를 대지 않았다'라고 적는다." }
      ],
      "experts": [
        { "who": "이름", "role": "어디 소속의 누구인지 한 줄", "claim": "그 사람이 한 주장", "evidence": "그 사람이 든 근거. 없으면 '근거를 대지 않았다'." }
      ],
      "cases": [
        { "name": "회사·기관·제도 이름", "what": "무엇을 했는지 1~2문장",
          "scale": "금액·건수·비율 같은 규모. 원문에 없으면 빈 문자열",
          "note": "이 사례에서 눈여겨볼 대목. 없으면 빈 문자열" }
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

**summary** — 왼쪽 번역본을 읽기 전에 방향을 잡아 주는 글이다. 2~4문장. 사건을 되풀이하지 말고 무슨 이야기인지 알려 준다.

**insight** — 위 '이 노트를 읽는 사람이 하려는 일'을 기준으로 판단한다.
  앱에서 시험해 볼 수 있는 것이 실제로 보일 때만 적는다. 그럴 때도 "무엇을 해 볼 수 있는지"를 구체적으로 적는다.
  보이지 않으면 **null 로 둔다.** 억지로 만들지 않는다. 인사이트가 없는 꼭지가 대부분이다.

**author** — 필자(뉴스레터를 쓰는 사람)가 자기 의견으로 내놓은 주장만 담는다.
  사실 전달은 여기에 넣지 않는다. 근거가 없으면 없다고 적는다. 주장이 없으면 빈 배열로 둔다.

**experts** — 필자가 아닌 사람이 한 말이다. 인터뷰이, 임원, 연구자, 정부 인사, 인용된 글의 저자가 여기에 들어간다.
  role 에는 그 사람이 어느 편에 선 사람인지 적는다. 예를 들어 "성과 기반 진료로 사업하는 회사의 공동창업자"처럼
  이해관계가 드러나게 적는다. 그래야 주장을 어느 정도로 받아들일지 판단할 수 있다.
  없으면 빈 배열로 둔다.

**cases** — 실제로 벌어진 일이다. 투자 유치, 인수합병, 제품 출시, 소송, 제도 시행, 실적 발표가 여기 들어간다.
  회사가 무엇을 파는 곳인지 what 안에서 한 줄로 밝힌다. 없으면 빈 배열로 둔다.

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

const files = [{"index": "01", "date": "2026-01-04", "type": "reads", "subject": "Weekly Health Tech Reads 1/4/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/01_2026-01-04_Weekly-Health-Tech-Reads-1-4-26.md", "hasRaw": true}, {"index": "05", "date": "2026-01-15", "type": "policy", "subject": "Weekly Health Policy Briefing 01/15/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/05_2026-01-15_Weekly-Health-Policy-Briefing-01-15-26.md", "hasRaw": false}, {"index": "29", "date": "2026-04-07", "type": "interview", "subject": "Chris Klomp joins HTN to discuss the 2027 MA Final Notice", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/29_2026-04-07_Chris-Klomp-joins-HTN-to-discuss-the-2027-MA-Final-Notice.md", "hasRaw": false}]
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
