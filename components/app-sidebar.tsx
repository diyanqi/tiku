"use client"

import * as React from "react"
import {
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconListDetails,
  IconUsers,
  IconPlus,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Link, Drawer, DrawerContent, ScrollShadow } from "@heroui/react"

const data = {
  user: {
    name: "李老师",
    email: "teacher@example.com",
    avatar: "/avatars/teacher.jpg",
  },
  navMain: [
    {
      title: "首页",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "组织",
      url: "/alliances",
      icon: IconUsers,
    },
    {
      title: "学校",
      url: "/schools",
      icon: IconFolder,
    },
    {
      title: "考试",
      url: "/exams",
      icon: IconListDetails,
    },
    {
      title: "题目",
      url: "/questions",
      icon: IconDatabase,
    },
  ],
  documents: [
    {
      name: "高一月考数学卷",
      url: "/papers",
      icon: IconFileWord,
    },
    {
      name: "期中英语听力卷",
      url: "/papers",
      icon: IconFileWord,
    },
    {
      name: "七年级期末复习卷",
      url: "/papers",
      icon: IconFileWord,
    },
  ],
}

interface AppSidebarProps {
  isMobile?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AppSidebar({ isMobile, isOpen, onOpenChange }: AppSidebarProps) {
  const content = (
    <div className="flex flex-col h-full bg-background/60 backdrop-blur-3xl border-r border-divider/50 overflow-hidden shadow-2xl">
      <div className="h-20 flex items-center px-6 gap-3 mb-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-primary-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xl ring-1 ring-white/20">
            <IconDatabase size={24} stroke={2.5} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 tracking-tight leading-none">
            智慧题库
          </span>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1 opacity-80">
            Tiku System v3
          </span>
        </div>
      </div>
      
      <ScrollShadow className="flex-1 px-4 space-y-10 py-6" hideScrollBar>
        <NavMain items={data.navMain} />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <p className="text-[11px] font-bold text-default-400 uppercase tracking-widest pl-2">
                最新组卷
              </p>
              <Link href="/papers" className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors">
                <IconPlus size={16} stroke={3} />
              </Link>
          </div>
          <NavDocuments items={data.documents} />
        </div>
      </ScrollShadow>

      <div className="p-4 mt-auto">
        <div className="bg-default-100/50 rounded-2xl p-1 shadow-inner border border-divider/20">
          <NavUser user={data.user} />
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="xs" hideCloseButton>
        <DrawerContent className="p-0 bg-transparent shadow-none">
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <aside className="h-full w-full">
      {content}
    </aside>
  )
}

