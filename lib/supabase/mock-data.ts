type MockRow = Record<string, unknown>

const mockData: Record<string, MockRow[]> = {
  alliances: [
    {
      id: 101,
      regions: [{ country: "CN", provinces: ["BJ", "SH"] }],
      edu_stages: ["小学", "初中"],
    },
    {
      id: 102,
      regions: [{ country: "CN", provinces: ["GD", "ZJ"] }],
      edu_stages: ["高中"],
    },
  ],
  schools: [
    {
      id: 201,
      name: "示例中学",
      region_info: { country: "CN", prov: "GD", city: "SZ" },
    },
    {
      id: 202,
      name: "示例小学",
      region_info: { country: "CN", prov: "BJ", city: "BJ" },
    },
  ],
  exams: [
    {
      id: 301,
      name: "期中考试",
      exam_settings: { randomize: true, anti_cheat: true },
    },
    {
      id: 302,
      name: "期末考试",
      exam_settings: { randomize: false, anti_cheat: true },
    },
  ],
  exam_subjects: [
    {
      id: 401,
      name: "数学",
      score_stats: { max: 150, avg: 98, lines: { a: 120, b: 90 } },
    },
    {
      id: 402,
      name: "语文",
      score_stats: { max: 150, avg: 102, lines: { a: 118, b: 88 } },
    },
  ],
  questions: [
    {
      id: 501,
      q_category: "CONTAINER",
      q_type: "material",
      parent_id: null,
      content_json: { stem: "阅读下列材料，回答问题。" },
      options_json: null,
      media_anchor: null,
    },
    {
      id: 502,
      q_category: "LEAF",
      q_type: "choice",
      parent_id: 501,
      content_json: { stem: "下列说法正确的是？" },
      options_json: { A: "A", B: "B", C: "C", D: "D" },
      media_anchor: { start_ms: 15000, end_ms: 45000 },
    },
    {
      id: 503,
      q_category: "LEAF",
      q_type: "fill_in",
      parent_id: null,
      content_json: { stem: "1+1=[[slot_1]]" },
      options_json: { slot_1: { type: "number" } },
      media_anchor: null,
    },
  ],
  question_solutions: [
    {
      id: 601,
      question_id: 502,
      answer_data: ["A"],
      scoring_logic: { type: "single" },
    },
  ],
  paper_items: [
    {
      id: 701,
      question_id: 501,
      metadata: { order: 1, section: "阅读" },
    },
    {
      id: 702,
      question_id: 503,
      metadata: { order: 2, section: "基础" },
    },
  ],
}

type OrderOptions = { ascending?: boolean }
type SelectOptions = { count?: "exact"; head?: boolean }

function createMockQuery(table: string) {
  let rows = [...(mockData[table] ?? [])]
  let totalRows = rows.length
  let selectOptions: SelectOptions | undefined
  let isSingle = false

  const query = {
    select: (_columns?: string, options?: SelectOptions) => {
      selectOptions = options
      return query
    },
    eq: (key: string, value: unknown) => {
      rows = rows.filter((row) => (row as Record<string, unknown>)[key] === value)
      totalRows = rows.length
      return query
    },
    order: (key: string, options?: OrderOptions) => {
      const ascending = options?.ascending !== false
      rows.sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[key]
        const bValue = (b as Record<string, unknown>)[key]
        if (aValue === bValue) return 0
        if (aValue === undefined) return ascending ? 1 : -1
        if (bValue === undefined) return ascending ? -1 : 1
        return aValue > bValue ? (ascending ? 1 : -1) : ascending ? -1 : 1
      })
      totalRows = rows.length
      return query
    },
    limit: (count: number) => {
      rows = rows.slice(0, count)
      return query
    },
    single: () => {
      isSingle = true
      return query
    },
    then: (
      resolve: (value: { data: MockRow[]; count?: number | null; error: null }) => void,
      reject: (reason?: unknown) => void
    ) => {
      const count = selectOptions?.count ? totalRows : null
      const data = selectOptions?.head ? [] : rows
      if (isSingle) {
        const singleData = Array.isArray(data) ? data[0] ?? null : data
        const error = singleData ? null : { message: "Not found" }
        Promise.resolve({ data: singleData as MockRow, count, error }).then(resolve, reject)
        return
      }
      Promise.resolve({ data, count, error: null }).then(resolve, reject)
    },
  }

  return query
}

export function createMockSupabaseClient() {
  return {
    from: (table: string) => createMockQuery(table),
  }
}