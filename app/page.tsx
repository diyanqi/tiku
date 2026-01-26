import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardShellLoader from "@/components/dashboard-shell-loader"
import type {
  AllianceRow,
  QuestionRow,
  TableStat,
} from "@/components/dashboard-shell"

async function getTableCount(table: string) {
  const supabase = createSupabaseServerClient()
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })

  if (error) {
    return { table, count: 0, error: error.message }
  }

  return { table, count: count ?? 0, error: null }
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
  ] = await Promise.all([
    getTableCount("alliances"),
    getTableCount("schools"),
    getTableCount("exams"),
    getTableCount("exam_subjects"),
    getTableCount("questions"),
    getTableCount("question_solutions"),
  ])

  const { data: latestQuestions, error: questionsError } = await supabase
    .from("questions")
    .select("id, q_category, q_type, parent_id, content_json, media_anchor")
    .order("id", { ascending: false })
    .limit(8)

  const { data: alliancesPreview, error: alliancesError } = await supabase
    .from("alliances")
    .select("id, regions, edu_stages")
    .order("id", { ascending: false })
    .limit(5)

  const stats: TableStat[] = [
    { label: "联盟", ...alliancesCount },
    { label: "学校", ...schoolsCount },
    { label: "考试", ...examsCount },
    { label: "科目", ...subjectsCount },
    { label: "题目", ...questionsCount },
    { label: "答案解析", ...solutionsCount },
  ]

  return (
    <DashboardShellLoader
      stats={stats}
      latestQuestions={(latestQuestions ?? []) as QuestionRow[]}
      alliancesPreview={(alliancesPreview ?? []) as AllianceRow[]}
      questionsErrorMessage={questionsError?.message ?? null}
      alliancesErrorMessage={alliancesError?.message ?? null}
    />
  )
}
