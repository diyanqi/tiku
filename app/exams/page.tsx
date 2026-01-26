import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function ExamsPage() {
  const supabase = createSupabaseServerClient()
  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "考试管理" }, { label: "考试列表" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">考试列表</h1>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 transition-colors">
                <th className="h-10 px-4 text-left font-medium">ID</th>
                <th className="h-10 px-4 text-left font-medium">考试名称</th>
                <th className="h-10 px-4 text-left font-medium">规则配置</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {exams?.map((exam) => (
                <tr key={exam.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{exam.id}</td>
                  <td className="p-4">{exam.name || "未命名考试"}</td>
                  <td className="p-4 line-clamp-1 max-w-xs">{JSON.stringify(exam.exam_settings)}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
              {exams?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-muted-foreground">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
