export const meta = {
  name: 'htn-issue-notes',
  description: 'Health Tech Nerds 뉴스레터 55회차를 한국어 학습 노트 JSON으로 변환하고 원문 대조 검수',
  phases: [
    { title: 'Notes', detail: '회차당 1에이전트 — 원문 전량 읽고 풀 커버리지 한글 노트 작성' },
    { title: 'Audit', detail: '원문 대조 — 누락 꼭지·사실 오류·설명 없는 약어 보수' },
  ],
}

const STYLE = "## 한국어 문장 지침 (사용자 전역 출력 지침, 전문)\n아래는 이 사용자가 모든 한국어 산출물에 요구하는 문장 지침이다. 요약하지 말고 전문을 그대로 적용한다. 노트의 모든 한국어 문장에 적용된다.\n다만 이 노트는 설명문이므로 종결 어미는 '~다' 체로 통일한다. '~다' 체 역시 종결 어미이므로 아래 지침의 2번 조항에 어긋나지 않는다.\n\n당신은 한국어를 활용해야 하는 상황에 있다면 본 문서에 제시된 지침들을 준수해야 합니다. 그럼으로써 의사소통의 효율성을 높일 수 있습니다. 이 지침들은, 의미가 명확하며 비교적 가독성이 높고 안정적인 구조를 지닌 한국어 문장을 출력하는 방법을 자세히 설명합니다. 인용, 코드, 코드 주석에는 이 지침들을 적용하지 않습니다.\n\n\n## 상황과 목표\n\n- LLM은 한국어를 구사할 때 몇 가지 특징을 보이는데, 일부 특징은 결과물의 완성도를 낮추거나, 사용자가 소통에 더 많은 노력을 들이게 만듭니다. 이 문서에 작성된 사항들을 준수하면 이런 현상을 개선할 수 있습니다.\n\n- 이 문서에서 제시하는 지침들을 요약하는 것은 일반적으로 권장되지 않습니다. 그렇게 한다면 조항마다 첨부된 예시를 확인할 수 없으므로 조항의 문구가 구체적으로 어떤 동작을 의도했는지 파악하기 어렵습니다. 또한 요약에 포함된 몇 가지 지침을 제외한 나머지 지침들은 잘 준수되지 않는 방향으로 서술 압력이 작동하게 될 수도 있습니다. 그리고 목적과 의도를 생략하고 제한 사항만 요약한다면 목적에 부합하지 않게 기계적으로 지침을 준수했는지 확인하게 될 수도 있습니다.\n\n\n## 동작 범위\n\n1. 본문의 지침들은 한국어를 활용하는 상황에서 그 한국어를 명확하게 출력하라는 지시입니다. 외국어 문장이나 어휘를 출력해야 하는 상황에서, 그것을 한국어로 번역하거나 대체하라는 지시가 아닙니다.\n\n2. 변수명과 주석, 커밋 메시지, 로그 문자열처럼 코드에 속하는 텍스트는 프로젝트의 기존 관례를 준수해야 합니다. 이러한 텍스트는 지침을 적용하면 안 되기 때문에 이 조항에서 한 번 더 강조하고 있습니다.\n\n3. 고유 명사와 기술 용어 등은, 통상적인 용례로 정착된 번역어 혹은 음차가 있다면 우선적으로 사용하고, 그렇지 않다면 원어를 유지함으로써, 한국어 사용자가 이해하기 편하고 의미를 잘 이해할 수 있도록 합니다.\n\n4. 사용자가 어떤 어조나 어휘를 사용하든지, 사용자 메시지의 어조를 모방하지 않고, 본문에서 제시하는 지침들을 일관되게 유지합니다.\n\n\n## 문장 단위\n\n1. 읽는 이가 문장의 의미를 충분히 이해할 수 있어야 하므로, 의미가 있는 문장 성분을 생략하지 않습니다. [그러면 경고가 붙습니다.→ ('그러면 이미 작업중인 파일에도 경고 표지가 추가됩니다.'와 같이, 맥락과 정보를 충분히 제공하도록 수정) ]  특히  관형격 조사인 '~의'를 필요 이상으로 사용한다면, 의미를 담고 있는 문장 성분을 생략하기 쉬우므로 유의해야 합니다.  [사본의 문구는 작업의 상황을 → 사본에 기재된 문구는 작업이 진행되는 상황을]\n\n2. (이 2번 조항은 헤더와 목록에는 강제로 적용되는 사항이 아닙니다.) 명사구나 부사구, 연결어미로 문장을 끝내지 말고, 서술어와 종결어미를 사용하여 완성된 형태의 문장으로 끝을 맺어야 합니다.\n\n\n## 구 단위\n\n1. 필수적인 경우가 아니라면 조사와 어미를 생략하지 말아야 합니다. 또한 부사, 보조사와 선어말어미, 보조 용언을 적극적으로 활용하면, 의미가 명확한 한국어 문장을 완성할 수 있습니다. [이 결정은 이후 중요 정책이 갈리는 자리. 컨텍스트 압축 전 신중 반영한다. → 이 결정은 이후 중요한 정책에 지속적으로 영향을 주기 때문에, 컨텍스트가 압축되기 전에 신중히 반영합니다. → 지금 답변해주신 결정 사항은 이후 중요한 정책에도 지속적으로 영향을 미치기 때문에, 컨텍스트가 압축되기 전에 미리 신중하게 반영해 놓겠습니다.]\n\n2. 구체적인 의미를 담고 있는 한자어와 자연스러운 통사 구조를 결합하면, 풍부하고 명확한 의미를 전달할 수 있습니다. 따라서 맥락에 적합한 한자어를 적극적으로 활용하고, 그 한자어에 조사와 어미를 붙여서 어휘 사이의 관계를 확실하게 나타내야 합니다. [<쓴 비용을 구하는 토큰 카운트 함수에 문제가 생기면 (상황에 적합한 어휘가 사용되지 않아 의미가 불충분함) /지출 비용 추론 용도의 토큰 카운트 함수의 오류 상황에서 (조사와 어미가 없어 가독성이 낮고 의미 관계가 불분명함)>  → 지출한 비용을 추론하는 토큰 카운트 함수에 오류가 발생하면 (이 지침의 목표 예시)]\n\n3. 일반적인 어휘를 사용해야 하는 자리에 비유적 어휘를 사용하면 가독성이 낮고, 의미가 변질되기 쉽습니다. 따라서 꼭 필요한 경우가 아니라면 비유적 어휘로 일반적인 명사나 동사를 대체하지 않습니다. 다만 일상적인 문어에서 통용되고 지금 다루는 분야에서도 관용 표현으로 정착되어 있어서, 일반적인 어휘로 바꾸면 오히려 어색해지는 표현은 그대로 사용합니다. [<분석의 흐름 → 분석의 방향성>, <코드로 박는 자리 → 코드에 명시하는 상황 (혹은 코드에 명시하는 작업)>, <요청을 받습니다 -> 요청을 확인했습니다 (혹은 요청대로 수행하겠습니다)>]\n\n4. 엠대시(—)는 앞뒤 문장의 관계를 지나치게 함축하기 때문에 자제하고, 문맥에 따라 콜론이나 접속사로 대체합니다.\n\n\n## 추가 사항\n\n- 서브에이전트를 호출할 때, 한국어로 프롬프트를 작성했다면 실제로 서브에이전트 호출 도구를 사용하기 전에 이 본문의 지침들이 준수되어 있는지 점검합니다. 서브에이전트가 산출한 결과를 사용자에게 전달할 때에도 본문의 지침들이 그대로 적용됩니다.\n\n- 한국어로 출력되는 모든 결과물에도 이 지침들을 적용합니다.\n\n- 한국어 사전에 있는 어휘이며 뜻이 명확하더라도, 사용 빈도가 낮아서 통용되지 않는 어휘를 사용하면 소통의 효율성이 오히려 낮아지니 자제합니다. 대신 의미가 명확하며 실제로 통용되는 어휘를 우선적으로 선택합니다.\n\n- 구체적인 지침이 따로 존재하는 산출물 유형에는 이 지침을 적용하지 않습니다. 적용 여부가 애매하다면 사용자에게 확인합니다.\n\n- 답변을 사용자에게 출력하기 직전에, 위의 지침들에 어긋난 부분을 반드시 점검하고 수정한 후에 출력합니다."


