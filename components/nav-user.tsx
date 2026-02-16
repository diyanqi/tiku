"use client"

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Button,
} from "@heroui/react"
import {
  IconSettings,
  IconBell,
  IconLogout,
  IconCreditCard,
  IconChevronRight,
  IconUserCircle,
} from "@tabler/icons-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  return (
    <div className="flex flex-col px-2">
      <Dropdown
        placement="top-end"
        backdrop="blur"
        classNames={{
          content: "min-w-[240px] p-2 border-0 shadow-2xl bg-background/80 backdrop-blur-3xl",
        }}
      >
        <DropdownTrigger>
          <Button
            variant="light"
            className="w-full h-16 justify-between p-2 rounded-2xl hover:bg-default-100/80 transition-all border border-transparent hover:border-default-200/50"
          >
            <User
              name={user.name}
              description={user.email}
              avatarProps={{
                src: user.avatar,
                size: "sm",
                className: "ring-2 ring-primary/20 p-0.5",
              }}
              classNames={{
                name: "text-[13px] font-black tracking-tight",
                description: "text-[11px] font-medium opacity-60",
              }}
            />
            <IconChevronRight
              size={14}
              stroke={3}
              className="text-default-400 group-hover:text-default-600 transition-transform -rotate-90 group-data-[open=true]:rotate-0"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="User actions" 
          variant="flat"
          itemClasses={{
            base: [
              "rounded-xl",
              "text-default-700",
              "transition-all",
              "duration-200",
              "data-[hover=true]:bg-default-100",
              "data-[hover=true]:text-default-950",
              "h-10",
              "px-3"
            ],
            title: "text-[13px] font-bold tracking-tight",
          }}
        >
          <DropdownSection showDivider>
            <DropdownItem
              key="profile"
              startContent={<IconUserCircle size={18} stroke={2} className="text-primary" />}
            >
              个人中心
            </DropdownItem>
            <DropdownItem
              key="subscription"
              startContent={<IconCreditCard size={18} stroke={2} className="text-secondary" />}
            >
              我的订阅
            </DropdownItem>
          </DropdownSection>
          
          <DropdownSection showDivider>
            <DropdownItem
              key="notifications"
              startContent={<IconBell size={18} stroke={2} className="text-warning" />}
            >
              通知中心
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<IconSettings size={18} stroke={2} className="text-default-500" />}
            >
              系统设置
            </DropdownItem>
          </DropdownSection>

          <DropdownItem
            key="logout"
            className="text-danger data-[hover=true]:bg-danger/10 data-[hover=true]:text-danger font-black"
            startContent={<IconLogout size={18} stroke={3} />}
          >
            退出登录
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

