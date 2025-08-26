"use client";
import { ImageDialog } from "../../../../components/home/image-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/nb/button";
import { gcUrl } from "@/data/home/pelatihan/gc-url";
import { DetailPendaftaranTimSkeleton } from "@/components/home/detail-pendaftaran-tim-skeleton";
import { RegistrationDetailHeader } from "@/components/home/header";
import { ParticipantTable } from "@/models/pelatihan/table";
import { getParticipantById } from "@/server/actions/queries/pelatihan";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { exportPesertaToExcel } from "@/server/services/pelatihan/export-peserta-to-excel";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { Download } from "lucide-react";
import { IndividuUpdateImageDialog } from "@/components/home/pelatihan/registration-detail/individu-update-image-dialog";
import { Input } from "@/components/ui/nb/input";
import { Label } from "@/components/ui/nb/label";
import { CopyTeamCode } from "@/components/home/salin-kode";
import { BackButton } from "@/components/home/back-button";

export default function DetailPendaftaranPage() {
   const [participant, setParticipant] = useState<
      ParticipantTable | undefined
   >();

   useEffect(() => {
      const registrationId = sessionStorage.getItem("registrationId");
      if (!registrationId) {
         return;
      }
      getParticipantById(registrationId).then((res) => {
         if (!res.success) {
            return;
         }
         setParticipant(res.data);
      });
   }, []);

   const handleDownload = () => {
      if (participant) {
         exportPesertaToExcel({ data: participant });
      }
   };

   return (
      <div className="">
         <div className="w-full md:max-w-xl md:mx-auto space-y-8 border-none md:border-2 md:border-dashed md:border-foreground/80 md:rounded-md md:shadow-[7px_7px_0px_#00000040]">
            <div className="p-4 flex justify-end md:justify-start">
               <BackButton />
            </div>
            {participant ? (
               <>
                  <div className="p-6 flex flex-col gap-y-8 md:gap-y-6">
                     <RegistrationDetailHeader
                        namaTim={participant.nama.split(" ")[0]}
                        statusPembayaran={participant.statusPembayaran}
                        gcUrl={gcUrl}
                     />
                     <div className="flex flex-col space-y-2 justify-end items-end">
                        <CopyTeamCode kode={participant.id!} />
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

                     <div>
                        <div className="space-y-2">
                           <Label>Nama Lengkap</Label>
                           <Input readOnly value={participant.nama} />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-x-4">
                        <div className="space-y-2">
                           <Label>Nomor Whatsapp</Label>
                           <Input readOnly value={participant.noWa} />
                        </div>
                        <div className="space-y-2">
                           <Label>Email</Label>
                           <Input readOnly value={participant.email} />
                        </div>
                     </div>
                     <div
                        className={`grid ${
                           participant.kelas ? `grid-cols-2` : "grid-cols-1"
                        } gap-x-4`}
                     >
                        {participant.as === "mahasiswa" && (
                           <div className="space-y-2">
                              <Label>Instansi</Label>
                              <Input readOnly value={participant.instansi!} />
                           </div>
                        )}
                        {participant.kelas && (
                           <div className="space-y-2">
                              <Label>Kelas</Label>
                              <Input readOnly value={participant.kelas} />
                           </div>
                        )}
                     </div>
                     <div className="">
                        <div className="space-y-2">
                           <Label>Domisili</Label>
                           <Input readOnly value={participant.domisili} />
                        </div>
                     </div>

                     <div className="mt-6 space-y-4">
                        <h4 className="font-semibold mb-2">Bukti Pembayaran</h4>
                        <IndividuUpdateImageDialog data={participant} />
                        {participant.buktiPembayaran ? (
                           <ImageDialog
                              buktiPembayaran={participant.buktiPembayaran}
                              namaTim={participant.id!}
                           />
                        ) : (
                           <p className="text-gray-500 font-poppins">
                              Tidak ada bukti pembayaran
                           </p>
                        )}
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
