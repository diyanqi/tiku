import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider, Code } from "@/components/heroui-components"
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
          <Card className="p-4">
            <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
              <h2 className="text-2xl font-bold">联盟 #{alliance.id}</h2>
              <p className="text-default-500">{formatRegions(alliance.regions)}</p>
            </CardHeader>
            <Divider className="my-4" />
            <CardBody className="gap-4 text-sm text-default-600">
              <div className="flex gap-2 items-center">
                <span className="font-semibold w-24">覆盖学段:</span>
                <span>{Array.isArray(alliance.edu_stages) ? alliance.edu_stages.join("、") : "未设置"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">原始配置:</span>
                <pre className="p-3 bg-default-100 rounded-lg overflow-auto">
                  {JSON.stringify(alliance, null, 2)}
                </pre>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}