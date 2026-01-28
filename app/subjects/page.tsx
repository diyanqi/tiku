import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SubjectsPage() {
  const supabase = createSupabaseServerClient()
  const { data: subjects, error } = await supabase
    .from("exam_subjects")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "课堂管理" }, { label: "科目与进度" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">科目与学习进度</h1>
          <p className="text-muted-foreground">
            查看各科目的成绩概览与练习进度。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subjects?.map((subject) => {
            const stats = (subject.score_stats ?? {}) as Record<string, unknown>
            const lines = (stats.lines ?? {}) as Record<string, unknown>
            return (
              <Link key={subject.id} href={`/subjects/${subject.id}`} className="block">
                <Card className="transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{subject.name || "未命名科目"}</CardTitle>
                    <CardDescription>科目编号：{subject.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <div>平均分：{stats.avg ?? "-"}</div>
                    <div>最高分：{stats.max ?? "-"}</div>
                    <div>分数线：{Object.keys(lines).length ? JSON.stringify(lines) : "-"}</div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
          {subjects?.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>暂无科目</CardTitle>
                <CardDescription>创建科目后可同步学习进度。</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
