import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardHeader, CardBody, Divider } from "@/components/heroui-components"
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
          <p className="text-default-500">查看考试设置与组卷信息。</p>
        </div>
        {error && (
          <div className="p-4 bg-danger-50 text-danger rounded-medium border-1 border-danger-200">
            错误: {error.message}
          </div>
        )}
        {exam && (
          <Card className="max-w-[800px]">
            <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
              <h2 className="text-xl font-bold">{exam.name || "未命名练习"}</h2>
              <p className="text-small text-default-500">编号：{exam.id}</p>
            </CardHeader>
            <Divider />
            <CardBody className="px-6 py-4">
              <div className="space-y-4">
                <h3 className="text-medium font-semibold">考试设置</h3>
                <pre className="p-4 bg-default-100 rounded-medium overflow-auto text-xs whitespace-pre-wrap">
                  {JSON.stringify(exam.exam_settings || {}, null, 2)}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
