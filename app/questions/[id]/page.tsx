import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider, Code } from "@/components/heroui-components"
import { createSupabaseServerClient } from "@/lib/supabase/server"

function getStemPreview(content: unknown) {
  if (typeof content === "string") return content
  if (content && typeof content === "object") {
    const obj = content as { stem?: string }
    return obj.stem ?? JSON.stringify(content)
  }
  return "-"
}

export default async function QuestionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: question, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout breadcrumb={[{ label: "资源库", href: "/questions" }, { label: "题目详情" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">题目详情</h1>
          <p className="text-muted-foreground">查看题干、题型与关联信息。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {question && (
          <Card className="p-4">
            <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
              <h2 className="text-2xl font-bold">题目 #{question.id}</h2>
              <p className="text-default-500">{question.q_type || "未标注题型"}</p>
            </CardHeader>
            <Divider className="my-4" />
            <CardBody className="gap-4 text-sm text-default-600">
              <div className="flex gap-2 items-center">
                <span className="font-semibold w-24">结构类型:</span>
                <Code>{question.q_category || "-"}</Code>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold w-24">父题:</span>
                <span>{question.parent_id || "无"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">题干预览:</span>
                <div className="p-3 bg-default-100 rounded-lg">{getStemPreview(question.content_json)}</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">选项配置:</span>
                <pre className="p-3 bg-default-100 rounded-lg overflow-auto">
                  {JSON.stringify(question.options_json || {}, null, 2)}
                </pre>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">媒体锚点:</span>
                <pre className="p-3 bg-default-100 rounded-lg overflow-auto">
                  {JSON.stringify(question.media_anchor || {}, null, 2)}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
