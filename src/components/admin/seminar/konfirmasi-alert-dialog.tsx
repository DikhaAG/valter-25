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
import { ParticipantTable } from "@/models/seminar/table";

interface Props {
   idKelas: string;
   mahasiswas: ParticipantTable[];
}
export function KonfirmasiAlertDialog({ idKelas, mahasiswas }: Props) {
   function handleKonfirmasi() {
      alert("konfimras");
      console.log(idKelas);
      console.log(mahasiswas);
   }
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               variant="default"
               className="w-full bg-green-500 hover:bg-green-600 text-background text-center items-center justify-center"
            >
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
                  konfirmasi ini tidak dapat dibatalkan 💀😂.
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
