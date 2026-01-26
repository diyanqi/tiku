import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function SchoolsPage() {
  const supabase = createSupabaseServerClient()
  const { data: schools, error } = await supabase
    .from("schools")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "组织管理" }, { label: "学校列表" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">学校列表</h1>
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
                <th className="h-10 px-4 text-left font-medium">名称</th>
                <th className="h-10 px-4 text-left font-medium">地区信息</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {schools?.map((school) => (
                <tr key={school.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{school.id}</td>
                  <td className="p-4">{school.name || "未命名学校"}</td>
                  <td className="p-4">{JSON.stringify(school.region_info)}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
              {schools?.length === 0 && (
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
