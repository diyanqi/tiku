"use client"

import * as React from "react"
import { IconSelector, IconPlus, IconExternalLink } from "@tabler/icons-react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@heroui/react"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <Dropdown
        placement="bottom-start"
        backdrop="blur"
        classNames={{
          content: "min-w-[260px] p-2 border-0 shadow-2xl bg-background/80 backdrop-blur-3xl rounded-3xl",
        }}
      >
        <DropdownTrigger>
          <Button
            variant="light"
            className="w-full h-16 justify-between p-2 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 text-white shadow-xl backdrop-blur-md border border-white/20 group-hover:scale-105 transition-transform duration-500">
                <activeTeam.logo size={activeTeam.name === "题库联盟" ? 22 : 20} stroke={2.5} />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-[14px] font-black text-white tracking-tight truncate leading-tight">
                  {activeTeam.name}
                </p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.1em] truncate">
                  {activeTeam.plan}
                </p>
              </div>
            </div>
            <IconSelector size={16} stroke={2.5} className="text-white/40 group-hover:text-white/80 transition-colors shrink-0" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Team switcher" 
          variant="flat"
          onAction={(key) => {
            if (key === "add-team") return;
            const team = teams.find(t => t.name === key);
            if (team) setActiveTeam(team);
          }}
          itemClasses={{
            base: "rounded-xl h-14 px-3 gap-3",
            title: "text-[14px] font-black text-default-800",
            description: "text-[11px] font-medium text-default-400"
          }}
        >
          <DropdownSection 
            title="选择工作空间" 
            classNames={{ heading: "text-[10px] font-black uppercase tracking-[0.2em] text-default-400 p-2" }}
          >
            {teams.map((team) => (
              <DropdownItem
                key={team.name}
                id={team.name}
                textValue={team.name}
                description={team.plan}
                startContent={
                  <div className={`flex size-9 items-center justify-center rounded-lg shadow-sm border border-divider transition-all group-hover:scale-110 ${activeTeam.name === team.name ? "bg-primary text-white" : "bg-default-50 text-default-500"}`}>
                    <team.logo size={18} stroke={2} />
                  </div>
                }
                endContent={activeTeam.name === team.name && (
                  <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
                )}
              >
                {team.name}
              </DropdownItem>
            ))}
          </DropdownSection>
          
          <DropdownSection>
            <DropdownItem 
              key="add-team" 
              className="h-12 bg-primary/5 data-[hover=true]:bg-primary/10"
              startContent={
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
                  <IconPlus size={18} stroke={3} />
                </div>
              }
              endContent={<IconExternalLink size={14} className="text-primary/40" />}
            >
              <span className="font-black text-primary tracking-tight">创建新联盟</span>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
