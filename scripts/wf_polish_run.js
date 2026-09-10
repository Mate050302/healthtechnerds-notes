export const meta = {
  name: 'htn-polish',
  description: '회차 노트의 억지 인사이트를 걸러내고 문체 지침 위반을 고침',
  phases: [{ title: 'Polish', detail: '회차마다 인사이트 근거를 다시 따지고 비유·미완결 문장을 교정' }],
}

const ROOT = '/Users/gravitylabs/dev/healthtechnerds-notes'

const BANNED = [
  '지렛대', '줄타기', '노릇', '단골', '씨름', '꼴찌', '골격', '값어치', '주범',
  '발목을 잡', '판을 흔들', '밑거름', '실탄', '몸집', '허리띠', '칼자루', '물꼬',
  '불씨', '뇌관', '시금석', '분수령', '아킬레스건', '양날의 검', '수면 위로',
  '급물살', '청신호', '적신호', '제동을 걸', '쐐기를 박', '무대', '판이 바뀌',
  '총알', '먹거리', '파이를 키', '밥그릇', '손사래', '목줄', '숨통', '빗장',
  '함정', '태우다', '뭉개', '낚아채', '쌓아 올린', '발을 넓히', '자리를 흔드',
  '판돈', '큰돈을 묻', '찍혔다', '수확', '문이 넓어지', '받쳐 주는 자리',
].join(', ')

const SCHEMA = {
  type: 'object',
  properties: {
    index: { type: 'string' },
    build_before: { type: 'integer' },
    build_after: { type: 'integer' },
    signal_before: { type: 'integer' },
    signal_after: { type: 'integer' },
    verdict_changed: { type: 'boolean', description: 'verdict 를 no 로 바꿨는가' },
    style_fixes: { type: 'integer', description: '문체 때문에 고친 문장 수' },
    summary: { type: 'string', description: '무엇을 왜 걷어냈는지 한두 문장' },
  },
  required: ['index', 'build_after', 'signal_after', 'summary'],
}

const items = [{"index": "01"}, {"index": "04"}, {"index": "06"}, {"index": "08"}, {"index": "10"}, {"index": "12"}, {"index": "14"}, {"index": "16"}, {"index": "18"}, {"index": "20"}, {"index": "22"}, {"index": "24"}, {"index": "26"}, {"index": "30"}, {"index": "33"}, {"index": "36"}, {"index": "39"}, {"index": "41"}, {"index": "42"}, {"index": "43"}, {"index": "44"}, {"index": "45"}, {"index": "46"}, {"index": "47"}, {"index": "48"}, {"index": "49"}, {"index": "50"}, {"index": "51"}, {"index": "52"}, {"index": "53"}, {"index": "54"}, {"index": "55"}]
log(`회차 ${items.length}건 정제 시작`)

