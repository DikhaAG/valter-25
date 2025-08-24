// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { webDesignNoWaAvaliableCheck } from "@/server/home/web-design/validate/no-wa-available-check";
import { webDesignTimNameAvailableCheck } from "@/server/home/web-design/validate/tim-name-available-check";
import { isNumeric } from "@/utils/home/is-numeric";
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { z } from "zod";

export const webDesignPesertaMahasiswaFormSchema = z.object({
   id: z.uuid().optional(),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
   npm: z
      .string()
      .min(12, { message: "NPM harus berjumlah 12 angka." })
      .max(12, { message: "NPM harus berjumlah 12 angka." }),
});

export const webDesignTimMahasiswaFormSchema = z
   .object({
      as: asEnumSchema,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      instansi: z.string().min(1, {
         message: "Asal instansi tidak boleh kosong.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(webDesignPesertaMahasiswaFormSchema),
   })
   .refine(
      async (data) => {
         const res = await webDesignTimNameAvailableCheck(data.namaTim);
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
         const res = await webDesignNoWaAvaliableCheck(data.noWa);
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
   )
   .superRefine((data, ctx) => {
      data.peserta.map((p, i) => {
         if (!isNumeric(p.npm)) {
            ctx.addIssue({
               code: "custom",
               message: "NPM tidak valid",
               path: [`peserta[${i}].npm`],
            });
         }
      });
   })
   .refine(
      (data) => {
         const npms = data.peserta
            .map((peserta) => peserta.npm)
            .filter(Boolean);
         const uniqueNpms = new Set(npms);

         return npms.length === uniqueNpms.size;
      },
      {
         error: `Tidak boleh ada NPM yang sama!. ${emotError}`,
         path: [`pesertaError`],
      }
   );

export type WebDesignTimMahasiswaFormSchemaType = z.infer<
   typeof webDesignTimMahasiswaFormSchema
>;

export type WebDesignPesertaMahasiswaFormSchemaType = z.infer<
   typeof webDesignPesertaMahasiswaFormSchema
>;
