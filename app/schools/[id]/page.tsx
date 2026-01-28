import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseServerClient } from "@/lib/supabase/server"

function formatRegion(regionInfo: unknown) {
  if (!regionInfo || typeof regionInfo !== "object") return "未设置"
  const region = regionInfo as { country?: string; prov?: string; city?: string }
  return [region.country, region.prov, region.city].filter(Boolean).join(" · ") || "未设置"
}

export default async function SchoolDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createSupabaseServerClient()
  const { data: school, error } = await supabase
    .from("schools")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  return (
    <DashboardLayout breadcrumb={[{ label: "校际协作", href: "/schools" }, { label: "学校详情" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">学校详情</h1>
          <p className="text-muted-foreground">查看学校基础信息与所在地区。</p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        {school && (
          <Card>
            <CardHeader>
              <CardTitle>{school.name || "未命名学校"}</CardTitle>
              <CardDescription>{formatRegion(school.region_info)}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>学校编号：{school.id}</div>
              <div className="mt-2">原始配置：{JSON.stringify(school, null, 2)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
