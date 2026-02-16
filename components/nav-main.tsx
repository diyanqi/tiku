"use client"

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"
import { Button, Tooltip, ListBox } from "@heroui/react"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  const selectedKey = items.find(item => pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url)))?.title || ""

  return (
    <div className="flex flex-col gap-6">
      <div className="px-2">
        <Tooltip 
          content="一键开启组卷流程" 
          placement="right" 
          offset={10} 
          showArrow
          classNames={{
            content: "bg-primary text-primary-foreground font-bold rounded-lg px-3 py-2 shadow-xl"
          }}
        >
          <Button
            color="primary"
            variant="shadow"
            className="w-full justify-start font-bold h-12 rounded-2xl group relative overflow-hidden active:scale-95 transition-all"
            startContent={
              <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                <IconCirclePlusFilled size={20} stroke={2} />
              </div>
            }
            size="lg"
            as="a"
            href="/papers"
          >
            <span className="ml-1 tracking-wide">快速组卷</span>
            <div className="absolute right-[-10px] top-[-10px] size-10 bg-white/10 blur-xl group-hover:bg-white/20 transition-all rounded-full" />
          </Button>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-2">
        <p className="px-4 text-[10px] font-black text-default-400 uppercase tracking-[0.2em] mb-1">
          主路
        </p>
        <ListBox
          aria-label="Main Navigation"
          className="p-0 gap-1"
          variant="flat"
          selectedKeys={new Set([selectedKey])}
          selectionMode="single"
        >
          {items.map((item) => (
            <ListBox.Item
              key={item.title}
              id={item.title}
              textValue={item.title}
              href={item.url}
              className={`group h-11 px-4 rounded-xl transition-all duration-300 ${
                selectedKey === item.title 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-default-600 hover:bg-default-100/80"
              }`}
            >
              <div className="flex items-center gap-3.5 w-full h-full text-inherit">
                {item.icon && (
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                    selectedKey === item.title ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-default-100 text-default-400 group-hover:bg-default-200 group-hover:text-default-600"
                  }`}>
                    <item.icon 
                      size={18} 
                      stroke={selectedKey === item.title ? 2.5 : 2}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
                <span className={`text-[13px] tracking-wide transition-all ${selectedKey === item.title ? "font-bold" : "font-medium opacity-80 group-hover:opacity-100"}`}>
                  {item.title}
                </span>
                {selectedKey === item.title && (
                  <div className="ml-auto flex size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] animate-pulse" />
                )}
              </div>
            </ListBox.Item>
          ))}
        </ListBox>
      </div>
    </div>
  )
}

