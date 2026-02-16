"use client"

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Chip, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Code
} from "@heroui/react"
import { IconDatabase, IconTopologyStar3, IconInfoCircle } from "@tabler/icons-react"

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
    <div className="flex flex-col gap-8">
      {/* Stats Section */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.table} className="border-none bg-default-100/50" shadow="none">
            <CardBody className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-default-500 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                <IconDatabase size={16} className="text-default-300" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">{item.count}</span>
                <span className="text-default-400 text-xs font-medium uppercase">{item.table}</span>
              </div>
              {item.error && (
                <Chip size="sm" color="danger" variant="flat" className="mt-1">
                  获取失败
                </Chip>
              )}
            </CardBody>
          </Card>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Questions Section */}
        <Card className="border-none bg-default-50 shadow-sm" shadow="none">
          <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <IconTopologyStar3 size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">最新试题</h2>
                <p className="text-default-500 text-xs font-medium">同步自 Supabase 题库系统</p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {latestQuestions.map((item) => (
                <div key={item.id} className="group bg-white dark:bg-default-100 p-4 rounded-2xl border-1 border-default-200 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Chip size="sm" variant="dot" color="primary" className="border-none font-bold">ID: {item.id}</Chip>
                    <Chip size="sm" variant="flat" className="bg-default-200/50 font-medium">类型: {item.q_type ?? "-"}</Chip>
                    <Chip size="sm" variant="flat" className="bg-default-200/50 font-medium">{item.q_category ?? "-"}</Chip>
                  </div>
                  <p className="text-sm text-default-700 leading-relaxed font-medium line-clamp-3">
                    {formatContentPreview(item.content_json)}
                  </p>
                </div>
              ))}
              {!latestQuestions.length && !questionsErrorMessage && (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-default-100/50 rounded-3xl border-2 border-dashed border-default-200">
                  <p className="text-default-400 font-bold">暂无试题数据</p>
                </div>
              )}
              {questionsErrorMessage && (
                <Card className="bg-danger-50 border-none">
                  <CardBody className="text-danger font-bold text-sm">
                    {questionsErrorMessage}
                  </CardBody>
                </Card>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Alliances Section */}
        <Card className="border-none bg-default-50 shadow-sm" shadow="none">
          <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                <IconDatabase size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">联盟数据预览</h2>
                <p className="text-default-500 text-xs font-medium">JSONB 字段结构化展示</p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {alliancesPreview.map((item) => (
                <div key={item.id} className="bg-white dark:bg-default-100 p-4 rounded-2xl border-1 border-default-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-default-800">联盟 #{item.id}</span>
                  </div>
                  <Code className="w-full text-[11px] h-32 overflow-auto bg-default-50 p-3 rounded-xl block border-1 border-default-200">
                    {formatJson({
                      regions: item.regions,
                      edu_stages: item.edu_stages,
                    })}
                  </Code>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="border-none bg-primary/5 text-primary-700" shadow="none">
        <CardBody className="p-6 flex flex-row gap-4 items-center">
          <IconInfoCircle size={24} className="shrink-0" />
          <div>
            <h3 className="font-bold">题目树结构说明</h3>
            <p className="text-sm opacity-80 font-medium">
              系统通过父子节点（parent_id）构建起题目树。CONTAINER 类型容器可嵌套多个 LEAF 类型题目，支持多级复合题型的灵活组卷。
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
