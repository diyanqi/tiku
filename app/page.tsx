import DashboardLayout from "@/components/dashboard-layout"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { HomeSections } from "@/components/home-sections"

type TableSummary = {
  key: string
  label: string
  count: number
  error?: string | null
}

async function getTableCount(table: string) {
  const supabase = createSupabaseServerClient()
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })

  return {
    table,
    count: count ?? 0,
    error: error ? error.message : null,
  }
}

export default async function Page() {
  const supabase = createSupabaseServerClient()

  const [
    alliancesCount,
    schoolsCount,
    examsCount,
    subjectsCount,
    questionsCount,
    solutionsCount,
    papersCount,
  ] = await Promise.all([
    getTableCount("alliances"),
    getTableCount("schools"),
    getTableCount("exams"),
    getTableCount("exam_subjects"),
    getTableCount("questions"),
    getTableCount("question_solutions"),
    getTableCount("paper_items"),
  ])

  const { data: latestQuestions, error: questionsError } = await supabase
    .from("questions")
    .select("id, q_category, q_type, parent_id, content_json")
    .order("id", { ascending: false })
    .limit(5)

  const summaries: TableSummary[] = [
    { key: "alliances", label: "联盟", ...alliancesCount },
    { key: "schools", label: "学校", ...schoolsCount },
    { key: "exams", label: "考试", ...examsCount },
    { key: "subjects", label: "科目", ...subjectsCount },
    { key: "questions", label: "题目", ...questionsCount },
    { key: "solutions", label: "答案解析", ...solutionsCount },
    { key: "papers", label: "组卷", ...papersCount },
  ]

  return (
    <DashboardLayout breadcrumb={[{ label: "首页" }]}>
      <HomeSections 
        summaries={summaries} 
        latestQuestions={latestQuestions ?? []} 
        questionsError={questionsError} 
      />
    </DashboardLayout>
  )
}
