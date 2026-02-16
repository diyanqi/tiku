"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { 
  Badge, 
  Button, 
  Checkbox, 
  Drawer, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  Input, 
  Select, 
  SelectItem, 
  Tabs, 
  Tab, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Divider, 
  useDisclosure, 
  Tooltip
} from "@heroui/react"
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip as RechartsTooltip } from "recharts"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="light"
      isIconOnly
      className="text-default-500 size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-default-500 size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          isSelected={table.getIsAllPageRowsSelected()}
          isIndeterminate={table.getIsSomePageRowsSelected()}
          onValueChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          isSelected={row.getIsSelected()}
          onValueChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="flat" className="text-default-500 px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="flat" className="text-default-500 px-1.5">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="fill-success" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Input
          className="h-8 w-16 text-right"
          variant="flat"
          size="sm"
          defaultValue={row.original.target}
          aria-label="Target"
        />
      </form>
    ),
  },
  {
    accessorKey: "limit",
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Input
          className="h-8 w-16 text-right"
          variant="flat"
          size="sm"
          defaultValue={row.original.limit}
          aria-label="Limit"
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer"

      if (isAssigned) {
        return row.original.reviewer
      }

      return (
        <Select
          aria-label="Assign reviewer"
          placeholder="Assign reviewer"
          size="sm"
          className="w-48"
        >
          <SelectItem key="Eddie Lake">Eddie Lake</SelectItem>
          <SelectItem key="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
        </Select>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            isIconOnly
            className="text-default-400 flex size-8"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action menu">
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="copy">Make a copy</DropdownItem>
          <DropdownItem key="favorite">Favorite</DropdownItem>
          <DropdownItem key="delete" color="danger" className="text-danger">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs
      variant="underlined"
      className="w-full flex-col justify-start gap-6"
    >
      <Tab
        key="outline"
        title={
          <div className="flex items-center space-x-2">
            <span>Outline</span>
          </div>
        }
      >
        <div className="flex items-center justify-between px-4 lg:px-6 mb-4">
          <div className="flex items-center gap-2">
            <Select
              className="w-48"
              size="sm"
              defaultSelectedKeys={["outline"]}
              aria-label="View selector"
            >
              <SelectItem key="outline">Outline</SelectItem>
              <SelectItem key="past-performance">Past Performance</SelectItem>
              <SelectItem key="key-personnel">Key Personnel</SelectItem>
              <SelectItem key="focus-documents">Focus Documents</SelectItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" size="sm" startContent={<IconLayoutColumns size={18} />}>
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown size={14} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Column visibility"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={new Set(table.getAllColumns().filter(c => c.getIsVisible()).map(c => c.id))}
                onSelectionChange={(keys) => {
                  const selectedIds = Array.from(keys) as string[]
                  table.getAllColumns().forEach(column => {
                    column.toggleVisibility(selectedIds.includes(column.id))
                  })
                }}
              >
                {table.getAllColumns()
                  .filter(column => typeof column.accessorFn !== "undefined" && column.getCanHide())
                  .map(column => (
                    <DropdownItem key={column.id} className="capitalize">
                      {column.id}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            <Button variant="solid" color="primary" size="sm" startContent={<IconPlus size={18} />}>
              <span className="hidden lg:inline">Add Section</span>
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
          <div className="overflow-hidden rounded-lg border border-default-200">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table aria-label="Sortable table" removeWrapper>
                <TableHeader className="bg-default-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    headerGroup.headers.map((header) => (
                      <TableColumn key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableColumn>
                    ))
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      {columns.map((_, i) => (
                        <TableCell key={i}>
                          {i === 0 ? "No results." : ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>
          <div className="flex items-center justify-between px-4 mt-4">
            <div className="text-default-400 hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <span className="text-sm font-medium">Rows per page</span>
                <Select
                  className="w-20"
                  size="sm"
                  selectedKeys={[`${table.getState().pagination.pageSize}`]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0]
                    table.setPageSize(Number(value))
                  }}
                  aria-label="Rows per page"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={`${pageSize}`} textValue={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="bordered"
                  isIconOnly
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronsLeft size={18} />
                </Button>
                <Button
                  variant="bordered"
                  isIconOnly
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <IconChevronLeft size={18} />
                </Button>
                <Button
                  variant="bordered"
                  isIconOnly
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronRight size={18} />
                </Button>
                <Button
                  variant="bordered"
                  isIconOnly
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <IconChevronsRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Tab>
      <Tab key="past-performance" title="Past Performance">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed border-default-300 px-4 lg:px-6"></div>
      </Tab>
      <Tab key="key-personnel" title="Key Personnel">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed border-default-300 px-4 lg:px-6"></div>
      </Tab>
      <Tab key="focus-documents" title="Focus Documents">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed border-default-300 px-4 lg:px-6"></div>
      </Tab>
    </Tabs>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button 
        variant="light" 
        onPress={onOpen}
        className="text-foreground w-fit px-0 text-left h-auto min-w-0"
      >
        {item.header}
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "bottom" : "right"}
        size={isMobile ? "full" : "md"}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{item.header}</h3>
                <p className="text-default-500 text-sm">
                  Showing total visitors for the last 6 months
                </p>
              </DrawerHeader>
              <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                {!isMobile && (
                  <>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{
                            left: 0,
                            right: 10,
                          }}
                        >
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                          />
                          <RechartsTooltip />
                          <Area
                            dataKey="mobile"
                            type="natural"
                            fill="var(--heroui-primary-200)"
                            fillOpacity={0.6}
                            stroke="var(--heroui-primary-300)"
                            stackId="a"
                          />
                          <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--heroui-primary-500)"
                            fillOpacity={0.4}
                            stroke="var(--heroui-primary-600)"
                            stackId="a"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <Divider />
                    <div className="grid gap-2">
                      <div className="flex gap-2 leading-none font-medium">
                        Trending up by 5.2% this month{" "}
                        <IconTrendingUp className="size-4" />
                      </div>
                      <div className="text-default-500">
                        Showing total visitors for the last 6 months. This is just
                        some random text to test the layout. It spans multiple lines
                        and should wrap around.
                      </div>
                    </div>
                    <Divider />
                  </>
                )}
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <Input label="Header" defaultValue={item.header} variant="bordered" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <Select label="Type" defaultSelectedKeys={[item.type]} variant="bordered">
                        <SelectItem key="Table of Contents">Table of Contents</SelectItem>
                        <SelectItem key="Executive Summary">Executive Summary</SelectItem>
                        <SelectItem key="Technical Approach">Technical Approach</SelectItem>
                        <SelectItem key="Design">Design</SelectItem>
                        <SelectItem key="Capabilities">Capabilities</SelectItem>
                        <SelectItem key="Focus Documents">Focus Documents</SelectItem>
                        <SelectItem key="Narrative">Narrative</SelectItem>
                        <SelectItem key="Cover Page">Cover Page</SelectItem>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Select label="Status" defaultSelectedKeys={[item.status]} variant="bordered">
                        <SelectItem key="Done">Done</SelectItem>
                        <SelectItem key="In Progress">In Progress</SelectItem>
                        <SelectItem key="Not Started">Not Started</SelectItem>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <Input label="Target" defaultValue={item.target} variant="bordered" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Input label="Limit" defaultValue={item.limit} variant="bordered" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Select label="Reviewer" defaultSelectedKeys={[item.reviewer]} variant="bordered">
                      <SelectItem key="Eddie Lake">Eddie Lake</SelectItem>
                      <SelectItem key="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                      <SelectItem key="Emily Whalen">Emily Whalen</SelectItem>
                    </Select>
                  </div>
                </form>
              </div>
              <DrawerFooter>
                <Button color="primary" onPress={onClose}>Submit</Button>
                <Button variant="flat" onPress={onClose}>Cancel</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

