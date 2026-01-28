import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
              <Card className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle>试卷任务 #{paper.id}</CardTitle>
                  <CardDescription>题目 ID：{paper.question_id || paper.parent_id}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div>组卷信息：{JSON.stringify(paper.metadata || {})}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {papers?.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>暂无组卷</CardTitle>
                <CardDescription>从题库挑选题目即可生成试卷。</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
