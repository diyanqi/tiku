"use client"

import {
  IconFolder,
  IconShare3,
  IconDots,
  IconTrash,
  IconLayoutGrid,
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

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: Icon | any
  }[]
}) {
  return (
    <div className="flex flex-col gap-2 mt-4 px-2">
      <div className="flex items-center justify-between px-2 mb-2">
        <p className="text-[10px] font-black text-default-400 uppercase tracking-[0.2em]">
          联盟项目
        </p>
        <IconLayoutGrid size={12} className="text-default-300" />
      </div>

      <ListBox
        aria-label="Projects Navigation"
        className="p-0 gap-1"
        variant="flat"
      >
        {projects.map((item) => (
          <ListBox.Item
            key={item.name}
            id={item.name}
            textValue={item.name}
            href={item.url}
            className="group h-11 px-3 rounded-xl transition-all duration-300 data-[hover=true]:bg-secondary/5"
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
                    className="opacity-0 group-hover:opacity-100 transition-all min-w-8 w-8 h-8 rounded-lg"
                  >
                    <IconDots size={16} className="text-default-400 group-hover:text-default-600" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Project actions"
                  itemClasses={{
                    base: "rounded-xl h-10 px-3",
                    title: "text-[13px] font-bold tracking-tight"
                  }}
                >
                  <DropdownItem key="view" startContent={<IconFolder size={18} stroke={2} className="text-secondary" />}>
                    查看项目
                  </DropdownItem>
                  <DropdownItem key="share" startContent={<IconShare3 size={18} stroke={2} className="text-primary" />}>
                    分享权限
                  </DropdownItem>
                  <DropdownItem 
                    key="delete" 
                    className="text-danger" 
                    startContent={<IconTrash size={18} stroke={2} />}
                  >
                    移出空间
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
          >
            <div className="flex items-center gap-3 w-full h-full text-inherit">
              <div className="p-1.5 rounded-lg bg-default-100 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
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
      </ListBox>
    </div>
  )
}