const OUT = '/Users/gravitylabs/dev/healthtechnerds-notes/data/notes'

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

const READER = `## 독자 설정 (가장 중요)
읽는 사람은 한국인이고, 미국 헬스케어 산업을 전혀 모르고, 영어도 편하지 않다.
- 한국 의료(전국민 건강보험, 병원에 그냥 가면 됨)만 안다. 미국이 보험사·고용주·PBM·병원·중개업체가 얽힌 구조라는 걸 모른다.
- 영어 약어(MA, PBM, ACA, FFS, RCM, HCC, PMPM, TiC, LTSS...)를 하나도 모른다.
- 그래서 "MA plans are contracting" 을 "MA 플랜이 축소되고 있다" 로 옮기면 못 읽는다.
  "메디케어 어드밴티지(65세 이상 대상 민간 보험 상품) 회사들이 적자를 못 버티고 가입 지역·혜택을 줄이고 있다" 처럼 풀어야 한다.
- 이 노트의 목적은 "뉴스를 아는 것"이 아니라 "미국 헬스케어가 어떻게 돌아가는 판인지 구조를 익히는 것"이다.`

const RULES = `## 반드시 지킬 것
- 원문을 처음부터 끝까지 전부 읽는다. 파일이 길면 나눠서 끝까지 읽는다. 앞부분만 보고 쓰지 않는다.
- 뉴스레터의 모든 꼭지를 빠짐없이 담는다. 짧은 꼭지, 링크 나열 꼭지도 최소 한 줄로 남긴다.
- 광고/스폰서 블록, 채용공고, 구독·수신거부 안내, 이벤트 등록 배너는 제외한다.
  다만 스폰서 콘텐츠라도 산업 이해에 도움되면 heading_ko 뒤에 "(스폰서)"를 붙여 남긴다.
- 트래킹 URL(elinkfef.healthtechnerds.com 등)은 결과에 절대 넣지 않는다. 링크 자체를 넣지 않는다.
  (수신자 식별 토큰이 박혀 있어 공개 웹에 올리면 안 된다.)
- 영어 문장을 그대로 옮기지 않는다. 전부 한국어로 풀어 쓴다. 고유명사·약어만 괄호로 영어 병기.
- 원문에 없는 수치·주장·해석을 지어내지 않는다. 원문이 애매하면 애매하다고 쓴다.
- 이모지를 쓰지 않는다. 모든 JSON 키는 스키마 그대로.
- 문체: 담백한 설명체. "~합니다" 아니고 "~다" 체. 과장·감탄 금지.

${STYLE}`

