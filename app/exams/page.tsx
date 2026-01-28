import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ExamsPage() {
  const supabase = createSupabaseServerClient()
  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理" }, { label: "考试与练习" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">考试与练习</h1>
          <p className="text-muted-foreground">
            发布练习、创建测验，支持防作弊与随机化设置。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exams?.map((exam) => {
            const settings = (exam.exam_settings ?? {}) as Record<string, unknown>
            return (
              <Link key={exam.id} href={`/exams/${exam.id}`} className="block">
                <Card className="transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{exam.name || "未命名练习"}</CardTitle>
                    <CardDescription>编号：{exam.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-muted px-2 py-1">随机出题：{settings.randomize ? "开启" : "关闭"}</span>
                      <span className="rounded-full bg-muted px-2 py-1">防作弊：{settings.anti_cheat ? "开启" : "关闭"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
          {exams?.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>暂无练习</CardTitle>
                <CardDescription>创建练习后即可布置给班级。</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
