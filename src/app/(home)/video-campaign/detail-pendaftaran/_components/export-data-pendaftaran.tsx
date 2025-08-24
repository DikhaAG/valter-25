import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { videoCampaignExportRegistrationDataMahasiswaToExcel } from "@/utils/home/detal-pendaftaran/mahasiswa/video-campaign-export-data-pendaftaran";
import { videoCampaignExportRegistrationDataUmumToExcel } from "@/utils/home/detal-pendaftaran/umum/video-campaign-export-data-pendaftaran";
import { VideoCampaignRegistrationDisplaySchemaType } from "@/zod/home/video-campaign/detail-pendaftaran/display";
import { Download } from "lucide-react";

interface Props {
   team: VideoCampaignRegistrationDisplaySchemaType;
}
export function VideoCampaignExportRegistrationData({ team }: Props) {
   const handleDownload = () => {
      if (team) {
         if (team.as === "mahasiswa") {
            videoCampaignExportRegistrationDataMahasiswaToExcel(team);
         } else {
            videoCampaignExportRegistrationDataUmumToExcel(team);
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
