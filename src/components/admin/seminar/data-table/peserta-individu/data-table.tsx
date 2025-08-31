"use client";

import * as React from "react";
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
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
   arrayMove,
   SortableContext,
   useSortable,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
   IconChevronDown,
   IconChevronLeft,
   IconChevronRight,
   IconChevronsLeft,
   IconChevronsRight,
   IconLayoutColumns,
} from "@tabler/icons-react";
import {
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   Row,
   SortingState,
   useReactTable,
   VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ParticipantTable } from "@/models/seminar/table";
import { Input } from "@/components/ui/input";
import { pesertaIndividuSeminarColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { getPesertaIndividuSeminar } from "@/server/actions/queries/seminar";

function DraggableRow({ row }: { row: Row<ParticipantTable> }) {
   const { transform, transition, setNodeRef, isDragging } = useSortable({
      id: row.original.id!,
   });
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
   );
}

export function PesertaIndividuDataTable() {
   const [initialData, setInitialData] = React.useState<
      ParticipantTable[] | undefined
   >();

   const [rowSelection, setRowSelection] = React.useState({});
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 10,
   });
   const sortableId = React.useId();
   const sensors = useSensors(
      useSensor(MouseSensor, {}),
      useSensor(TouchSensor, {}),
      useSensor(KeyboardSensor, {})
   );

   const dataIds = React.useMemo<UniqueIdentifier[]>(
      () => initialData?.map(({ id }) => id!) || [],
      [initialData]
   );

   const table = useReactTable({
      data: initialData ? initialData : [],
      columns: pesertaIndividuSeminarColumns,
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
         pagination,
      },
      getRowId: (row) => row.id!.toString(),
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
   });

   function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
         setInitialData((data) => {
            const oldIndex = dataIds.indexOf(active.id);
            const newIndex = dataIds.indexOf(over.id);
            return arrayMove(data!, oldIndex, newIndex);
         });
      }
   }

   React.useEffect(() => {
      getPesertaIndividuSeminar({revPath: "/admin/seminar"}).then((res) => {
         if (res.success) {
            setInitialData(res.data!);
         }
      });
   }, []);

   return (
      <>
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                     <IconLayoutColumns />
                     <span className="hidden lg:inline">Filter Kolom</span>
                     <span className="lg:hidden">Kolom</span>
                     <IconChevronDown />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-56">
                  {table
                     .getAllColumns()
                     .filter(
                        (column) =>
                           typeof column.accessorFn !== "undefined" &&
                           column.getCanHide()
                     )
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="flex items-center py-4">
            <Input
               placeholder="Cari peserta..."
               value={
                  (table.getColumn("nama")?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn("nama")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
         </div>
         <div className="overflow-hidden rounded-lg border">
            <DndContext
               collisionDetection={closestCenter}
               modifiers={[restrictToVerticalAxis]}
               onDragEnd={handleDragEnd}
               sensors={sensors}
               id={sortableId}
            >
               <Table>
                  <TableHeader className="bg-muted sticky top-0 z-10">
                     {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                           {headerGroup.headers.map((header) => {
                              return (
                                 <TableHead
                                    key={header.id}
                                    colSpan={header.colSpan}
                                 >
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                         )}
                                 </TableHead>
                              );
                           })}
                        </TableRow>
                     ))}
                  </TableHeader>
                  <TableBody className="**:data-[slot=table-cell]:first:w-8">
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
                           <TableCell
                              colSpan={pesertaIndividuSeminarColumns.length}
                              className="h-24 text-center"
                           >
                              {/* No results. */}
                              <div className="flex flex-col space-y-3">
                                 <Skeleton className="bg-muted-foreground/30 h-[50px] w-full" />
                                 <Skeleton className="bg-muted-foreground/30 h-[30px] w-full" />
                              </div>
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </DndContext>
         </div>
         <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
               {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
               <div className="hidden items-center gap-2 lg:flex">
                  <Label
                     htmlFor="rows-per-page"
                     className="text-sm font-medium"
                  >
                     Rows per page
                  </Label>
                  <Select
                     value={`${table.getState().pagination.pageSize}`}
                     onValueChange={(value) => {
                        table.setPageSize(Number(value));
                     }}
                  >
                     <SelectTrigger
                        size="sm"
                        className="w-20"
                        id="rows-per-page"
                     >
                        <SelectValue
                           placeholder={table.getState().pagination.pageSize}
                        />
                     </SelectTrigger>
                     <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                           <SelectItem key={pageSize} value={`${pageSize}`}>
                              {pageSize}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex w-fit items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
               </div>
               <div className="ml-auto flex items-center gap-2 lg:ml-0">
                  <Button
                     variant="outline"
                     className="hidden h-8 w-8 p-0 lg:flex"
                     onClick={() => table.setPageIndex(0)}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Go to first page</span>
                     <IconChevronsLeft />
                  </Button>
                  <Button
                     variant="outline"
                     className="size-8"
                     size="icon"
                     onClick={() => table.previousPage()}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Go to previous page</span>
                     <IconChevronLeft />
                  </Button>
                  <Button
                     variant="outline"
                     className="size-8"
                     size="icon"
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Go to next page</span>
                     <IconChevronRight />
                  </Button>
                  <Button
                     variant="outline"
                     className="hidden size-8 lg:flex"
                     size="icon"
                     onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                     }
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Go to last page</span>
                     <IconChevronsRight />
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
}
