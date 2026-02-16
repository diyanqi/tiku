import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardHeader, CardBody, Divider } from "@/components/heroui-components"
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
          <p className="text-default-500">查看该次组卷的题目与元数据。</p>
        </div>
        {error && (
          <div className="p-4 bg-danger-50 text-danger rounded-medium border-1 border-danger-200">
            错误: {error.message}
          </div>
        )}
        {paper && (
          <Card className="max-w-[800px]">
            <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
              <h2 className="text-xl font-bold">试卷任务 #{paper.id}</h2>
              <p className="text-small text-default-500">题目 ID：{paper.question_id || paper.parent_id}</p>
            </CardHeader>
            <Divider />
            <CardBody className="px-6 py-4">
              <div className="space-y-4">
                <h3 className="text-medium font-semibold">组卷元数据</h3>
                <pre className="p-4 bg-default-100 rounded-medium overflow-auto text-xs whitespace-pre-wrap">
                  {JSON.stringify(paper.metadata || {}, null, 2)}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
