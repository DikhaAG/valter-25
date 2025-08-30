import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ParticipantTable } from "@/models/seminar/table";
import { Trash } from "lucide-react";

interface Props {
  idKelas: string;
  mahasiswas: ParticipantTable[];
}
export function HapusAlertDialog({ idKelas, mahasiswas }: Props) {
  function handleKonfirmasi() {
    alert("hapus");
    console.log(idKelas);
    console.log(mahasiswas);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="w-full bg-background hover:bg-red-500 text-red-500 hover:text-background text-center items-center justify-center"
        >
          <Trash />
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Yakin untuk menghapus pendaftaran? 😱
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleKonfirmasi}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
