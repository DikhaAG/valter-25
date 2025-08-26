import { ClassRegstrationSchema } from "@/models/pelatihan/registration-form";
import { ServerResponseType } from "@/types/server-response";

interface Props {
   data: ClassRegstrationSchema;
}
export function validateNominal({ data }: Props): ServerResponseType<unknown> {
   const { nominal, participants } = data;
   const htm = 60_000;
   const nominalSeharusnya = participants.length * htm;
   if (nominal < nominalSeharusnya) {
      return {
         success: false,
         message: "Nominal bayar kurang dari total yang seharusnya",
      };
   } else if (nominal > nominalSeharusnya) {
      return {
         success: false,
         message: "Nominal bayar lebih dari total yang seharusnya",
      };
   }
   return {
      success: true,
   };
}
