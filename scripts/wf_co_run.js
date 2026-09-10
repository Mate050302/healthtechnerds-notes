export const meta = {
  name: 'htn-company-profiles',
  description: '뉴스레터에 한 줄로 나온 소비자 대상 회사를 조사해 프로필로 정리',
  phases: [{ title: 'Research', detail: '회사마다 검색·사이트·앱스토어·기사를 훑고 화면을 갈무리해 정리' }],
}

const ROOT = '/Users/gravitylabs/dev/healthtechnerds-notes'

const SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    name: { type: 'string' },
    saved: { type: 'boolean' },
    sells_to: { type: 'string' },
    shots: { type: 'integer', description: '갈무리한 화면 수' },
    sources: { type: 'integer', description: '확인한 자료 수' },
    missing: { type: 'string', description: '확인하지 못해 비워 둔 항목' },
    finding: { type: 'string', description: '뉴스레터 밖에서 새로 드러난 가장 중요한 것 한 줄' },
  },
  required: ['slug', 'name', 'saved'],
}

const items = [{"slug": "superpower", "name": "Superpower", "hint": "롱제비티 검사 구독을 소비자에게 직접 파는 회사다. 펩타이드 제품 출시를 예고했고 Function Health 와 소송 중이다.", "issue": "14", "section": 16, "seen": "14회차 16번 꼭지 (D2C 롱제비티 회사끼리의 소송)", "what": "기만적 광고를 주장하며 소송을 제기했다. 두 회사 모두 소비자에게 직접 파는 롱제비티 스타트업이다."}, {"slug": "function-health", "name": "Function Health", "hint": "혈액검사 100여 종을 연 구독으로 파는 회사다. Ezra 를 인수해 전신 MRI 까지 붙였다. 검사 결과를 소비자가 직접 받아 보는 구조가 핵심이다.", "issue": "14", "section": 16, "seen": "14회차 16번 꼭지 (D2C 롱제비티 회사끼리의 소송)", "what": "기만적 광고를 주장하며 소송을 제기했다. 두 회사 모두 소비자에게 직접 파는 롱제비티 스타트업이다."}, {"slug": "signos", "name": "Signos", "hint": "당뇨가 없는 사람에게 연속혈당측정기를 팔아 체중 관리에 쓰게 한다. Dexcom 이 투자했다. 값과 처방 필요 여부를 확인한다.", "issue": "43", "section": 22, "seen": "43회차 22번 꼭지 (D2C 연속혈당측정 브랜드 Signos가 2,000만 달러)", "what": "소비자가 직접 사서 쓰는 연속혈당측정 서비스를 판다."}, {"slug": "oura", "name": "Oura", "hint": "반지형 수면·활동 추적 기기를 판다. 상장 서류를 비공개로 제출했고 혈압 측정을 준비 중이다. 기기값과 구독료가 따로인 구조를 확인한다.", "issue": "43", "section": 7, "seen": "43회차 7번 꼭지 (Oura가 IPO 대열에 들어서며 헬스케어 야심을 내비쳤다)", "what": "반지형 수면·활동 추적 기기를 소비자에게 파는 회사이며, 상장 서류를 비공개로 제출하고 혈압 측정, 야간 호흡, GLP-1 추적 기능을 추가했다. Counsel Health와 제휴해 앱 안에서 AI"}, {"slug": "whoop", "name": "WHOOP", "hint": "구독료를 받는 손목 웨어러블 회사다. 자사 앱에서 화상 진료를 붙이려 한다는 대목이 특히 중요하다.", "issue": "04", "section": 6, "seen": "04회차 6번 꼭지 (FDA, 일부 AI·웰니스 제품 감독 완화)", "what": "손목에 차는 건강 추적 기기를 소비자에게 파는 회사이며, 이번 조치를 반겼다."}, {"slug": "zealthy", "name": "Zealthy", "hint": "GLP-1 을 온라인으로 처방하고 배송하던 회사다. 법무부 소송 뒤 파산에 가까워졌다. 무엇이 문제가 됐는지 확인한다.", "issue": "33", "section": 21, "seen": "33회차 21번 꼭지 (GLP-1 텔레헬스 Zealthy, 파산 문턱)", "what": "GLP-1을 온라인으로 처방·배송하는 텔레헬스 회사로, DOJ가 이번 주 소송에서 새 신청서를 제출한 뒤 파산에 가까워진 것으로 보인다. Cerebral의 공동창업자이자 CEO였던 Kyle Robe"}, {"slug": "ro", "name": "Ro", "hint": "온라인 진료와 약 배송을 잇는 소비자 서비스다. 먹는 Wegovy 유통 경로에 들어갔다.", "issue": "01", "section": 3, "seen": "01회차 3번 꼭지 (필자의 생각: 솜씨와 사업)", "what": "AI 증상 체커를 파는 회사로, 2025년에 성장했다."}, {"slug": "hims-hers", "name": "Hims & Hers", "hint": "앱과 웹에서 소비자가 직접 가입해 처방과 약을 받는다. 조제 GLP-1 광고 중단에 합의했고 Eucalyptus 를 인수했다. 구독 청구 방식으로 카드사 감시를 받은 일도 함께 본다.", "issue": "10", "section": 5, "seen": "10회차 5번 꼭지 (스타트업과 투자자에게 번지는 파장)", "what": "Ro와 마찬가지로 소비자가 직접 돈을 내는 온라인 건강 상품 회사이며, 슈퍼볼 광고 세부 내용을 공개했다."}, {"slug": "goodrx", "name": "GoodRx", "hint": "약국에서 현금으로 약을 살 때 쓰는 할인 쿠폰 서비스다. 어디서 수익이 나는지, 왜 성장이 꺾였는지 확인한다.", "issue": "18", "section": 11, "seen": "18회차 11번 꼭지 (GoodRx: 가이던스 하향)", "what": "소비자가 약국에서 현금으로 약을 살 때 쓰는 할인 쿠폰 서비스가 예상보다 낮은 2026년 매출 가이던스를 제시했고, 주가가 18% 떨어졌다."}, {"slug": "midi-health", "name": "Midi Health", "hint": "폐경기 여성을 상대하는 원격 진료 회사다. 보험을 받는지 자기 돈을 내는지 확인한다.", "issue": "12", "section": 19, "seen": "12회차 19번 꼭지 (펀딩: 폐경 케어 Midi, 1억 달러)", "what": "폐경기 케어로 가장 잘 알려진 여성 건강 회사로, Goodwater Capital이 주도한 라운드에서 자금을 조달했다."}, {"slug": "claimable", "name": "Claimable", "hint": "보험사가 거절한 진료비나 약값에 대해 환자를 대신해 이의 제기 서류를 만들어 준다. 미국에서만 성립하는 사업이라 구조를 특히 자세히 본다.", "issue": "36", "section": 27, "seen": "36회차 27번 꼭지 (읽은 글: 보험 거절에 이의를 제기해 주는 Claimabl)", "what": "보험사가 거절한 진료비나 약값에 대해 환자를 대신해 이의 제기 서류를 만들어 준다. Mark Cuban 등에게서 투자를 받았다."}, {"slug": "chapter-medicare", "name": "Chapter", "hint": "메디케어 플랜을 비교해 골라 주는 브로커리지다. 소비자는 공짜로 쓰고 보험사가 수수료를 내는 구조인지 확인한다.", "issue": "30", "section": 10, "seen": "30회차 10번 꼭지 (메디케어 플랜을 골라 주는 Chapter가 1억 달러를 모)", "what": "메디케어 플랜을 비교해 골라 주는 브로커리지 겸 내비게이션 플랫폼이다. Generation Investment Management가 이끄는 라운드에서 자금을 모았다."}, {"slug": "lillydirect", "name": "LillyDirect", "hint": "제약사 Eli Lilly 가 중간 유통을 거치지 않고 환자에게 직접 파는 통로다. 값이 얼마나 싸지는지, 무엇을 살 수 있는지 확인한다.", "issue": "33", "section": 5, "seen": "33회차 5번 꼭지 (이번 주의 차트: 제약사의 다음 판)", "what": "제약사 Eli Lilly가 중간 유통을 거치지 않고 환자에게 직접 닿는 통로로, 원문은 이를 생태계 전략의 사례로 든다."}, {"slug": "suppco", "name": "SuppCo", "hint": "개인 목적에 맞춰 보충제 조합을 짜 주는 서비스다. 보충제를 직접 파는지 추천만 하는지 확인한다.", "issue": "42", "section": 12, "seen": "42회차 12번 꼭지 (Function이 보충제 스타트업 SuppCo를 인수)", "what": "개인의 목적에 맞춰 보충제 조합을 짜 주는 스타트업이다."}, {"slug": "talkspace", "name": "Talkspace", "hint": "정신건강 원격 상담 회사다. 소비자 직접 판매에서 보험사·기업 상대로 방향을 틀고 있다는 점이 핵심이다.", "issue": "16", "section": 7, "seen": "16회차 7번 꼭지 (Talkspace, 소비자에서 기업·보험사로 방향을 틀다)", "what": "정신건강 원격 상담 기업으로, 소비자 중심 모델에서 보험사와 기업을 상대하는 모델로 전환하고 있다."}, {"slug": "betterhelp", "name": "BetterHelp", "hint": "Teladoc 산하 온라인 심리상담 서비스다. 소비자 직접 결제 사업이 줄고 있다는 대목을 확인한다.", "issue": "22", "section": 24, "seen": "22회차 24번 꼭지 (Teladoc: BetterHelp의 보험 전환)", "what": "원격진료 회사 Teladoc과 그 산하 온라인 상담 서비스 BetterHelp다. 소비자가 직접 결제하는 사업이 줄어드는 것을 보험이 적용되는 사업의 성장으로 상쇄할 것으로 본다."}, {"slug": "oscar-health", "name": "Oscar Health", "hint": "개인이 정부 장터에서 직접 가입하는 건강보험을 판다. 앱으로 가입과 관리를 한다는 점이 다른 보험사와 다르다.", "issue": "14", "section": 6, "seen": "14회차 6번 꼭지 (실적: Oscar)", "what": "2026년 ACA 회원이 크게 늘었다고 보고했다. 개인이 직접 사는 보험 상품을 파는 회사다."}, {"slug": "cost-plus-drugs", "name": "Mark Cuban Cost Plus Drugs", "hint": "보험을 거치지 않고 원가에 정해진 마진을 붙여 약을 파는 온라인 약국이다. 실제로 얼마나 싼지 확인한다.", "issue": "39", "section": 12, "seen": "39회차 12번 꼭지 (Mark Cuban의 모순된 한 주)", "what": "보험을 거치지 않고 원가에 정해진 마진을 붙여 약을 파는 온라인 약국이, 수직 통합 보험사 Humana의 약국 사업과 새 파트너십을 맺었다."}, {"slug": "oula", "name": "Oula", "hint": "산과 영역의 소비자 브랜드다. 병원 그룹과 함께 클리닉을 연다. 조산사와 의사를 함께 두는 모델을 확인한다.", "issue": "45", "section": 16, "seen": "45회차 16번 꼭지 (Oula와 Novant의 산과 파트너십)", "what": "산과 영역의 소비자 브랜드가 병원 그룹과 함께 샬럿에 클리닉을 열고 남동부 확장을 예고했다."}, {"slug": "carbon-health", "name": "Carbon Health", "hint": "어전트 케어와 1차 진료 클리닉을 직접 운영하다 파산을 신청했다. 무엇이 무너졌는지가 핵심이다.", "issue": "12", "section": 2, "seen": "12회차 2번 꼭지 (단상: AI로 주치의를 다시 발명한다는 이야기)", "what": "어전트 케어와 프라이머리 케어 클리닉을 직접 운영하며 환자를 보던 회사로, 이번 주 초 Chapter 11 파산을 신청했다."}, {"slug": "lotus-health-ai", "name": "Lotus Health AI", "hint": "AI 를 앞세운 1차 진료 회사로 새로 출범했다. 무엇을 다르게 하겠다는 것인지 확인한다.", "issue": "12", "section": 2, "seen": "12회차 2번 꼭지 (단상: AI로 주치의를 다시 발명한다는 이야기)", "what": "AI를 중심에 둔 프라이머리 케어 프로바이더로, Kleiner Perkins와 CRV에서 3,600만 달러를 조달하며 출범했다. 원문은 지불 주체를 밝히지 않고, 모두에게 무료 접근을 연다는 내러티"}, {"slug": "torch-health", "name": "Torch", "hint": "개인이 자기 진료 기록을 모아 두는 개인 건강 기록 스타트업이며 OpenAI 가 인수했다. 문 닫은 Forward 와 어떤 관계인지도 확인한다.", "issue": "06", "section": 14, "seen": "06회차 14번 꼭지 (OpenAI의 Torch 인수)", "what": "개인이 자기 진료 기록을 모아 두는 개인 건강 기록 스타트업 Torch를 인수했다. Torch는 2024년 문을 닫은 Forward Health의 창업자와 전 동료 3명이 시작한 회사다."}, {"slug": "chatgpt-health", "name": "ChatGPT Health", "hint": "OpenAI 가 낸 소비자용 개인 건강 기록 도구다. 무엇을 할 수 있고 무엇을 못 하는지, 의료 규제를 어떻게 피해 가는지 확인한다.", "issue": "04", "section": 2, "seen": "04회차 2번 꼭지 (OpenAI의 헬스케어 홍보 총공세)", "what": "수요일에 발표된 소비자용 개인건강기록 성격의 도구다."}, {"slug": "withings", "name": "Withings", "hint": "체중계와 혈압계 같은 가정용 측정 기기를 소비자에게 판다. 기기와 구독을 어떻게 엮는지 확인한다.", "issue": "33", "section": 3, "seen": "33회차 3번 꼭지 (ACCESS 모델 신청 결과와 정부·업계의 눈싸움)", "what": "소비자용 건강 측정 기기를 만드는 회사인데 ACCESS에 참여했다."}, {"slug": "climatic", "name": "Climatic", "hint": "호흡기 건강을 다루는 웰니스 회사다. 무엇을 파는지가 모호하므로 사이트에서 직접 확인한다.", "issue": "12", "section": 24, "seen": "12회차 24번 꼭지 (펀딩: 호흡기 웰니스 Climatic)", "what": "호흡기 건강을 위한 웰니스 모델로, Lerer Hippeau가 주도한 라운드에서 자금을 조달했다."}, {"slug": "protocole", "name": "Protocole", "hint": "펩타이드에 임상적으로 더 탄탄한 접근을 하겠다며 새로 나온 회사다. 회색 시장과 무엇이 다른지가 핵심이다.", "issue": "33", "section": 4, "seen": "33회차 4번 꼭지 (펩타이드 규제 완화 신호와 몰리는 돈)", "what": "펩타이드에 임상적으로 더 탄탄한 접근을 제공하겠다며 이번 주 스텔스에서 나온 신생 회사다."}, {"slug": "blueprint-immortals", "name": "Bryan Johnson Immortals", "hint": "연 100만 달러짜리 롱제비티 상품을 세 명에게 판다. Blueprint 와의 관계도 함께 확인한다.", "issue": "14", "section": 13, "seen": "14회차 13번 꼭지 (연 100만 달러짜리 롱제비티 상품)", "what": "연 100만 달러짜리 롱제비티 상품을 세 명에게 판다고 발표했다. 컨시어지 팀, AI 지원, 각종 검사가 포함된다. 소비자가 직접 돈을 낸다."}, {"slug": "ayble-health", "name": "Ayble Health", "hint": "임상의가 붙는 소화기 질환 원격 관리 서비스다. 고용주를 통하는지 소비자가 직접 사는지 확인한다.", "issue": "20", "section": 26, "seen": "20회차 26번 꼭지 (읽을거리: 버추얼 소화기 케어 평가)", "what": "임상의가 직접 붙어 진료하는 형태의 버추얼 소화기 솔루션으로 분류됐다."}, {"slug": "oshi-health", "name": "Oshi Health", "hint": "소화기 질환 원격 진료 회사다. Ayble 과 무엇이 다른지 비교해 적는다.", "issue": "20", "section": 26, "seen": "20회차 26번 꼭지 (읽을거리: 버추얼 소화기 케어 평가)", "what": "임상의가 직접 붙어 진료하는 형태의 버추얼 소화기 솔루션으로 분류됐다."}, {"slug": "alan-health", "name": "Alan", "hint": "프랑스 인슈어테크로 건강보험을 직접 운영한다. 미국 회사가 아니지만 앱으로 보험을 파는 모델이라 참고 가치가 있다.", "issue": "47", "section": 10, "seen": "47회차 10번 꼭지 (펀딩: 프랑스 인슈어테크 Alan)", "what": "프랑스의 인슈어테크 플랫폼으로 건강보험을 직접 운영하며, Prosus가 주도한 라운드로 대규모 투자를 받았다. 원문은 개인과 기업 중 누구에게 파는지 명시하지 않았다."}]
log(`회사 ${items.length}곳 조사 시작`)

