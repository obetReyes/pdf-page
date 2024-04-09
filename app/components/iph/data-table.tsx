
import * as React from "react"
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

  Button,
  Input
} from "../ui"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    date:"1/4/2024",
    hour: "8:24 am",
    location: "Col.Miranda mzna 11 lte 30, 23477 Cabo San Lucas, B.C.S.",
  },
  {
    id: "3u1reuv4",
    date:"12/6/2023",
    hour: "12:26 pm",
    location: "Aguajitos, Arcos del Sol II, Colonia El Progreso, 23477 Cabo San Lucas, B.C.S.",
  },
  {
    id: "derv1ws0",
    date:"10/21/2023",
    hour: "6:25 am",
    location: "Calle Sin Nombre SN, Rancho San Angel, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "5kma53ae",
    date:"8/1/2023",
    hour: "2:32 pm",
    location: "Cam. al Tezal, La Cima Residencial, 23454 El Tezal, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  },
  {
    id: "bhqecj4p",
    date:"5/12/2023",
    hour: "12:05 pm",
    location: "Avenida Cotero Villa Fuego El Tezal, 23454 Cabo San Lucas, B.C.S.",
  }

]

export type Payment = {
  id: string
  date: string
  hour:string
  location: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: () => {
      return (
        <div>
          Fecha
        </div>
       
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,

  },
  {
  accessorKey: "hour",
  header: () => <div>Hora</div>,
  cell: ({ row }) => <div className="lowercase">{row.getValue("hour")}</div>,
  },
  {
  accessorKey: "location",
  header: "Ubicación",
  cell: ({ row }) => <div className="lowercase">{row.getValue("location")}</div>,
  },
  {
  id: "operaciones",
  enableHiding: false,
  cell: ({ row }) => {
  const payment = row.original
  
  return (
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="ghost" className="h-8 w-8 p-0">
  <span className="sr-only">abrir menu</span>
  <DotsHorizontalIcon className="h-4 w-4" />
  </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
  <DropdownMenuLabel className="bg-slate-800 text-white">Operaciones</DropdownMenuLabel>
  <DropdownMenuItem
  onClick={() => navigator.clipboard.writeText(payment.id)}
  >
  Descargar
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem>ir al IPH</DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
  )
  },
  },
  ]

export function DataTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="w-full  lg:px-12 lg:py-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="buscar por fecha"
          value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("date")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                className=" odd:bg-slate-300 hover:text-black"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
            No has creado ningún IPH
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
       
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
                      Anterior
            
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