const out = await pipeline(
  items,
  (f) => agent(
    `회차 노트를 정제하는 작업이다. 새로 쓰는 것이 아니라 **걷어내고 고치는** 일이다.

- 노트: ${ROOT}/data/notes/${f.index}.json
- 원문 번역본: ${ROOT}/data/raw_ko/${f.index}.json
- 목적 문서: ${ROOT}/GOAL.md (먼저 읽는다)
- 한국어 문장 지침: ~/.claude/output-styles/fluent-korean-not-coding.md (먼저 읽고 전문을 적용한다)

## 할 일 1. 억지 인사이트를 걷어낸다 (이 작업의 핵심)

지금 32회차 전부가 "건질 것 있음"으로 판정됐고, 만들 것이 0개인 회차가 하나도 없다.
**이것은 이상하다.** 뉴스레터는 대부분 병원과 보험사 사이의 이야기이므로, 소비자 앱에서 만들 것이
안 나오는 회차가 있는 편이 정상이다. 억지로 채운 것을 골라내는 것이 네 일이다.

각 꼭지의 \`insight\` 와 \`issue_insight.build\` 항목마다 아래를 따진다.

1. **그 꼭지 안의 사실에서 나온 것인가.** 꼭지가 말하는 내용과 무관하게 밖에서 들여온 일반론이면 걷어낸다.
   예를 들어 "다음에 무엇을 해야 하는지 알려 주는 길잡이", "앱 안 건강 질문 창구", "예방 검진 체크리스트" 같은 것은
   어느 회차에 붙여도 말이 되는 일반론이다. 그 꼭지가 아니면 나올 수 없는 것이어야 남긴다.
2. **원문에 없는 전제를 세우지 않았는가.** "사람들이 이것을 몰라서" 같은 전제를 지어냈으면 걷어낸다.
3. **3개월 안에 소프트웨어 인력만으로 가능한가.** 기기 개발, 규제 허가, 보험 청구 연동이 필요하면 걷어낸다.
4. **현금 리워드나 건강 나이와 겹치지 않는가.** 겹치면 걷어낸다.
5. **금전 가치가 아니라 건강 가치인가.** 돈을 아껴 주는 것뿐이면 건강 가치가 아니다.

걷어낸 뒤 \`issue_insight.build\` 가 비면 그대로 빈 배열로 둔다.
build 와 signal 이 **둘 다** 비면 \`verdict\` 를 "no" 로 바꾸고 \`summary\` 에 왜 없는지 적는다.
**없다고 적는 것이 정상적인 결과다.** 무리해서 남기지 않는다.

\`signal\` 도 같은 방식으로 따진다. 소비자가 직접 돈이나 시간을 쓰는 행동이 드러나고,
그 규모나 방향을 보여 주는 근거가 원문에 있어야 한다. 병원과 보험사 사이의 돈 이야기,
청구 업무, 기업 인수합병은 소비자 행동이 아니므로 걷어낸다.

## 할 일 2. 문체 지침 위반을 고친다

아래 표현이 들어 있으면 일반 어휘로 바꾼다. 기계 검사에서 실제로 걸린 목록이다.
${BANNED}

그 밖에 이런 것도 고친다.
- 엠대시(—)로 두 문장 관계를 뭉갠 대목은 콜론이나 접속사로 바꾼다.
- 명사구나 연결어미로 끝나 완결되지 않은 문장은 서술어로 맺는다.
  (다만 꼭지 제목, 용어 이름, 회사 한 줄 소개, 규모 표기는 명사구로 끝나도 된다.)
- 관형격 조사 '~의'를 겹쳐 써서 문장 성분이 빠진 대목을 풀어 쓴다.
- 이 수정은 문장 형태만 바꾸는 작업이며, 사실과 의미는 한 글자도 바꾸지 않는다.

## 손대지 않을 것
- 꼭지 구성과 순서, \`summary\`, \`author\`, \`experts\`, \`cases\`, \`notes\` 의 내용
  (문체 위반이 있는 문장만 형태를 고친다)
- \`tldr\`, \`title_ko\`, \`hook\`, \`themes\`, \`sells_to\` 판정

## 저장
고친 전체 JSON 을 같은 경로에 두 칸 들여쓰기로 덮어쓴다. 작업 전에 /tmp/${f.index}.polish.bak 으로 백업한다.
그다음 StructuredOutput 을 반환한다.`,
    { label: `polish:${f.index}`, phase: 'Polish', schema: SCHEMA }
  )
)

const ok = out.filter(Boolean)
const removedBuild = ok.reduce((a, r) => a + Math.max(0, (r.build_before || 0) - (r.build_after || 0)), 0)
const nowNo = ok.filter((r) => r.verdict_changed).length
log(`정제 완료 ${ok.length}/${items.length} · 만들 것 ${removedBuild}개 걷어냄 · 건질 것 없음으로 바뀐 회차 ${nowNo}건`)

return {
  done: ok.length,
  total: items.length,
  removed_build: removedBuild,
  now_no: nowNo,
  detail: ok.map((r) => ({
    i: r.index, build: `${r.build_before}->${r.build_after}`, signal: `${r.signal_before}->${r.signal_after}`,
    style: r.style_fixes, s: r.summary,
  })),
}
