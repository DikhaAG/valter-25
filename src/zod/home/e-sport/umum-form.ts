import { emotError } from "@/data/emot-response";
import { esportNoWaAvaliableCheck } from "@/server/home/e-sport/no-wa-available-check";
import { esportTimNameAvaliableCheck } from "@/server/home/e-sport/tim-name-available-check";
import { isNumeric } from "@/utils/home/is-numeric";
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { z } from "zod";

export const esportPesertaUmumFormSchema = z.object({
   id: z.uuid().optional(),
   idML: z
      .string()
      .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export const esportTimUmumFormSchema = z
   .object({
      as: asEnumSchema,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(esportPesertaUmumFormSchema),
   })
   .refine(
      async (data) => {
         const res = await esportTimNameAvaliableCheck(data.namaTim);
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
         const res = await esportNoWaAvaliableCheck(data.noWa);
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
   .refine(
      (data) => {
         const idMLs = data.peserta.map((p) => p.idML).filter(Boolean);
         // Membuat Set untuk menghilangkan duplikat
         const uniqueIdMLs = new Set(idMLs);

         // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
         return idMLs.length === uniqueIdMLs.size;
      },
      {
         // Pesan error jika validasi gagal
         error: `Tidak boleh ada ID yang sama!. ${emotError}`,
         // Path di mana error akan ditampilkan
         path: [`pesertaError`],
      }
   )
   .refine(
      (data) => {
         return data.peserta.length >= 5;
      },
      {
         error: `Jumlah pemain minimal 5!.`,
         path: ["pesertaError"],
      }
   );

export type EsportTimUmumFormSchemaType = z.infer<
   typeof esportTimUmumFormSchema
>;
export type EsportPesertaUmumFormSchemaType = z.infer<
   typeof esportPesertaUmumFormSchema
>;
