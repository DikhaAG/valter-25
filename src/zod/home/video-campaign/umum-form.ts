// app/form-schema.ts
import { videoCampaignNoWaAvaliableCheck } from "@/server/home/video-campaign/validate/no-wa-available-check";
import { videoCampaignTimNameAvailableCheck } from "@/server/home/video-campaign/validate/tim-name-available-check";
import { isNumeric } from "@/utils/home/is-numeric";
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { z } from "zod";

export const videoCampaignPesertaUmumFormSchema = z.object({
   id: z.uuid().optional(),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export const videoCampaignTimUmumFormSchema = z
   .object({
      as: asEnumSchema,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(videoCampaignPesertaUmumFormSchema),
   })
   .refine(
      async (data) => {
         const res = await videoCampaignTimNameAvailableCheck(data.namaTim);
         return res.success;
      },
      {
         error: "Nama Tim telah terdaftar!.",
         path: ["namaTim"],
      }
   )
   .refine(
      (data) => {
         return isNumeric(data.noWa);
      },
      {
         error: `Nomor Whatsapp tidak validsss!.`,
         path: ["noWa"],
      }
   )
   .refine(
      async (data) => {
         const res = await videoCampaignNoWaAvaliableCheck(data.noWa);
         return res.success;
      },
      {
         error: "Nomor Whatsapp telah terdaftar!.",
         path: ["noWa"],
      }
   )
   .refine(
      (data) => {
         return data.buktiPembayaran;
      },
      {
         error: `Bukti pembayaran belum diupload!.`,
         path: ["buktiPembayaran"],
      }
   );

export type VideoCampaignTimUmumFormSchemaType = z.infer<
   typeof videoCampaignTimUmumFormSchema
>;

export type VideoCampaignPesertaUmumFormSchemaType = z.infer<
   typeof videoCampaignPesertaUmumFormSchema
>;
