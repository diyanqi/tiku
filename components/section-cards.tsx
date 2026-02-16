"use client"

import { IconTrendingDown, IconTrendingUp, IconChartBar, IconUsers, IconHeartRateMonitor, IconBolt } from "@tabler/icons-react"
import { Card, Chip } from "@heroui/react"

export function SectionCards() {
  const cards = [
    {
      title: "累计营收",
      value: "¥12,850.00",
      trend: "+12.5%",
      trendType: "up",
      footerTitle: "本月持续攀升",
      footerDesc: "近6个月稳健增长",
      icon: IconChartBar,
      color: "primary"
    },
    {
      title: "新增盟友",
      value: "1,234",
      trend: "-8.2%",
      trendType: "down",
      footerTitle: "波动期关注",
      footerDesc: "拉新策略需优化",
      icon: IconUsers,
      color: "secondary"
    },
    {
      title: "活跃试卷",
      value: "45,678",
      trend: "+24.2%",
      trendType: "up",
      footerTitle: "使用率极高",
      footerDesc: "超出预期目标",
      icon: IconHeartRateMonitor,
      color: "success"
    },
    {
      title: "增长速率",
      value: "8.4%",
      trend: "+4.5%",
      trendType: "up",
      footerTitle: "稳健的性能提升",
      footerDesc: "符合增长预期",
      icon: IconBolt,
      color: "warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="group relative overflow-hidden p-6 rounded-[2.5rem] border-0 bg-default-50/50 hover:bg-default-100/50 transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
          isPressable
        >
          {/* Background Gradient Blob */}
          <div className={`absolute -right-4 -top-4 size-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-${card.color}`} />
          
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl bg-${card.color}/10 text-${card.color} group-hover:scale-110 transition-transform duration-500`}>
                <card.icon size={24} stroke={2.5} />
              </div>
              <Chip
                variant="flat"
                color={card.trendType === "up" ? "success" : "danger"}
                startContent={card.trendType === "up" ? <IconTrendingUp size={14} stroke={3} /> : <IconTrendingDown size={14} stroke={3} />}
                className="font-black border-transparent"
                size="sm"
              >
                {card.trend}
              </Chip>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-black text-default-400 uppercase tracking-widest">{card.title}</p>
              <h4 className="text-3xl font-black tabular-nums tracking-tighter text-default-800">
                {card.value}
              </h4>
            </div>

            <div className="pt-2 border-t border-default-200/50">
              <div className="flex items-center gap-2">
                <span className={`text-[12px] font-bold text-${card.color} whitespace-nowrap`}>
                  {card.footerTitle}
                </span>
                <span className="text-[11px] font-medium text-default-400 truncate opacity-60">
                  {card.footerDesc}
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative Corner Element */}
          <div className="absolute bottom-[-10px] right-[-10px] size-12 bg-default-200/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        </Card>
      ))}
    </div>
  )
}
