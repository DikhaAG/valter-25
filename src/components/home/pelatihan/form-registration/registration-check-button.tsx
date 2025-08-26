/**
 * Komponen klien React untuk memicu dialog pengecekan status pendaftaran.
 *
 * Komponen ini mengelola alur kerja berikut:
 * 1.  Menampilkan tombol yang, ketika diklik, akan membuka sebuah dialog.
 * 2.  Di dalam dialog, pengguna dapat memasukkan registrationId unik tim.
 * 3.  Melakukan validasi format registrationId unik secara lokal.
 * 4.  Memanggil Server Action `cekregistrationIdUnik` untuk memverifikasi registrationId di database.
 * 5.  Menggunakan `CustomToast` untuk memberikan umpan balik (feedback) yang jelas
 * kepada pengguna mengenai keberhasilan atau kegagalan pengecekan.
 * 6.  Jika registrationId valid, menyimpan registrationId ke `sessionStorage` dan mengarahkan pengguna ke halaman detail.
 */
"use client";
import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/nb/dialog";
import { Input } from "@/components/ui/nb/input";
import { Label } from "@/components/ui/nb/label";
import { emotError } from "@/data/emot-response";
import { codeCheck } from "@/server/services/pelatihan/code-check";
import {
   isPelatihanClassTable,
   isPelatihanParticipantsTable,
} from "@/server/services/pelatihan/type-guard-custom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validate } from "uuid";

export function RegistrationCheckButton() {
   /**
    * State untuk menyimpan registrationId unik yang dimasukkan oleh pengguna.
    */
   const [registrationId, setregistrationId] = useState<string>();

   /**
    * State untuk melacak status proses pengiriman (submit) form.
    * Digunakan untuk mengelola status loading pada tombol.
    */
   const [onSubmit, setOnSubmit] = useState<boolean>(false);

   /**
    * Hook useRouter dari Next.js untuk melakukan navigasi halaman.
    */
   const router = useRouter();

   /**
    * Fungsi yang dipanggil saat pengguna menekan tombol "Cek Status".
    * Fungsi ini melakukan validasi registrationId, memanggil Server Action,
    * dan menangani respons dari server.
    */
   async function handleSubmit() {
      setOnSubmit(true);
      if (!validate(registrationId)) {
         setOnSubmit(true);
         CustomToast({
            variant: "error",
            message: `kode registrasi yang dimasukan tidak valid! ${emotError}`,
         });
         return;
      }

      const res = await codeCheck(registrationId!);

      if (!res.success) {
         setOnSubmit(false);
         CustomToast({
            variant: "warning",
            message: `${res.message} ${emotError}`,
         });
         return;
      }

      setOnSubmit(false);
      if (isPelatihanClassTable(res.data!)) {
         sessionStorage.setItem("registrationId", res.data!.id!);
         router.push(`/pelatihan/detail-pendaftaran/${res.data?.kelas}`);
      } else if (isPelatihanParticipantsTable(res.data!)) {
         sessionStorage.setItem("registrationId", res.data!.id!);
         router.push("/pelatihan/detail-pendaftaran");
      }
   }

   return (
      <Dialog>
         <form>
            <DialogTrigger asChild>
               <Button
                  variant="outline"
                  className="flex w-full max-w-lg  justify-self-center gap-0"
               >
                  Cek status pendaftaran
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle className="font-glofium-demo">
                     Cek Status Pendaftaran
                  </DialogTitle>
                  <DialogDescription>
                     Masukan kode registrasi kamu untuk melihat status apakah
                     pembayaran telah berhasil dikonfirmasi
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <Label htmlFor="name-1">Masukan Kode Registrasi</Label>
                     <Input
                        id="team-name"
                        name="team-name"
                        placeholder="ex: d2013-d213a-2313"
                        value={registrationId ? registrationId : ""}
                        onChange={(e) => setregistrationId(e.target.value)}
                     />
                  </div>
               </div>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Tutup</Button>
                  </DialogClose>
                  <Button
                     type="submit"
                     variant={"secondary"}
                     onClick={handleSubmit}
                     disabled={onSubmit || !registrationId}
                  >
                     Cek Status
                  </Button>
               </DialogFooter>
            </DialogContent>
         </form>
      </Dialog>
   );
}
