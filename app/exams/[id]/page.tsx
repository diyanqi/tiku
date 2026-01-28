import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function ExamDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: exam, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理", href: "/exams" }, { label: "考试详情" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">考试详情</h1>
          <p className="text-muted-foreground">查看考试设置与组卷信息。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {exam && (
          <Card>
            <CardHeader>
              <CardTitle>{exam.name || "未命名练习"}</CardTitle>
              <CardDescription>编号：{exam.id}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>考试设置：{JSON.stringify(exam.exam_settings || {}, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
