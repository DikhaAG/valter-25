import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { esportExportRegistrationDataMahasiswaToExcel } from "@/utils/home/detal-pendaftaran/mahasiswa/esport-export-data-pendaftaran";
import { esportExportRegistrationDataUmumToExcel } from "@/utils/home/detal-pendaftaran/umum/esport-export-data-pendaftaran";
import type { EsportRegistrationDisplaySchemaType } from "@/zod/home/e-sport/detail-pendaftaran/display";
import { Download } from "lucide-react";

interface Props {
   team: EsportRegistrationDisplaySchemaType;
}
export function ExportRegistrationData({ team }: Props) {
   const handleDownload = () => {
      if (team) {
         if (team.as === "mahasiswa") {
            esportExportRegistrationDataMahasiswaToExcel(team);
         } else {
            esportExportRegistrationDataUmumToExcel(team);
         }
      }
   };
   return (
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
   );
}
