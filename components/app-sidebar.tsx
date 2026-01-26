"use client"

import * as React from "react"
import {
  ClipboardList,
  Database,
  FileText,
  GalleryVerticalEnd,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "admin",
    email: "admin@tiku.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "试题库系统",
      logo: GalleryVerticalEnd,
      plan: "Management System",
    },
  ],
  navMain: [
    {
      title: "数据浏览",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "联盟查看",
          url: "/alliances",
        },
        {
          title: "学校浏览",
          url: "/schools",
        },
      ],
    },
    {
      title: "考试查询",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "考试详情",
          url: "/exams",
        },
        {
          title: "科目概览",
          url: "/subjects",
        },
      ],
    },
    {
      title: "题目库",
      url: "#",
      icon: Database,
      items: [
        {
          title: "试题检索",
          url: "/questions",
        },
        {
          title: "素材资源",
          url: "/media",
        },
      ],
    },
    {
      title: "组卷中心",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "我的组卷",
          url: "/papers",
        },
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
