import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function QuestionsPage() {
  const supabase = createSupabaseServerClient()
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .order("id", { ascending: false })
    .limit(50)

  return (
    <DashboardLayout breadcrumb={[{ label: "资源库" }, { label: "题目池" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">题目池 (前50条)</h1>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 transition-colors">
                <th className="h-10 px-4 text-left font-medium">ID</th>
                <th className="h-10 px-4 text-left font-medium">类别</th>
                <th className="h-10 px-4 text-left font-medium">类型</th>
                <th className="h-10 px-4 text-left font-medium">父ID</th>
                <th className="h-10 px-4 text-left font-medium">题干预览</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((q) => (
                <tr key={q.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{q.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${q.q_category === 'CONTAINER' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {q.q_category}
                    </span>
                  </td>
                  <td className="p-4">{q.q_type || "-"}</td>
                  <td className="p-4">{q.parent_id || "-"}</td>
                  <td className="p-4 max-w-[300px] truncate">
                    {typeof q.content_json === 'object' ? (q.content_json?.stem || JSON.stringify(q.content_json)) : q.content_json}
                  </td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
              {questions?.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
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
