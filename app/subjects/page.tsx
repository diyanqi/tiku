import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function SubjectsPage() {
  const supabase = createSupabaseServerClient()
  const { data: subjects, error } = await supabase
    .from("exam_subjects")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "考试管理" }, { label: "科目管理" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">科目管理</h1>
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
                <th className="h-10 px-4 text-left font-medium">科目名称</th>
                <th className="h-10 px-4 text-left font-medium">成绩统计</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {subjects?.map((subject) => (
                <tr key={subject.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{subject.id}</td>
                  <td className="p-4">{subject.name || "未命名科目"}</td>
                  <td className="p-4">{JSON.stringify(subject.score_stats)}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
              {subjects?.length === 0 && (
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
