import Link from "next/link"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardBody, CardHeader, Divider } from "@/components/heroui-components"
import { mediaItems } from "./media-data"

export default function MediaPage() {
  return (
    <DashboardLayout breadcrumb={[{ label: "资源库" }, { label: "音视频" }]}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">音视频与素材</h1>
          <p className="text-muted-foreground">
            为听力、实验与多媒体题目提供素材支持。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaItems.map((item) => (
            <Link key={item.id} href={`/media/${item.id}`} className="block">
              <Card className="transition hover:shadow-md" isPressable>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-default-500 text-small">{item.type} · {item.id}</p>
                </CardHeader>
                <CardBody className="px-4 py-2 text-sm text-default-500">
                  <Divider className="my-2" />
                  时长：{item.duration}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
