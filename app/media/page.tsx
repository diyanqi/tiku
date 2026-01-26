import DashboardLayout from "@/components/dashboard-layout"

export default function MediaPage() {
  return (
    <DashboardLayout breadcrumb={[{ label: "资源库" }, { label: "媒体资源" }]}>
      <div className="flex flex-col gap-4 text-center py-20">
        <h1 className="text-2xl font-bold">媒体资源库</h1>
        <p className="text-muted-foreground">根据数据库模式，媒体资源通过 media_anchor 引用。</p>
        <div className="mx-auto max-w-md p-6 border rounded-lg bg-muted/20">
          <p>此处将展示存储在系统中的音频、视频及图片资源。</p>
          <p className="mt-2 text-sm text-yellow-600 font-medium">提示: 媒体资源通常存储在 Supabase Storage 或独立资源表中。</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