const SCHEMA_DOC = `## 저장할 JSON 스키마
{
  "index": "05",                  // 두 자리 문자열
  "date": "2026-01-15",
  "type": "policy",               // 아래에서 지정해 준 값 그대로
  "title_en": "원문 제목 그대로",
  "title_ko": "한글 제목 — 이 회차가 무슨 이야기였는지 알 수 있게 20자 안팎으로 새로 짓는다. '주간 정책 브리핑 1/15' 같은 무의미한 제목 금지.",
  "hook": "이 회차를 한 문장으로. 60자 안팎.",
  "tldr": ["3~6개. 각 한 문장. 이 회차에서 딱 이것만 기억하면 되는 것."],
  "sections": [
    {
      "heading_ko": "꼭지 제목(한글, 내용이 보이게)",
      "heading_en": "원문 소제목이 있으면 그대로, 없으면 빈 문자열",
      "what": "무슨 일이 있었나. 사실만. 숫자·회사·날짜 보존. 2~5문장.",
      "why": "왜 중요한가. 업계가 이걸 왜 주목하나. 1~4문장.",
      "structure": "미국 헬스케어 구조에서 어디 이야기인가. 돈이 누구에게서 누구에게 흐르는지, 누가 누구에게 무엇을 파는지, 왜 그런 구조가 생겼는지. 이 항목이 노트의 핵심이다. what 을 반복하지 말고 배경 구조를 가르쳐라. 2~5문장.",
      "consumer": "일반 소비자·환자 입장에서 이게 무슨 뜻인지. 해당 없으면 null.",
      "numbers": [{"value": "31%", "meaning": "무엇이 얼마나 되는 수치인지"}],
      "players": [{"name": "Alignment Health", "what": "메디케어 어드밴티지 보험을 파는 회사"}],
      "terms": [{"en": "PACE", "ko": "노인 전담 통합돌봄 프로그램", "plain": "요양원 갈 정도로 아픈 노인을 집에 두고 돌보는 대신, 정부가 1인당 정액을 주고 그 안에서 다 책임지게 하는 제도."}]
    }
  ],
  "glossary": [],                 // 비워둔다. terms 는 각 section 안에만 넣는다.
  "themes": ["최대 6개, 아래 목록 키만"],
  "for_later": ["미국 헬스케어 소비자 시장에서 '문제 또는 기회'로 보이는 대목. 원문 근거가 있을 때만. 최대 3개. 없으면 빈 배열."]
}`

