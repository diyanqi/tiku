import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { Card, CardHeader, CardBody, Divider, Chip } from "@/components/heroui-components"

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

export default async function AlliancesPage() {
  const supabase = createSupabaseServerClient()
  const { data: alliances, error } = await supabase
    .from("alliances")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "校际协作" }, { label: "联盟/区域" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">联盟与区域</h1>
          <p className="text-muted-foreground">
            用于跨校教研与试题共建的协作范围。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {alliances?.map((alliance) => (
            <Link key={alliance.id} href={`/alliances/${alliance.id}`} className="block">
              <Card className="transition hover:shadow-md" isPressable>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                  <h3 className="text-lg font-bold">联盟 #{alliance.id}</h3>
                  <p className="text-default-500 text-small">{formatRegions(alliance.regions)}</p>
                </CardHeader>
                <CardBody className="px-4 py-2 text-sm">
                  <div className="text-default-400 text-xs uppercase font-semibold">覆盖学段</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Array.isArray(alliance.edu_stages)
                      ? alliance.edu_stages.map(stage => (
                        <Chip key={stage} size="sm" variant="flat">{stage}</Chip>
                      ))
                      : <span className="text-default-400">未设置</span>}
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
          {alliances?.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">暂无联盟</h3>
                <p className="text-default-500 text-small">创建联盟后可快速共享优质试题。</p>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
