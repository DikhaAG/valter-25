import { emotError } from "@/data/emot-response";
import { isNumeric } from "@/utils/home/is-numeric";
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { z } from "zod";

export const formPendaftaranPesertaUmumSchema = z.object({
   id: z.uuid().optional(),
   idML: z
      .string()
      .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export const formPendaftaranTimUmumSchema = z
   .object({
      as: asEnumSchema,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(formPendaftaranPesertaUmumSchema),
   })
   .refine(
      (data) => {
         return isNumeric(data.noWa);
      },
      {
         error: `Nomor Whatsapp tidak valid!.`,
         path: ["noWa"],
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
   );

export type FormPendaftaranTimUmumSchemaType = z.infer<
   typeof formPendaftaranTimUmumSchema
>;
export type FormPendaftaranPesertaUmumSchemaType = z.infer<
   typeof formPendaftaranPesertaUmumSchema
>;
