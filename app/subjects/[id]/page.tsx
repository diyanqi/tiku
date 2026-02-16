import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardHeader, CardBody, Divider } from "@/components/heroui-components"
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
          <p className="text-default-500">查看科目成绩统计与教学配置。</p>
        </div>
        {error && (
          <div className="p-4 bg-danger-50 text-danger rounded-medium border-1 border-danger-200">
            错误: {error.message}
          </div>
        )}
        {subject && (
          <Card className="max-w-[800px]">
            <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
              <h2 className="text-xl font-bold">{subject.name || "未命名科目"}</h2>
              <p className="text-small text-default-500">编号：{subject.id}</p>
            </CardHeader>
            <Divider />
            <CardBody className="px-6 py-4">
              <div className="space-y-4">
                <h3 className="text-medium font-semibold">成绩统计</h3>
                <pre className="p-4 bg-default-100 rounded-medium overflow-auto text-xs whitespace-pre-wrap">
                  {JSON.stringify(subject.score_stats || {}, null, 2)}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
