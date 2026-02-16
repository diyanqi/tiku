import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider } from "@/components/heroui-components"

export default async function PapersPage() {
  const supabase = createSupabaseServerClient()
  const { data: papers, error } = await supabase
    .from("paper_items")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理" }, { label: "组卷" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">组卷任务</h1>
          <p className="text-muted-foreground">
            快速组合题目生成试卷，支持章节与能力维度。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {papers?.map((paper) => (
            <Link key={paper.id} href={`/papers/${paper.id}`} className="block">
              <Card className="transition hover:shadow-md" isPressable>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                  <h3 className="text-lg font-bold">试卷任务 #{paper.id}</h3>
                  <p className="text-default-500 text-small">题目 ID：{paper.question_id || paper.parent_id}</p>
                </CardHeader>
                <CardBody className="px-4 py-2 text-sm text-default-500">
                  <Divider className="my-2" />
                  <div className="truncate">组卷信息：{JSON.stringify(paper.metadata || {})}</div>
                </CardBody>
              </Card>
            </Link>
          ))}
          {papers?.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">暂无组卷</h3>
                <p className="text-default-500 text-small">从题库挑选题目即可生成试卷。</p>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
