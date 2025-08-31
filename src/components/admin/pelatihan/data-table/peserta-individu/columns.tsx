import { createColumnHelper } from "@tanstack/react-table";
import { ParticipantTable } from "@/models/pelatihan/table";
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
import { BuktiPembayaranImageDialog } from "../../bukti-pembayaran-dialog";
import { formatTimestamp } from "@/utils/format-timestamp";
import { authClient } from "@/lib/auth-client";
import { HapusPesertaIndividuAlertDialog } from "./hapus-alert-dialog";
import { KonfirmasiPesertaIndividuAlertDialog } from "./konfirmasi-alert-dialog";

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
const columnHelper = createColumnHelper<ParticipantTable>();

export const pesertaIndividuPelatihanColumns = [
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id!} />,
  }),
  columnHelper.accessor("nama", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Nama
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{row.original.nama}</div>
      );
    },
    enableHiding: false,
  }),

  columnHelper.accessor("as", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Sebagai
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{row.original.as}</div>
      );
    },
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
        className={`${row.original.statusPembayaran
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

  columnHelper.accessor("npm", {
    header: "NPM",
    cell: ({ row }) => <div>{row.original.npm}</div>,
  }),
  columnHelper.accessor("noWa", {
    header: "Whatsapp",
    cell: ({ row }) => <div>{row.original.noWa}</div>,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  }),
  columnHelper.accessor("instansi", {
    header: "Instansi",
    cell: ({ row }) => <div>{row.original.instansi}</div>,
  }),
  columnHelper.accessor("domisili", {
    header: "Domisili",
    cell: ({ row }) => <div>{row.original.domisili}</div>,
  }),


  columnHelper.accessor("createdat", {
    header: "Dibuat",
    cell: ({ row }) => <div>{formatTimestamp(row.original.createdat)}</div>,
  }),
  columnHelper.accessor("tanggalKonfirmasi", {
    header: "Dikonfirmasi",
    cell: ({ row }) => <div>{row.original.tanggalKonfirmasi ? formatTimestamp(row.original.tanggalKonfirmasi) : "-"}</div>,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const session = authClient.useSession()
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
                altText={row.original.nama} />
            </DropdownMenuItem>
            {(session.data?.user.divisi === "superadmin" || session.data?.user.divisi === "bph") && (
              <>
                <DropdownMenuSeparator />
                {!row.original.statusPembayaran && (
                  <DropdownMenuItem variant="default" asChild>
                    <KonfirmasiPesertaIndividuAlertDialog id={row.original.id!} />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem variant="default" asChild>
                  <HapusPesertaIndividuAlertDialog id={row.original.id!} />
                </DropdownMenuItem>
              </>
            )}

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }),
];
