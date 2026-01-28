import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function PaperDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: paper, error } = await supabase
    .from("paper_items")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理", href: "/papers" }, { label: "试卷详情" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">试卷详情</h1>
          <p className="text-muted-foreground">查看该次组卷的题目与元数据。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {paper && (
          <Card>
            <CardHeader>
              <CardTitle>试卷任务 #{paper.id}</CardTitle>
              <CardDescription>题目 ID：{paper.question_id || paper.parent_id}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>组卷元数据：{JSON.stringify(paper.metadata || {}, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
