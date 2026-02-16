import Link from "next/link"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider } from "@/components/heroui-components"

function formatRegion(regionInfo: unknown) {
  if (!regionInfo || typeof regionInfo !== "object") return "未设置"
  const region = regionInfo as { country?: string; prov?: string; city?: string }
  return [region.country, region.prov, region.city].filter(Boolean).join(" · ") || "未设置"
}

export default async function SchoolsPage() {
  const supabase = createSupabaseServerClient()
  const { data: schools, error } = await supabase
    .from("schools")
    .select("*")
    .order("id", { ascending: false })

  return (
    <DashboardLayout breadcrumb={[{ label: "校际协作" }, { label: "学校" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">学校列表</h1>
          <p className="text-muted-foreground">
            选择学校即可进入班级与课程管理。
          </p>
        </div>
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            错误: {error.message}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {schools?.map((school) => (
            <Link key={school.id} href={`/schools/${school.id}`} className="block">
              <Card className="transition hover:shadow-md" isPressable>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                  <h3 className="text-lg font-bold">{school.name || "未命名学校"}</h3>
                  <p className="text-default-500 text-small">{formatRegion(school.region_info)}</p>
                </CardHeader>
                <CardBody className="px-4 py-2 text-sm text-default-500">
                  <Divider className="my-2" />
                  学校编号：{school.id}
                </CardBody>
              </Card>
            </Link>
          ))}
          {schools?.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">暂无学校</h3>
                <p className="text-default-500 text-small">可通过联盟邀请学校加入共享题库。</p>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
