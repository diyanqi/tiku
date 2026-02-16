import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider } from "@/components/heroui-components"

function getStemPreview(content: unknown) {
  if (typeof content === "string") return content
  if (content && typeof content === "object") {
    const obj = content as { stem?: string }
    return obj.stem ?? JSON.stringify(content)
  }
  return "-"
}

export default async function QuestionsPage() {
  const supabase = createSupabaseServerClient()
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .order("id", { ascending: false })
    .limit(50)

  return (
    <DashboardLayout breadcrumb={[{ label: "资源库" }, { label: "题库" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">题库浏览</h1>
          <p className="text-muted-foreground">
            按题型与难度筛选，快速挑选课堂练习题。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {questions?.map((q) => (
            <Link key={q.id} href={`/questions/${q.id}`} className="block">
              <Card className="transition hover:shadow-md" isPressable>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                  <h3 className="text-lg font-bold">题目 #{q.id}</h3>
                  <p className="text-default-500 text-small">
                    {q.q_type || "未标注题型"} · {q.q_category || "-"}
                  </p>
                </CardHeader>
                <CardBody className="px-4 py-2 text-sm text-default-600">
                  <div className="line-clamp-3">{getStemPreview(q.content_json)}</div>
                  <Divider className="my-2" />
                  <div className="text-tiny text-default-400">父题：{q.parent_id || "无"}</div>
                </CardBody>
              </Card>
            </Link>
          ))}
          {questions?.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">暂无题目</h3>
                <p className="text-default-500 text-small">可以通过上传或编辑题目来丰富题库。</p>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