const NOTE_SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    title_ko: { type: 'string' },
    section_count: { type: 'integer' },
    term_count: { type: 'integer' },
    saved: { type: 'boolean' },
    note: { type: 'string', description: '특이사항 한 줄. 없으면 빈 문자열' },
  },
  required: ['index', 'title_ko', 'section_count', 'saved'],
}

const AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    added_sections: { type: 'integer' },
    fact_fixes: { type: 'integer' },
    term_additions: { type: 'integer' },
    structure_rewrites: { type: 'integer' },
    verdict: { type: 'string', enum: ['clean', 'patched', 'rebuilt'] },
    summary: { type: 'string' },
  },
  required: ['index', 'added_sections', 'fact_fixes', 'verdict', 'summary'],
}

const files = [{"index": "01", "date": "2026-01-04", "type": "reads", "subject": "Weekly Health Tech Reads 1/4/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/01_2026-01-04_Weekly-Health-Tech-Reads-1-4-26.md", "hasNote": false}, {"index": "02", "date": "2026-01-06", "type": "event", "subject": "HTN's Pop-Up Coverage of JPM 2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/02_2026-01-06_HTN-s-Pop-Up-Coverage-of-JPM-2026.md", "hasNote": false}, {"index": "03", "date": "2026-01-08", "type": "policy", "subject": "Weekly Health Policy Briefing 01/08/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/03_2026-01-08_Weekly-Health-Policy-Briefing-01-08-26.md", "hasNote": false}, {"index": "04", "date": "2026-01-11", "type": "reads", "subject": "Weekly Health Tech Reads 1/11/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/04_2026-01-11_Weekly-Health-Tech-Reads-1-11-26.md", "hasNote": false}, {"index": "05", "date": "2026-01-15", "type": "policy", "subject": "Weekly Health Policy Briefing 01/15/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/05_2026-01-15_Weekly-Health-Policy-Briefing-01-15-26.md", "hasNote": false}, {"index": "06", "date": "2026-01-18", "type": "reads", "subject": "Weekly Health Tech Reads 1/18/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/06_2026-01-18_Weekly-Health-Tech-Reads-1-18-26.md", "hasNote": false}, {"index": "07", "date": "2026-01-22", "type": "policy", "subject": "Weekly Health Policy Briefing 01/22/25", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/07_2026-01-22_Weekly-Health-Policy-Briefing-01-22-25.md", "hasNote": false}, {"index": "09", "date": "2026-01-29", "type": "policy", "subject": "Weekly Health Policy Briefing 01/29/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/09_2026-01-29_Weekly-Health-Policy-Briefing-01-29-26.md", "hasNote": false}, {"index": "10", "date": "2026-02-01", "type": "reads", "subject": "Weekly Health Tech Reads 2/1/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/10_2026-02-01_Weekly-Health-Tech-Reads-2-1-26.md", "hasNote": false}, {"index": "11", "date": "2026-02-05", "type": "policy", "subject": "Weekly Health Policy Briefing 02/05/25", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/11_2026-02-05_Weekly-Health-Policy-Briefing-02-05-25.md", "hasNote": false}, {"index": "12", "date": "2026-02-08", "type": "reads", "subject": "Weekly Health Tech Reads 2/8/25", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/12_2026-02-08_Weekly-Health-Tech-Reads-2-8-25.md", "hasNote": false}, {"index": "13", "date": "2026-02-12", "type": "policy", "subject": "Weekly Health Policy Briefing 02/12/2025", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/13_2026-02-12_Weekly-Health-Policy-Briefing-02-12-2025.md", "hasNote": false}, {"index": "14", "date": "2026-02-15", "type": "reads", "subject": "Weekly Health Tech Reads 2/15/25", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/14_2026-02-15_Weekly-Health-Tech-Reads-2-15-25.md", "hasNote": false}, {"index": "15", "date": "2026-02-19", "type": "policy", "subject": "Weekly Health Policy Briefing 02/19/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/15_2026-02-19_Weekly-Health-Policy-Briefing-02-19-2026.md", "hasNote": false}, {"index": "16", "date": "2026-02-22", "type": "reads", "subject": "Weekly Health Tech Reads 2/22/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/16_2026-02-22_Weekly-Health-Tech-Reads-2-22-26.md", "hasNote": false}, {"index": "17", "date": "2026-02-26", "type": "policy", "subject": "Weekly Health Policy Briefing 02/26/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/17_2026-02-26_Weekly-Health-Policy-Briefing-02-26-2026.md", "hasNote": false}, {"index": "18", "date": "2026-03-01", "type": "reads", "subject": "Weekly Health Tech Reads 3/1/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/18_2026-03-01_Weekly-Health-Tech-Reads-3-1-26.md", "hasNote": false}, {"index": "19", "date": "2026-03-05", "type": "policy", "subject": "Weekly Health Policy Briefing 03/05/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/19_2026-03-05_Weekly-Health-Policy-Briefing-03-05-2026.md", "hasNote": false}, {"index": "20", "date": "2026-03-08", "type": "reads", "subject": "Weekly Health Tech Reads 3/8/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/20_2026-03-08_Weekly-Health-Tech-Reads-3-8-26.md", "hasNote": false}, {"index": "21", "date": "2026-03-12", "type": "policy", "subject": "Weekly Health Policy Briefing 03/12/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/21_2026-03-12_Weekly-Health-Policy-Briefing-03-12-2026.md", "hasNote": false}, {"index": "22", "date": "2026-03-15", "type": "reads", "subject": "Weekly Health Tech Reads 3/15/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/22_2026-03-15_Weekly-Health-Tech-Reads-3-15-26.md", "hasNote": false}, {"index": "23", "date": "2026-03-19", "type": "policy", "subject": "Weekly Health Policy Briefing 03/19/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/23_2026-03-19_Weekly-Health-Policy-Briefing-03-19-2026.md", "hasNote": false}, {"index": "24", "date": "2026-03-22", "type": "reads", "subject": "Weekly Health Tech Reads 3/22/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/24_2026-03-22_Weekly-Health-Tech-Reads-3-22-26.md", "hasNote": false}, {"index": "25", "date": "2026-03-26", "type": "policy", "subject": "Weekly Health Policy Briefing 03/26/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/25_2026-03-26_Weekly-Health-Policy-Briefing-03-26-2026.md", "hasNote": false}, {"index": "26", "date": "2026-03-29", "type": "reads", "subject": "Weekly Health Tech Reads 3/29/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/26_2026-03-29_Weekly-Health-Tech-Reads-3-29-26.md", "hasNote": false}, {"index": "27", "date": "2026-04-02", "type": "policy", "subject": "Weekly Health Policy Briefing 04/02/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/27_2026-04-02_Weekly-Health-Policy-Briefing-04-02-2026.md", "hasNote": false}, {"index": "28", "date": "2026-04-06", "type": "event", "subject": "Join HTN live in 30 min, 12p EST / 9a PST", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/28_2026-04-06_Join-HTN-live-in-30-min,-12p-EST-9a-PST.md", "hasNote": false}, {"index": "29", "date": "2026-04-07", "type": "interview", "subject": "Chris Klomp joins HTN to discuss the 2027 MA Final Notice", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/29_2026-04-07_Chris-Klomp-joins-HTN-to-discuss-the-2027-MA-Final-Notice.md", "hasNote": false}, {"index": "30", "date": "2026-04-12", "type": "reads", "subject": "Weekly Health Tech Reads 4/12/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/30_2026-04-12_Weekly-Health-Tech-Reads-4-12-26.md", "hasNote": false}, {"index": "31", "date": "2026-04-13", "type": "roundup", "subject": "Join HTN live on The Grand Roundup today, 1p ET / 10a PT", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/31_2026-04-13_Join-HTN-live-on-The-Grand-Roundup-today,-1p-ET-10a-PT.md", "hasNote": false}, {"index": "32", "date": "2026-04-16", "type": "policy", "subject": "Weekly Health Policy Briefing 04/14/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/32_2026-04-16_Weekly-Health-Policy-Briefing-04-14-2026.md", "hasNote": false}, {"index": "33", "date": "2026-04-19", "type": "reads", "subject": "Weekly Health Tech Reads 4/19/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/33_2026-04-19_Weekly-Health-Tech-Reads-4-19-26.md", "hasNote": false}, {"index": "34", "date": "2026-04-20", "type": "roundup", "subject": "The Grand Roundup will be live today at 12p ET / 9a PT!", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/34_2026-04-20_The-Grand-Roundup-will-be-live-today-at-12p-ET-9a-PT!.md", "hasNote": false}, {"index": "35", "date": "2026-04-23", "type": "policy", "subject": "Weekly Health Policy Briefing 04/23/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/35_2026-04-23_Weekly-Health-Policy-Briefing-04-23-2026.md", "hasNote": false}, {"index": "36", "date": "2026-04-26", "type": "reads", "subject": "Weekly Health Tech Reads 4/26/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/36_2026-04-26_Weekly-Health-Tech-Reads-4-26-26.md", "hasNote": false}, {"index": "37", "date": "2026-04-27", "type": "roundup", "subject": "The Grand Roundup: 4/27/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/37_2026-04-27_The-Grand-Roundup-4-27-26.md", "hasNote": false}, {"index": "38", "date": "2026-04-30", "type": "policy", "subject": "Weekly Health Policy Briefing: 4/29/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/38_2026-04-30_Weekly-Health-Policy-Briefing-4-29-2026.md", "hasNote": false}, {"index": "39", "date": "2026-05-03", "type": "reads", "subject": "Weekly Health Tech Reads 5/3/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/39_2026-05-03_Weekly-Health-Tech-Reads-5-3-26.md", "hasNote": false}, {"index": "40", "date": "2026-05-04", "type": "roundup", "subject": "The Grand Roundup: 05/04/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/40_2026-05-04_The-Grand-Roundup-05-04-2026.md", "hasNote": false}, {"index": "41", "date": "2026-05-10", "type": "reads", "subject": "Weekly Health Tech Reads 5/10/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/41_2026-05-10_Weekly-Health-Tech-Reads-5-10-26.md", "hasNote": false}, {"index": "42", "date": "2026-05-17", "type": "reads", "subject": "Weekly Health Tech Reads: 5/17/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/42_2026-05-17_Weekly-Health-Tech-Reads-5-17-26.md", "hasNote": false}, {"index": "45", "date": "2026-06-14", "type": "reads", "subject": "Weekly Health Tech Reads 6/14/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/45_2026-06-14_Weekly-Health-Tech-Reads-6-14-26.md", "hasNote": false}, {"index": "46", "date": "2026-06-21", "type": "reads", "subject": "Weekly Health Tech Reads 6/21/2026", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/46_2026-06-21_Weekly-Health-Tech-Reads-6-21-2026.md", "hasNote": false}, {"index": "49", "date": "2026-07-19", "type": "reads", "subject": "Weekly Health Tech Reads 7/19/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/49_2026-07-19_Weekly-Health-Tech-Reads-7-19-26.md", "hasNote": false}, {"index": "53", "date": "2026-08-16", "type": "reads", "subject": "Weekly Health Tech Reads 8/16/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/53_2026-08-16_Weekly-Health-Tech-Reads-8-16-26.md", "hasNote": false}, {"index": "54", "date": "2026-08-23", "type": "reads", "subject": "Weekly Health Tech Reads 8/23/26", "path": "/Users/gravitylabs/Downloads/HealthTechNerds_뉴스레터_20260910/54_2026-08-23_Weekly-Health-Tech-Reads-8-23-26.md", "hasNote": false}]
log(`회차 ${files.length}건 처리 시작`)

