"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export type QuestionRow = {
  id: number
  q_category: string | null
  q_type: string | null
  parent_id: number | null
  content_json: unknown | null
  media_anchor: unknown | null
}

export type AllianceRow = {
  id: number
  regions: unknown | null
  edu_stages: unknown | null
}

export type TableStat = {
  label: string
  table: string
  count: number
  error: string | null
}

type DashboardShellProps = {
  stats: TableStat[]
  latestQuestions: QuestionRow[]
  alliancesPreview: AllianceRow[]
  questionsErrorMessage: string | null
  alliancesErrorMessage: string | null
}

const formatContentPreview = (content: unknown) => {
  if (!content) return "-"
  if (typeof content === "string") return content
  if (typeof content === "object") {
    const record = content as Record<string, unknown>
    if (record.stem) return String(record.stem)
    if (record.content) return String(record.content)
    return JSON.stringify(record)
  }
  return String(content)
}

const formatJson = (value: unknown) =>
  value ? JSON.stringify(value, null, 2) : "-"

export default function DashboardShell({
  stats,
  latestQuestions,
  alliancesPreview,
  questionsErrorMessage,
  alliancesErrorMessage,
}: DashboardShellProps) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex flex-1 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">组卷中心</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>首页数据概览</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto pr-4">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.table}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="text-sm text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <div className="text-3xl font-semibold">{item.count}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.error ? `获取失败：${item.error}` : item.table}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">最新题目</h2>
                  <p className="text-sm text-muted-foreground">
                    按题目池最新 ID 排序，展示结构化题干与媒体定位信息
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {questionsErrorMessage ? "加载失败" : "同步 Supabase"}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {latestQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-dashed p-3"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>题目 ID: {item.id}</span>
                      <span>类型: {item.q_type ?? "-"}</span>
                      <span>节点: {item.q_category ?? "-"}</span>
                      <span>父级: {item.parent_id ?? "顶级"}</span>
                      <span>
                        媒体锚点: {item.media_anchor ? "已设置" : "未设置"}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm">
                      {formatContentPreview(item.content_json)}
                    </p>
                  </div>
                ))}
                {!latestQuestions.length && (
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    还没有题目数据，或当前账号无读取权限。
                  </div>
                )}
                {questionsErrorMessage && (
                  <div className="rounded-lg border border-dashed p-4 text-sm text-destructive">
                    获取题目数据失败：{questionsErrorMessage}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <h2 className="text-lg font-semibold">联盟地域与学段</h2>
              <p className="text-sm text-muted-foreground">
                显示联盟 JSONB 字段样例，用于地区与学段过滤。
              </p>
              <div className="mt-4 space-y-3">
                {alliancesPreview.map((item) => (
                  <div key={item.id} className="rounded-lg border p-3">
                    <div className="text-sm font-medium">联盟 #{item.id}</div>
                    <pre className="mt-2 whitespace-pre-wrap break-words rounded bg-muted/50 p-2 text-xs">
                      {formatJson({
                        regions: item.regions,
                        edu_stages: item.edu_stages,
                      })}
                    </pre>
                  </div>
                ))}
                {!alliancesPreview.length && (
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    暂无联盟数据或无访问权限。
                  </div>
                )}
                {alliancesErrorMessage && (
                  <div className="rounded-lg border border-dashed p-4 text-sm text-destructive">
                    获取联盟数据失败：{alliancesErrorMessage}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold">题目树结构说明</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              试题库使用递归树结构组织题目：顶级材料（CONTAINER）可包含多个题组或小题，
              叶子节点（LEAF）对应实际作答项。前端根据 q_type 决定渲染组件，
              并通过 media_anchor 定位长音视频材料的片段。
            </p>
          </section>
        </div>
      </SidebarInset>
  )
}
