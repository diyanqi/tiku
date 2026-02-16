"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"
import { ListBox, Link } from "@heroui/react"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className="px-2">
      <ListBox
        aria-label="Secondary Navigation"
        className="p-0 gap-1"
        variant="flat"
      >
        {items.map((item) => (
          <ListBox.Item
            key={item.title}
            className="h-10 px-3 rounded-xl text-default-500 hover:text-primary transition-all duration-200"
            textValue={item.title}
          >
            <Link
              href={item.url}
              className="flex items-center gap-3 w-full h-full text-inherit no-underline"
            >
              <item.icon size={18} stroke={2} className="opacity-70 group-hover:opacity-100" />
              <span className="text-sm font-semibold tracking-wide">{item.title}</span>
            </Link>
          </ListBox.Item>
        ))}
      </ListBox>
    </div>
  )
}