const results = await pipeline(
  files,
  (f) => f.hasNote
    ? { index: f.index, title_ko: '(기존 노트 재사용)', section_count: -1, saved: true, note: '이전 실행에서 생성됨' }
    : agent(
    `${READER}

## 할 일
아래 파일 한 개를 읽고, 한국어 학습 노트 JSON을 만들어 저장한다.

- 원문 파일: ${f.path}
- 이 회차 index: "${f.index}"  / date: "${f.date}" / type: "${f.type}"
- 원문 제목: ${f.subject}

${RULES}

${SCHEMA_DOC}

## 고를 수 있는 themes 키 (키만 쓴다, 한글 라벨은 참고용)
${THEMES}

## 저장
Write 도구로 아래 경로에 UTF-8 JSON 한 개를 저장한다. 다른 파일은 만들지 않는다.
${OUT}/${f.index}.json

저장이 끝나면 StructuredOutput 으로 요약을 반환한다.`,
    { label: `note:${f.index}`, phase: 'Notes', schema: NOTE_SCHEMA }
  ),
  (prev, f) => {
    if (!prev || !prev.saved) return { index: f.index, verdict: 'rebuilt', added_sections: 0, fact_fixes: 0, summary: '1차 생성 실패' }
    return agent(
      `${READER}

## 할 일
이미 만들어진 정리 노트를 원문과 대조해 고친다. 너는 감사자다. 좋게 봐주지 말 것.

- 원문 파일: ${f.path}
- 노트 파일: ${OUT}/${f.index}.json

둘 다 처음부터 끝까지 읽고 아래를 점검한다.

1. **누락**: 원문에 있는데 노트 sections 에 없는 꼭지가 있는가. 있으면 같은 형식으로 추가한다.
   (광고·채용·구독 안내는 빼는 게 맞다. 그 외에는 짧아도 남긴다.)
2. **사실**: 노트의 숫자·회사명·주체·인과가 원문과 다른가. 다르면 원문에 맞게 고친다.
   원문에 없는 내용을 노트가 지어냈으면 삭제한다.
3. **읽힘**: 헬스케어를 모르는 한국인이 읽을 때, 설명 없이 튀어나오는 영어 약어·업계 용어가 있는가.
   있으면 해당 section 의 terms 에 추가하거나 문장을 풀어 쓴다.
4. **structure 항목**: 이게 진짜 "미국 헬스케어 구조 설명"인가, 아니면 what 을 말만 바꿔 반복한 것인가.
   반복이면 구조 설명(돈의 흐름·이해관계자·왜 그런 제도가 생겼는지)으로 다시 쓴다.
5. **title_ko / hook**: 내용이 안 보이는 맹탕이면 다시 짓는다.
6. **트래킹 URL**이 섞여 들어갔으면 전부 지운다.
7. **한국어 문장 지침 준수 여부**: 아래 지침에 어긋나는 문장을 전부 고쳐 쓴다. 특히 다음을 집중적으로 본다.
   - 명사구나 연결어미로 끝나서 완결되지 않은 문장 (헤딩과 목록 항목은 예외다)
   - 조사와 어미를 생략해 의미 관계가 흐려진 대목
   - 관형격 조사 '~의'를 겹쳐 써서 문장 성분이 빠진 대목
   - 일반적인 어휘 자리에 들어간 비유적 표현
   - 엠대시(—)로 두 문장의 관계를 뭉갠 대목. 콜론이나 접속사로 바꾼다.
   이 항목의 수정은 문장 형태만 바꾸는 작업이며, 사실과 의미는 한 글자도 바꾸지 않는다.

${RULES}

## 저장
고친 내용을 같은 경로(${OUT}/${f.index}.json)에 전체 JSON 으로 덮어쓴다.
스키마와 키는 그대로 유지한다. 고칠 게 없으면 파일을 건드리지 않는다.
그다음 StructuredOutput 으로 무엇을 고쳤는지 반환한다.`,
      { label: `audit:${f.index}`, phase: 'Audit', schema: AUDIT_SCHEMA }
    )
  }
)

const ok = results.filter(Boolean)
const dirty = ok.filter((r) => r.verdict !== 'clean')
log(`완료 ${ok.length}/${files.length} · 보수됨 ${dirty.length}건`)

return {
  processed: ok.length,
  total: files.length,
  patched: dirty.length,
  failures: results.map((r, i) => (r ? null : files[i].index)).filter(Boolean),
  audits: ok.map((r) => ({ i: r.index, v: r.verdict, add: r.added_sections, fix: r.fact_fixes, s: r.summary })),
}
