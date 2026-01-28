import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

function formatRegions(regions: unknown) {
  if (!Array.isArray(regions)) return "未设置"
  return regions
    .map((item) => {
      if (!item || typeof item !== "object") return "未知区域"
      const region = item as { country?: string; provinces?: string[] }
      const country = region.country ?? "-"
      const provinces = region.provinces?.join("、") ?? "-"
      return `${country} / ${provinces}`
    })
    .join(" · ")
}

export default async function AllianceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: alliance, error } = await supabase
    .from("alliances")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout
      breadcrumb={[{ label: "校际协作", href: "/alliances" }, { label: "联盟详情" }]}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">联盟详情</h1>
          <p className="text-muted-foreground">查看联盟覆盖区域与教学阶段。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {alliance && (
          <Card>
            <CardHeader>
              <CardTitle>联盟 #{alliance.id}</CardTitle>
              <CardDescription>{formatRegions(alliance.regions)}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>覆盖学段：{Array.isArray(alliance.edu_stages) ? alliance.edu_stages.join("、") : "未设置"}</div>
              <div className="mt-2">原始配置：{JSON.stringify(alliance, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}