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

const items = args || []
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