const out = await pipeline(
  items,
  (c) => agent(
    `먼저 \`${ROOT}/scripts/company_prompt.md\` 를 읽어라. 그 문서에 이 작업의 전체 지시가 들어 있다.
지시를 그대로 따르되, 아래 대상 정보를 함께 참고한다.

## 이번 대상: ${c.name}
- 슬러그: ${c.slug}
- 저장 위치: ${ROOT}/data/companies/${c.slug}.json
- 뉴스레터에서 나온 대목: ${c.seen}
- 뉴스레터가 붙인 설명: ${c.what}
${c.hint ? `- 조사할 때 특히 볼 것: ${c.hint}` : ''}

## 참고 파일
- 노트: ${ROOT}/data/notes/${c.issue}.json 의 ${c.section}번 꼭지
- 원문 번역본: ${ROOT}/data/raw_ko/${c.issue}.json 의 같은 자리
둘을 먼저 읽어 뉴스레터가 이 회사를 어떤 맥락에서 다뤘는지 확인한 뒤 조사를 시작한다.

## 주의
- **확인한 것만 적는다.** 창업자 이름과 경력, 매출 수치는 출처를 확인하지 못하면 넣지 않는다.
- 회사가 스스로 낸 수치와 제삼자가 확인한 수치를 구분해 \`caveats\` 에 밝힌다.
- 화면 갈무리는 2~4장이면 충분하다. 같은 주소로 세 번 넘게 다시 시도하지 않는다.
- 웹 검색을 아껴 쓴다. 공식 사이트에서 직접 확인할 수 있는 것은 검색하지 않고 사이트를 연다.
- \`card\` 필드를 반드시 채운다. 목록 화면에서 회사를 훑는 자리이므로 이것이 빠지면 안 된다.

작업이 끝나면 StructuredOutput 으로 결과를 반환한다.`,
    { label: `co:${c.slug}`, phase: 'Research', schema: SCHEMA }
  )
)

const ok = out.filter(Boolean)
log(`완료 ${ok.filter((r) => r.saved).length}/${items.length}`)

return {
  done: ok.filter((r) => r.saved).length,
  total: items.length,
  failed: out.map((r, i) => (r && r.saved ? null : items[i].slug)).filter(Boolean),
  results: ok.map((r) => ({ slug: r.slug, sells_to: r.sells_to, shots: r.shots, finding: r.finding })),
}
