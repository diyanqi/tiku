import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function PapersPage() {
  const supabase = createSupabaseServerClient()
  const { data: papers, error } = await supabase
    .from("paper_items")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "组卷系统" }, { label: "试卷管理" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">试卷管理</h1>
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
                <th className="h-10 px-4 text-left font-medium">顶级题目ID</th>
                <th className="h-10 px-4 text-left font-medium">排序/元数据</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {papers?.map((paper) => (
                <tr key={paper.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{paper.id}</td>
                  <td className="p-4">{paper.question_id || paper.parent_id}</td>
                  <td className="p-4">{JSON.stringify(paper.metadata || {})}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">组卷预览</button>
                  </td>
                </tr>
              ))}
              {papers?.length === 0 && (
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
