import Link from "next/link"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
              <Card className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.type} · {item.id}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  时长：{item.duration}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
