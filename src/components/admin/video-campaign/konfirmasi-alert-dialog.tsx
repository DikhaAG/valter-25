"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { konfirmasiTimVideoCampaign } from "@/server/services/admin/konfirmasi-pendaftaran";
import { Check } from "lucide-react";

interface Props {
  id: string;
}
export function KonfirmasiTimDialog({ id, }: Props) {
  async function handleKonfirmasi() {
    const res = await konfirmasiTimVideoCampaign(id)
    if (!res.success) {
      console.log(res.message)
      CustomToast({ variant: "error", message: "Gagal mengkonfirmasi pendaftaran" })
      return
    }
    CustomToast({ variant: "success", message: "Berhasil mengkonfirmasi pendaftaran" })
    window.location.href = "/admin/video-campaign"
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="w-full bg-background hover:bg-green-600 text-green-600 hover:text-background text-center items-center justify-center"
        >
          <Check />
          Konfirmasi
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Yakin untuk konfirmasi pendaftaran? 😱
          </AlertDialogTitle>
          <AlertDialogDescription>
            Pastikan bahwa uang atau bukti transfer sudah benar karena
            konfirmasi ini tidak dapat dibatalkan!. 💀😂.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500 hover:bg-green-600"
            onClick={handleKonfirmasi}
          >
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
