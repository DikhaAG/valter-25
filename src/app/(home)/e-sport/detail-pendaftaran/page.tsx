"use client";
import { useEffect, useState } from "react";
import { gcUrl } from "@/data/home/e-sport/gc-url";
// ---------------------------------------------------
import { Label } from "@/components/ui/nb/label";
import { Input } from "@/components/ui/nb/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { CopyTeamCode } from "@/components/home/salin-kode";
//-------------------------------------------------------------------
import { ImageDialog } from "@/components/home/image-dialog";
import { UpdateImageDialog } from "../../../../components/home/esport/registration-detail/update-image-dialog";
import { DetailPendaftaranTimSkeleton } from "@/components/home/detail-pendaftaran-tim-skeleton";
import { RegistrationDetailHeader } from "@/components/home/header";
import { ParticipantTable, TeamTable } from "@/models/esport/table";
import { codeCheck } from "@/server/services/esport/code-check";
import { getTeamById } from "@/server/actions/queries/esport";
import { ExportData } from "@/components/home/esport/registration-detail/export-data";
import { BackButton } from "@/components/home/back-button";

export default function EsportRegistrationDetailPage() {
   const [team, setTeam] = useState<TeamTable | undefined>();

   useEffect(() => {
      const kodeStored = sessionStorage.getItem("kodeTim");
      if (!kodeStored) {
         return;
      }
      codeCheck(kodeStored).then((res) => {
         if (!res.success) {
            return;
         }
         getTeamById(kodeStored).then((res) => {
            if (!res.success) {
               return;
            }
            setTeam(res.data);
         });
      });
   }, []);

   return (
      <div className="">
         <div className="w-full md:max-w-xl md:mx-auto space-y-8 border-none md:border-2 md:border-dashed md:border-foreground/80 md:rounded-md md:shadow-[7px_7px_0px_#00000040]">
            <div className="p-4 flex justify-end md:justify-start">
               <BackButton />
            </div>
            {team ? (
               <>
                  <div className="p-6 flex flex-col gap-y-8 md:gap-y-6">
                     <RegistrationDetailHeader
                        namaTim={team.namaTim}
                        statusPembayaran={team.statusPembayaran}
                        gcUrl={gcUrl}
                     />
                     <div className="flex flex-col space-y-2 justify-end items-end">
                        <CopyTeamCode kode={team.id!} />
                        <ExportData team={team} />
                     </div>
                     <div
                        className={`grid grid-cols-1 ${
                           team.instansi && "md:grid-cols-2"
                        }  gap-4 text-xs`}
                     >
                        {team.as === "mahasiswa" && (
                           <div className="space-y-2">
                              <Label>Instansi</Label>
                              <Input readOnly value={team.instansi!} />
                           </div>
                        )}
                        <div className="space-y-2">
                           <Label>Nomor Whatsapp</Label>
                           <Input readOnly value={team.noWa!} />
                        </div>
                     </div>

                     <div className="mt-6 space-y-4">
                        <h4 className="font-semibold mb-2">Bukti Pembayaran</h4>
                        <UpdateImageDialog team={team} />
                        {team.buktiPembayaran ? (
                           <ImageDialog
                              buktiPembayaran={team.buktiPembayaran}
                              namaTim={team.namaTim}
                           />
                        ) : (
                           <p className="text-gray-500 font-poppins">
                              Tidak ada bukti pembayaran
                           </p>
                        )}
                     </div>

                     <div className="mt-6">
                        <h4 className="font-semibold mb-2">Anggota Tim</h4>
                        <div className="overflow-x-auto border border-foreground rounded-xl shadow-[7px_7px_0px_#00000040]">
                           <Table className="rounded-t-xl">
                              <TableHeader className="rounded-t-xl">
                                 <TableRow className="bg-foreground hover:bg-foreground/90 text-background rounded-t-xl">
                                    <TableHead className="border text-left text-sm text-background">
                                       ID ML
                                    </TableHead>
                                    <TableHead className="border text-left text-sm text-background">
                                       Nama
                                    </TableHead>
                                    {team.as === "mahasiswa" && (
                                       <TableHead className="border text-left text-sm text-background">
                                          NPM
                                       </TableHead>
                                    )}
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {team.peserta
                                    ? (
                                         team.peserta as Array<ParticipantTable>
                                      ).map((p) => (
                                         <TableRow key={p.id}>
                                            <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                               {p.idML}
                                            </TableCell>
                                            <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                               {p.nama}
                                            </TableCell>
                                            {team.as === "mahasiswa" && (
                                               <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                                  {p.npm}
                                               </TableCell>
                                            )}
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
