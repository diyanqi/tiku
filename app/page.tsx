import DashboardLayout from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">今日学习概览</h1>
          <p className="text-muted-foreground">
            为老师与同学提供高效备课与练习的统一入口。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary) => (
            <Card key={summary.key}>
              <CardHeader>
                <CardTitle>{summary.label}</CardTitle>
                <CardDescription>可用资源总量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">
                  {summary.count}
                </div>
                {summary.error && (
                  <div className="mt-2 text-sm text-destructive">
                    错误：{summary.error}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>最新题目</CardTitle>
            <CardDescription>快速进入课堂练习或课后作业</CardDescription>
          </CardHeader>
          <CardContent>
            {questionsError && (
              <div className="mb-3 text-sm text-destructive">
                错误：{questionsError.message}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">ID</th>
                    <th className="h-10 px-4 text-left font-medium">题型</th>
                    <th className="h-10 px-4 text-left font-medium">结构</th>
                    <th className="h-10 px-4 text-left font-medium">题干预览</th>
                  </tr>
                </thead>
                <tbody>
                  {latestQuestions?.map((q) => (
                    <tr key={q.id} className="border-b">
                      <td className="p-4">{q.id}</td>
                      <td className="p-4">{q.q_type ?? "-"}</td>
                      <td className="p-4">{q.q_category ?? "-"}</td>
                      <td className="p-4 max-w-[360px] truncate">
                        {typeof q.content_json === "object"
                          ? (q.content_json as { stem?: string }).stem ??
                            JSON.stringify(q.content_json)
                          : q.content_json}
                      </td>
                    </tr>
                  ))}
                  {latestQuestions?.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-4 text-center text-muted-foreground"
                      >
                        暂无数据
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
