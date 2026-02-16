"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  IconExternalLink,
  type Icon,
} from "@tabler/icons-react"

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ListBox,
} from "@heroui/react"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {
  return (
    <div className="flex flex-col gap-2 mt-4 transition-all duration-500">
      <div className="flex items-center justify-between px-4 mb-2">
        <p className="text-[10px] font-black text-default-400 uppercase tracking-[0.2em]">
          最近档案
        </p>
        <div className="size-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_var(--success)]" />
      </div>

      <ListBox
        aria-label="Documents Navigation"
        className="p-0 gap-1"
        variant="flat"
      >
        {items.map((item) => (
          <ListBox.Item
            key={item.name}
            id={item.name}
            textValue={item.name}
            href={item.url}
            className="group h-11 px-4 rounded-xl transition-all duration-300 data-[hover=true]:bg-default-100/50"
            endContent={
              <Dropdown 
                backdrop="blur" 
                classNames={{
                  content: "min-w-[160px] p-2 border-0 shadow-2xl bg-background/80 backdrop-blur-3xl rounded-2xl"
                }}
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="opacity-0 group-hover:opacity-100 transition-all min-w-8 w-8 h-8 rounded-lg hover:bg-default-200"
                  >
                    <IconDots size={16} className="text-default-400 group-hover:text-default-600" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Document actions"
                  itemClasses={{
                    base: "rounded-xl h-10 px-3",
                    title: "text-[13px] font-bold tracking-tight"
                  }}
                >
                  <DropdownItem key="open" startContent={<IconExternalLink size={18} stroke={2} className="text-primary" />}>
                    立即打开
                  </DropdownItem>
                  <DropdownItem key="share" startContent={<IconShare3 size={18} stroke={2} className="text-secondary" />}>
                    分享链接
                  </DropdownItem>
                  <DropdownItem 
                    key="delete" 
                    className="text-danger data-[hover=true]:bg-danger/10" 
                    startContent={<IconTrash size={18} stroke={2} />}
                  >
                    移至回收站
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
          >
            <div className="flex items-center gap-3 w-full h-full text-inherit">
              <div className="p-1.5 rounded-lg bg-default-100 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                <item.icon 
                  size={16} 
                  stroke={2} 
                />
              </div>
              <span className="text-[13px] font-bold text-default-600 group-hover:text-default-900 truncate tracking-tight transition-colors">
                {item.name}
              </span>
            </div>
          </ListBox.Item>
        ))}
        
        <ListBox.Item
          key="more"
          href="/alliances" // Just a dummy link
          className="group h-11 px-4 rounded-xl transition-all duration-300 data-[hover=true]:bg-primary/5"
        >
          <div className="flex items-center gap-3 w-full h-full">
            <div className="p-1.5 rounded-lg bg-default-50 text-default-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <IconDots size={16} stroke={3} />
            </div>
            <span className="text-[12px] font-black text-default-400 group-hover:text-primary tracking-widest uppercase truncate transition-all">
              管理全部档案
            </span>
          </div>
        </ListBox.Item>
      </ListBox>
    </div>
  )
}

