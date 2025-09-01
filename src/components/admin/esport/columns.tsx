import { createColumnHelper } from "@tanstack/react-table";
import { TimTableViewer } from "./tim-table-viewer";
import { ClassRegistrationTable } from "@/models/pelatihan/table";
import { formatIDRCurrency } from "@/utils/formatIDRCurrency";
import { Button } from "@/components/ui/button";
import {
   IconCircleCheckFilled,
   IconDotsVertical,
   IconGripVertical,
   IconLoader,
} from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KonfirmasiTimDialog } from "./konfirmasi-alert-dialog";
import { BuktiPembayaranImageDialog } from "./bukti-pembayaran-dialog";
import { formatTimestamp } from "@/utils/format-timestamp";
import { HapusTimAlertDialog } from "./hapus-alert-dialog";
import { authClient } from "@/lib/auth-client";
import { TeamTable } from "@/models/esport/table";

// Create a separate component for the drag handle
export function DragHandle({ id }: { id: string }) {
   const { attributes, listeners } = useSortable({
      id,
   });

   return (
      <Button
         {...attributes}
         {...listeners}
         variant="ghost"
         size="icon"
         className="text-muted-foreground size-7 hover:bg-transparent"
      >
         <IconGripVertical className="text-muted-foreground size-3" />
         <span className="sr-only">Drag to reorder</span>
      </Button>
   );
}

// Inisialisasi columnHelper dengan tipe data baris
const columnHelper = createColumnHelper<TeamTable>();

export const timColumns = [
   columnHelper.display({
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id!} />,
   }),
   columnHelper.accessor("namaTim", {
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Nama Tim
               <ArrowUpDown />
            </Button>
         );
      },
      cell: ({ row }) => {
         return (
            <TimTableViewer
               namaTim={row.original.namaTim}
               peserta={row.original.peserta}
               idTim={row.original.id!}
               terkonfirmasi={row.original.statusPembayaran}
            />
         );
      },
      enableHiding: false,
   }),
   columnHelper.accessor("statusPembayaran", {
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Status
               <ArrowUpDown />
            </Button>
         );
      },
      cell: ({ row }) => (
         <Badge
            variant="outline"
            className={`${
               row.original.statusPembayaran
                  ? "text-background bg-green-500"
                  : "text-foreground bg-yellow-400 "
            } px-1.5`}
         >
            {row.original.statusPembayaran ? (
               <IconCircleCheckFilled />
            ) : (
               <IconLoader />
            )}
            {row.original.statusPembayaran
               ? "Terkonfirmasi"
               : "Belum dikonfirmasi"}
         </Badge>
      ),
   }),
   columnHelper.accessor("as", {
      header: "Sebagai",
      cell: ({ row }) => <div>{row.original.as}</div>,
   }),
   columnHelper.accessor("noWa", {
      header: "WA",
      cell: ({ row }) => <div>{row.original.noWa}</div>,
   }),
   columnHelper.accessor("instansi", {
      header: "Instansi",
      cell: ({ row }) => <div>{row.original.instansi}</div>,
   }),
   columnHelper.accessor("createdat", {
      header: "Dibuat",
      cell: ({ row }) => <div>{formatTimestamp(row.original.createdat)}</div>,
   }),
   columnHelper.accessor("tanggalKonfirmasi", {
      header: "Dikonfirmasi",
      cell: ({ row }) => (
         <div>
            {(row.original.tanggalKonfirmasi as string)
               ? formatTimestamp(row.original.tanggalKonfirmasi as string)
               : "-"}
         </div>
      ),
   }),
   columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
         const session = authClient.useSession();
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                     size="icon"
                  >
                     <IconDotsVertical />
                     <span className="sr-only">Open menu</span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="p-2 space-y-1">
                  <DropdownMenuItem variant="default" asChild>
                     <BuktiPembayaranImageDialog
                        imageUrl={row.original.buktiPembayaran}
                        altText={row.original.namaTim}
                     />
                  </DropdownMenuItem>
                  {(session.data?.user.divisi === "superadmin" ||
                     session.data?.user.divisi === "bph") && (
                     <>
                        <DropdownMenuSeparator />
                        {!row.original.statusPembayaran && (
                           <DropdownMenuItem variant="default" asChild>
                              <KonfirmasiTimDialog id={row.original.id!} />
                           </DropdownMenuItem>
                        )}
                        <DropdownMenuItem variant="default" asChild>
                           <HapusTimAlertDialog id={row.original.id!} />
                        </DropdownMenuItem>
                     </>
                  )}
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   }),
];
