import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
          <Card>
            <CardHeader>
              <CardTitle>题目 #{question.id}</CardTitle>
              <CardDescription>{question.q_type || "未标注题型"}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>结构类型：{question.q_category || "-"}</div>
              <div className="mt-2">父题：{question.parent_id || "无"}</div>
              <div className="mt-2">题干预览：{getStemPreview(question.content_json)}</div>
              <div className="mt-2">选项配置：{JSON.stringify(question.options_json || {}, null, 2)}</div>
              <div className="mt-2">媒体锚点：{JSON.stringify(question.media_anchor || {}, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
