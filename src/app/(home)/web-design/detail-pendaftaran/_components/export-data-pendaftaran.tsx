import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { exportDataPendaftaranToExcel } from "@/utils/home/detal-pendaftaran/export-data-pendaftaran-web-design";
import { TimDisplaySchemaType } from "@/zod/home/web-design/detail-pendaftaran/tim-display-schema";
import { Download } from "lucide-react";

interface Props {
   team: TimDisplaySchemaType;
}
export function ExportDataPendaftaran({ team }: Props) {
   const handleDownload = () => {
      if (team) {
         exportDataPendaftaranToExcel(team);
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
