import { ColumnDef } from "@tanstack/react-table";
import { KelasColumn } from "./kelas-column";
import { ClassRegistrationTable } from "@/models/seminar/table";
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
import { KonfirmasiAlertDialog } from "./konfirmasi-alert-dialog";
import { BuktiPembayaranImageDialog } from "./bukti-pembayaran-dialog";
import { formatTimestamp } from "@/utils/format-timestamp";
import { HapusAlertDialog } from "./hapus-alert-dialog";

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

export const seminarColumns: ColumnDef<ClassRegistrationTable>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "kelas",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Kelas
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <KelasColumn
          kelas={row.original.kelas}
          mahasiswas={row.original.peserta}
        />
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "statusPembayaran",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`${row.original.statusPembayaran
          ? "text-background bg-green-500"
          : "text-foreground bg-yellow-400 "
          } px-1.5`}
      >
        {row.original.statusPembayaran ? (
          //  <IconCircleCheckFilled fill="true" className="fill-green-500 dark:fill-green-400" />
          <IconCircleCheckFilled />
        ) : (
          <IconLoader />
        )}
        {row.original.statusPembayaran
          ? "Terkonfirmasi"
          : "Belum dikonfirmasi"}
      </Badge>
    ),
  },
  {
    accessorKey: "nominal",
    header: "Nominal Bayar",
    cell: ({ row }) => <div>{formatIDRCurrency(row.original.nominal)}</div>,
  },
  {
    accessorKey: "createdat",
    header: "Dibuat",
    cell: ({ row }) => <div>{formatTimestamp(row.getValue("createdat"))}</div>,
  },
  {
    accessorKey: "tanggalKonfirmasi",
    header: "Dikonfirmasi",
    cell: ({ row }) => <div>{row.getValue("tanggalKonfirmasi") ? formatTimestamp(row.getValue("tanggalKonfirmasi")) : "-"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
              altText={row.original.kelas} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!row.original.statusPembayaran && (
            <DropdownMenuItem variant="default" asChild>
              <KonfirmasiAlertDialog
                idKelas={row.original.id}
                mahasiswas={row.original.peserta}
              />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem variant="default" asChild>
            <HapusAlertDialog
              idKelas={row.original.id}
              mahasiswas={row.original.peserta}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
