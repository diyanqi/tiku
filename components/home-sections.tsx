"use client"

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
} from "@heroui/react"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { IconArrowRight, IconStack2, IconSearch, IconAdjustmentsHorizontal } from "@tabler/icons-react"

type TableSummary = {
  key: string
  label: string
  count: number
  error?: string | null
}

interface HomeSectionsProps {
  summaries: TableSummary[]
  latestQuestions: any[]
  questionsError?: any
}

export function HomeSections({ summaries, latestQuestions, questionsError }: HomeSectionsProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tighter text-default-900">
              下午好，教师
            </h1>
            <Chip 
              variant="shadow" 
              color="primary" 
              size="sm" 
              className="font-black animate-pulse"
            >
              PRO
            </Chip>
          </div>
          <p className="text-default-500 font-bold text-lg max-w-lg leading-relaxed">
            欢迎回到题库管理系统。今日全国联盟共有 <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-4">1,420</span> 套新题入库，点击查看趋势。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="flat" 
            size="lg" 
            startContent={<IconSearch size={20} stroke={3} />}
            className="font-black rounded-2xl h-14 px-6 bg-default-100 hover:bg-default-200 transition-all border border-divider"
          >
            全局搜索
          </Button>
          <Button 
            color="primary" 
            size="lg" 
            className="font-black rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 transition-all active:scale-95"
            endContent={<IconAdjustmentsHorizontal size={20} stroke={3} />}
          >
            进入编辑器
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <SectionCards />

      {/* Analytics Stage */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ChartAreaInteractive />
        </div>
        
        {/* Resource Summary Cards */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-default-800 tracking-tight">资源看板</h3>
            <Button size="sm" variant="light" className="text-primary font-bold">查看详情</Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {summaries.slice(0, 4).map((summary) => (
              <Card 
                key={summary.key} 
                className="bg-default-50/50 hover:bg-default-100 transition-all border-0 shadow-sm rounded-3xl group cursor-pointer"
                shadow="none"
              >
                <CardBody className="py-4 px-6 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <IconStack2 size={24} stroke={2} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-default-400 uppercase tracking-widest">{summary.label}</p>
                      <p className="text-xl font-black text-default-900 leading-none mt-1">{summary.count}</p>
                    </div>
                  </div>
                  <IconArrowRight size={18} className="text-default-300 group-hover:text-primary transition-all translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Questions Table */}
      <Card className="bg-white dark:bg-default-50/50 border-0 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="flex flex-col items-start gap-1 p-8 pb-4">
          <h4 className="text-2xl font-black text-default-800 tracking-tight">联盟最新入库</h4>
          <p className="text-default-500 font-bold">全网最新同步的 5 条试题数据</p>
        </CardHeader>
        <CardBody className="px-8 pb-8">
          {questionsError && (
            <div className="mb-6 p-4 bg-danger/10 border border-danger/20 text-danger rounded-2xl font-bold flex items-center gap-3">
              <span className="animate-bounce">⚠️</span> 
              同步失败：{questionsError.message}
            </div>
          )}
          <Table 
            aria-label="Latest questions table" 
            removeWrapper 
            className="min-w-full"
            classNames={{
              th: "bg-transparent text-default-400 font-black uppercase text-[11px] tracking-widest px-4 border-b border-divider h-14",
              td: "py-4 px-4 font-bold text-default-700",
              tr: "hover:bg-default-50/50 transition-colors group cursor-pointer border-b border-divider/50 last:border-0"
            }}
          >
            <TableHeader>
              <TableColumn>试题信息</TableColumn>
              <TableColumn>题型架构</TableColumn>
              <TableColumn>难度系数</TableColumn>
              <TableColumn align="end">操作</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"暂无同步数据"}>
              {(latestQuestions ?? []).map((q) => (
                <TableRow key={q.id}>
                  <TableCell>
                    <User
                      name={
                        <div className="max-w-[400px] truncate">
                          {typeof q.content_json === "object"
                            ? (q.content_json as { stem?: string }).stem ?? "未题标题"
                            : q.content_json}
                        </div>
                      }
                      description={`ID: #${q.id}`}
                      className="transition-transform group-hover:scale-[1.01]"
                      avatarProps={{
                        className: "hidden"
                      }}
                      classNames={{
                        name: "text-[14px] font-black text-default-800",
                        description: "text-[11px] font-bold text-default-400"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Chip size="sm" variant="dot" color="primary" className="font-bold">{q.q_type ?? "通用"}</Chip>
                      <Chip size="sm" variant="dot" color="secondary" className="font-bold">{q.q_category ?? "理论"}</Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className={`size-1.5 rounded-full ${s <= 3 ? "bg-warning shadow-[0_0_8px_var(--warning)]" : "bg-default-200"}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="light" 
                      className="font-black text-primary hover:bg-primary/10 rounded-xl"
                    >
                      查看详情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
