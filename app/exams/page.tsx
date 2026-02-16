import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider, Chip } from "@/components/heroui-components"

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
                <Card className="transition hover:shadow-md" isPressable>
                  <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                    <h3 className="text-lg font-bold">{exam.name || "未命名练习"}</h3>
                    <p className="text-default-500 text-small">编号：{exam.id}</p>
                  </CardHeader>
                  <CardBody className="px-4 py-2 text-sm text-default-600">
                    <Divider className="my-2" />
                    <div className="flex flex-wrap gap-2">
                      <Chip size="sm" variant="flat" color={settings.randomize ? "success" : "default"}>随机出题：{settings.randomize ? "开启" : "关闭"}</Chip>
                      <Chip size="sm" variant="flat" color={settings.anti_cheat ? "success" : "default"}>防作弊：{settings.anti_cheat ? "开启" : "关闭"}</Chip>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            )
          })}
          {exams?.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">暂无练习</h3>
                <p className="text-default-500 text-small">创建练习后即可布置给班级。</p>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
