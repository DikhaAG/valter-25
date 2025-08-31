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
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { hapusPesertaIndividuPelatihan } from "@/server/services/admin/hapus-pendaftaran";
import { Trash } from "lucide-react";

interface Props {
  id: string;
}
export function HapusPesertaIndividuAlertDialog({ id,  }: Props) {
  async function handleHapus() {
    const res = await hapusPesertaIndividuPelatihan(id)
    if (!res.success) {
      CustomToast({ variant: "error", message: "Gagal menghapus peserta" })
      return
    }
    CustomToast({ variant: "success", message: "Berhasil menghapus peserta" })
    window.location.href = "/admin/pelatihan"
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
            onClick={handleHapus}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
