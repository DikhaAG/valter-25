"use client";
import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { ParticipantTable } from "@/models/web-design/table";
import {
   ColumnDef,
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   Row,
   SortingState,
   useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { KonfirmasiTimDialog } from "./konfirmasi-alert-dialog";
import { HapusTimAlertDialog } from "./hapus-alert-dialog";
import { authClient } from "@/lib/auth-client";

const pesertaColumn: ColumnDef<ParticipantTable>[] = [
   {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }: { row: Row<ParticipantTable> }) => (
         <div className="capitalize">{row.original.nama}</div>
      ),
   },
   {
      accessorKey: "npm",
      header: "NPM",
      cell: ({ row }: { row: Row<ParticipantTable> }) => (
         <div className="lowercase">{row.original.npm}</div>
      ),
   },
];

export function TimTableViewer({
   namaTim,
   peserta,
   idTim,
   terkonfirmasi,
}: {
   namaTim: string;
   peserta: ParticipantTable[];
   idTim: string;
   terkonfirmasi: boolean;
}) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const session = authClient.useSession();
   const table = useReactTable({
      data: peserta,
      columns: pesertaColumn,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         sorting,
         columnFilters,
      },
   });

   const isMobile = useIsMobile();

   return (
      <div className="">
         {peserta ? (
            <Drawer direction={isMobile ? "bottom" : "right"}>
               <DrawerTrigger asChild>
                  <Button
                     variant="link"
                     className="text-foreground w-fit px-0 text-left"
                  >
                     {namaTim}
                  </Button>
               </DrawerTrigger>
               <DrawerContent>
                  <DrawerHeader className="gap-1">
                     <DrawerTitle>{namaTim}</DrawerTitle>
                     <DrawerDescription></DrawerDescription>
                     <div className="flex items-center py-4">
                        <Input
                           placeholder="Cari nama..."
                           value={
                              (table
                                 .getColumn("nama")
                                 ?.getFilterValue() as string) ?? ""
                           }
                           onChange={(event) =>
                              table
                                 .getColumn("nama")
                                 ?.setFilterValue(event.target.value)
                           }
                           className="max-w-sm"
                        />
                     </div>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
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
                                                  header.column.columnDef
                                                     .header,
                                                  header.getContext()
                                               )}
                                       </TableHead>
                                    );
                                 })}
                              </TableRow>
                           ))}
                        </TableHeader>
                        <TableBody>
                           {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                 <TableRow
                                    key={row.id}
                                    data-state={
                                       row.getIsSelected() && "selected"
                                    }
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
                                    colSpan={pesertaColumn.length}
                                    className="h-24 text-center"
                                 >
                                    No results.
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                  </div>
                  <DrawerFooter>
                     <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => table.previousPage()}
                           disabled={!table.getCanPreviousPage()}
                        >
                           Previous
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => table.nextPage()}
                           disabled={!table.getCanNextPage()}
                        >
                           Next
                        </Button>
                     </div>
                     {(session.data?.user.divisi === "superadmin" ||
                        session.data?.user.divisi === "bph") && (
                        <>
                           {!terkonfirmasi && (
                              <Button asChild>
                                 <KonfirmasiTimDialog id={idTim} />
                              </Button>
                           )}
                           <Button asChild>
                              <HapusTimAlertDialog id={idTim} />
                           </Button>
                        </>
                     )}
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         ) : (
            <span>Tidak ada data.</span>
         )}
      </div>
   );
}
