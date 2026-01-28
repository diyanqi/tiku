import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function SubjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: subject, error } = await supabase
    .from("exam_subjects")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理", href: "/subjects" }, { label: "科目详情" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">科目详情</h1>
          <p className="text-muted-foreground">查看科目成绩统计与教学配置。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {subject && (
          <Card>
            <CardHeader>
              <CardTitle>{subject.name || "未命名科目"}</CardTitle>
              <CardDescription>编号：{subject.id}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>成绩统计：{JSON.stringify(subject.score_stats || {}, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
