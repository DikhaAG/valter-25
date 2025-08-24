import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { webDesignExportRegistrationDataMahaisiswaToExcel } from "@/utils/home/detal-pendaftaran/mahasiswa/web-design-export-data-pendaftaran";
import { webDesignExportRegistrationDataUmumToExcel } from "@/utils/home/detal-pendaftaran/umum/web-design-export-data-pendaftaran";
import { WebDesignRegistrationDisplaySchemaType } from "@/zod/home/web-design/detail-pendaftaran/display";
import { Download } from "lucide-react";

interface Props {
   team: WebDesignRegistrationDisplaySchemaType;
}
export function WebDesignExportRegistrationData({ team }: Props) {
   const handleDownload = () => {
      if (team) {
         if (team.as === "mahasiswa") {
            webDesignExportRegistrationDataMahaisiswaToExcel(team);
         } else {
            webDesignExportRegistrationDataUmumToExcel(team);
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
