"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/nb/button";
import { DetailPendaftaranTimSkeleton } from "@/components/home/detail-pendaftaran-tim-skeleton";
import { ClassRegistrationTable } from "@/models/pelatihan/table";
import { getClassRegistrationById } from "@/server/actions/queries/pelatihan";
import { RegistrationDetailHeader } from "../../header";
import { gcUrl } from "@/data/home/pelatihan/gc-url";
import { CopyTeamCode } from "../../salin-kode";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { exportKelasToExcel } from "@/server/services/pelatihan/export-kelas-to-excel";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { Download } from "lucide-react";
import { KelasUpdateImageDialog } from "./kelas-update-image-dialog";
import { ImageDialog } from "../../image-dialog";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { BackButton } from "../../back-button";

export default function DetailPendaftaranKelasPage() {
   const [classRegistrationData, setClassRegistrationData] = useState<
      ClassRegistrationTable | undefined
   >();

   useEffect(() => {
      const registrationId = sessionStorage.getItem("registrationId");
      if (!registrationId) {
         return;
      }
      getClassRegistrationById(registrationId).then((res) => {
         if (!res.success) {
            return;
         }
         console.log(res.data!);
         setClassRegistrationData(res.data!);
      });
   }, []);

   const handleDownload = () => {
      if (classRegistrationData) {
         exportKelasToExcel({ data: classRegistrationData });
      }
   };

   return (
      <div className="">
         <div className="w-full md:max-w-xl md:mx-auto space-y-8 border-none md:border-2 md:border-dashed md:border-foreground/80 md:rounded-md md:shadow-[7px_7px_0px_#00000040]">
            <div className="p-4 flex justify-end md:justify-start">
               <BackButton />
            </div>
            {classRegistrationData ? (
               <>
                  <div className="p-6 flex flex-col gap-y-8 md:gap-y-6">
                     <RegistrationDetailHeader
                        namaTim={classRegistrationData.kelas}
                        statusPembayaran={
                           classRegistrationData.statusPembayaran
                        }
                        gcUrl={gcUrl}
                     />
                     <div className="flex flex-col space-y-2 justify-end items-end">
                        <CopyTeamCode kode={classRegistrationData.id} />
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant={"secondary"}
                                 onClick={() => {
                                    handleDownload();
                                    CustomToast({
                                       variant: "default",
                                       message: `Data pendaftaran berhasil diunduh. 😎`,
                                    });
                                    new Promise<void>(() => {
                                       setTimeout(() => {
                                          CustomToast({
                                             variant: "default",
                                             message: `Jaga kerahasiaan kode tim kamu untuk menghindari penyalahgunaan data. 😎`,
                                          });
                                       }, 2000);
                                    });
                                 }}
                                 className="text-xs"
                              >
                                 unduh data pendaftaran
                                 <Download />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p>Unduh data pendaftaran tim kamu</p>
                           </TooltipContent>
                        </Tooltip>
                     </div>

                     <div className="mt-6 space-y-4">
                        <h4 className="font-semibold mb-2">Bukti Pembayaran</h4>
                        <KelasUpdateImageDialog data={classRegistrationData} />
                        {classRegistrationData.buktiPembayaran ? (
                           <ImageDialog
                              buktiPembayaran={
                                 classRegistrationData.buktiPembayaran
                              }
                              namaTim={classRegistrationData.kelas}
                           />
                        ) : (
                           <p className="text-gray-500 font-poppins">
                              Tidak ada bukti pembayaran
                           </p>
                        )}
                     </div>

                     <div className="mt-6">
                        <h4 className="font-semibold mb-2">Daftar Mahasiswa</h4>
                        <div className="overflow-x-auto border border-foreground rounded-xl shadow-[7px_7px_0px_#00000040]">
                           <Table className="rounded-t-xl">
                              <TableHeader className="rounded-t-xl">
                                 <TableRow className="bg-foreground hover:bg-foreground/90 text-background rounded-t-xl">
                                    <TableHead className="border text-left text-sm text-background">
                                       Nama
                                    </TableHead>
                                    <TableHead className="border text-left text-sm text-background">
                                       Nomor Whatsapp
                                    </TableHead>
                                    <TableHead className="border text-left text-sm text-background">
                                       Email
                                    </TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {classRegistrationData
                                    ? classRegistrationData.peserta.map((p) => (
                                         <TableRow
                                            key={p.id}
                                            className="font-poppins"
                                         >
                                            <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                               {p.nama}
                                            </TableCell>
                                            <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                               {p.noWa}
                                            </TableCell>
                                            <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                               {p.email}
                                            </TableCell>
                                         </TableRow>
                                      ))
                                    : "tidak ada peserta"}
                              </TableBody>
                           </Table>
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <DetailPendaftaranTimSkeleton />
            )}
         </div>
      </div>
   );
}
