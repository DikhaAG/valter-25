import { Badge } from "@/components/ui/nb/badge";
import { Button } from "@/components/ui/nb/button";
import { wrapSymbols } from "@/utils/wrap-symbols";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
   namaTim: string;
   statusPembayaran: boolean;
   gcUrl: string;
}
export function RegistrationDetailHeader({
   namaTim,
   statusPembayaran,
   gcUrl,
}: Props) {
   return (
      <h3 className="text-2xl font-bold mb-10 flex flex-col">
         <span className="flex">{wrapSymbols(namaTim)}</span>
         <Badge variant={statusPembayaran ? "success" : "warning"}>
            {statusPembayaran ? <Check /> : <Loader />}
            {statusPembayaran ? "Terkonfirmasi" : "Menunggu konfirmasi"}
         </Badge>
         <div className="mt-4">
            {statusPembayaran && (
               <Button variant={"success"} className="text-background">
                  <Link href={gcUrl} passHref={true}>
                     Gabung grup wa
                  </Link>
                  <FaWhatsapp />
               </Button>
            )}
         </div>
      </h3>
   );
}
