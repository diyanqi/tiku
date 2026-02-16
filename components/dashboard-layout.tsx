"use client"

import { Breadcrumbs, BreadcrumbItem, Button, Divider, useDisclosure } from "@heroui/react"
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "@/components/app-sidebar"
import React from "react"

export default function DashboardLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode
  breadcrumb: { label: string; href?: string }[]
}) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure({ defaultOpen: true })

  return (
    <div className="flex min-h-svh w-full bg-background selection:bg-primary selection:text-white">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col border-r border-divider/50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isOpen ? 'w-[280px]' : 'w-0 border-none'}`}>
        <AppSidebar isMobile={false} />
      </div>

      <div className="flex flex-1 flex-col transition-all duration-300 relative">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-divider/50 bg-background/40 backdrop-blur-3xl sticky top-0 z-30 transition-shadow duration-300">
          <div className="flex flex-1 items-center gap-4 px-6">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={isOpen ? onClose : onOpen}
              className="bg-default-100/50 hover:bg-default-200/50 rounded-xl transition-all active:scale-95"
            >
              {isOpen ? (
                <IconLayoutSidebarLeftCollapse size={18} stroke={2.5} className="text-default-600" />
              ) : (
                <IconLayoutSidebarLeftExpand size={18} stroke={2.5} className="text-default-600" />
              )}
            </Button>
            <Divider orientation="vertical" className="h-5 opacity-50" />
            <Breadcrumbs 
              variant="flat" 
              underline="hover" 
              itemClasses={{
                item: "text-[13px] font-bold text-default-600 data-[current=true]:text-primary transition-colors",
                separator: "text-default-400 font-black px-2 text-[10px]"
              }}
            >
              <BreadcrumbItem href="/">学习中心</BreadcrumbItem>
              {breadcrumb.map((item) => (
                <BreadcrumbItem key={item.label} href={item.href}>
                  {item.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          <div className="ml-auto pr-6 flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <AppSidebar isMobile={true} isOpen={!isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}
