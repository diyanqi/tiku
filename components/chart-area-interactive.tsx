"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Chip,
} from "@heroui/react"
import { IconChartLine, IconTrendingUp } from "@tabler/icons-react"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="w-full bg-default-50/50 backdrop-blur-3xl border-0 shadow-2xl rounded-[2.5rem] p-4 lg:p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-[1.25rem] bg-primary/10 text-primary shadow-inner">
              <IconChartLine size={28} stroke={2.5} />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-default-800 tracking-tighter">访问数据总览</h2>
              <div className="flex items-center gap-2">
                <Chip size="sm" variant="flat" color="success" className="font-bold uppercase tracking-widest text-[10px]">
                  Real-time
                </Chip>
                <p className="text-default-400 text-[12px] font-medium tracking-tight">
                  最近 {timeRange === "90d" ? "3 个月" : timeRange === "30d" ? "30 天" : "7 天"} 的访客活跃度
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex bg-default-100/50 p-1 rounded-2xl border border-divider">
              <Tabs 
                aria-label="Time range" 
                selectedKey={timeRange} 
                onSelectionChange={(key) => setTimeRange(key as string)}
                variant="light"
                className="font-bold"
                classNames={{
                  tabList: "gap-1",
                  cursor: "bg-background shadow-md rounded-[10px]",
                  tab: "h-8 px-4",
                  tabContent: "font-black text-[12px]"
                }}
              >
                <Tab key="90d" title="季度" />
                <Tab key="30d" title="月度" />
                <Tab key="7d" title="周度" />
              </Tabs>
            </div>
            <Select 
              className="flex w-full sm:hidden"
              size="md"
              aria-label="Select a time range"
              selectedKeys={[timeRange]}
              onSelectionChange={(keys) => setTimeRange(Array.from(keys)[0] as string)}
            >
              <SelectItem key="90d">季度视图</SelectItem>
              <SelectItem key="30d">月度视图</SelectItem>
              <SelectItem key="7d">周度视图</SelectItem>
            </Select>
            <div className="hidden lg:flex items-center gap-2 ml-2 px-4 py-2 bg-success/10 text-success rounded-2xl border border-success/20 animate-in fade-in zoom-in duration-500">
              <IconTrendingUp size={16} stroke={3} />
              <span className="text-[12px] font-black">增长 12.5%</span>
            </div>
          </div>
        </div>

        <CardBody className="p-0 overflow-visible">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(var(--secondary))" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="oklch(var(--default-200) / 0.5)" strokeDasharray="8 8" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  minTickGap={32}
                  tick={{ fill: 'oklch(var(--default-400))', fontSize: 11, fontWeight: 700 }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <RechartsTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background/80 backdrop-blur-3xl p-4 rounded-3xl shadow-2xl border border-divider animate-in zoom-in duration-200">
                          <p className="text-[11px] font-black text-default-400 uppercase tracking-widest mb-2">{payload[0].payload.date}</p>
                          <div className="space-y-2">
                            {payload.map((entry, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-[13px] font-bold text-default-700">{entry.name === 'desktop' ? '桌面端' : '移动端'}:</span>
                                <span className="text-[13px] font-black text-default-900 ml-auto">{entry.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  name="mobile"
                  dataKey="mobile"
                  type="monotone"
                  fill="url(#fillMobile)"
                  stroke="oklch(var(--secondary))"
                  strokeWidth={4}
                  strokeLinecap="round"
                  stackId="a"
                />
                <Area
                  name="desktop"
                  dataKey="desktop"
                  type="monotone"
                  fill="url(#fillDesktop)"
                  stroke="oklch(var(--primary))"
                  strokeWidth={4}
                  strokeLinecap="round"
                  stackId="a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </div>
    </Card>
  )
}
