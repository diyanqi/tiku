import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
              <Card className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle>联盟 #{alliance.id}</CardTitle>
                  <CardDescription>{formatRegions(alliance.regions)}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="text-muted-foreground">覆盖学段</div>
                  <div className="mt-1">
                    {Array.isArray(alliance.edu_stages)
                      ? alliance.edu_stages.join("、")
                      : "未设置"}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {alliances?.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>暂无联盟</CardTitle>
                <CardDescription>创建联盟后可快速共享优质试题。</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
