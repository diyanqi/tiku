import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"

export default async function AlliancesPage() {
  const supabase = createSupabaseServerClient()
  const { data: alliances, error } = await supabase
    .from("alliances")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "组织管理" }, { label: "联盟列表" }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">联盟列表</h1>
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
                <th className="h-10 px-4 text-left font-medium">地区</th>
                <th className="h-10 px-4 text-left font-medium">教育阶段</th>
                <th className="h-10 px-4 text-left font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {alliances?.map((alliance) => (
                <tr key={alliance.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">{alliance.id}</td>
                  <td className="p-4">{JSON.stringify(alliance.regions)}</td>
                  <td className="p-4">{JSON.stringify(alliance.edu_stages)}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">查看详情</button>
                  </td>
                </tr>
              ))}
              {alliances?.length === 0 && (
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
