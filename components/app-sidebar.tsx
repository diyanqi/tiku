"use client"

import * as React from "react"
import {
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
                <a href="#">
                <IconDatabase className="!size-5" />
                <span className="text-base font-semibold">智慧题库</span>
                </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
