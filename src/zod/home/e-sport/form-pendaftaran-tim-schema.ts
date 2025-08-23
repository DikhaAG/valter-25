// app/form-schema.ts
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { emotError } from "@/data/emot-response";
import { cekKetersediaanNamaTim } from "@/server/home/e-sport/cek-ketersediaan-nama-tim";
import { cekKetersediaanNoWa } from "@/server/home/e-sport/cek-ketersediaan-no-wa";
import { cekKetersediaanNpm } from "@/server/home/e-sport/cek-ketersediaan-npm";
import { cekKetersediaanPeserta } from "@/server/home/e-sport/cek-ketersediaan-peserta";
import { isNumeric } from "@/utils/home/is-numeric";
import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { superRefine, z } from "zod";

export const formPendaftaranPesertaSchema = z.object({
   id: z.uuid().optional(),
   idML: z
      .string()
      .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
   npm: z
      .string()
      .min(12, { message: "NPM harus berjumlah 12 angka." })
      .max(12, { message: "NPM harus berjumlah 12 angka." }),
});

export const formPendaftaranTimSchema = z
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
      peserta: z.array(formPendaftaranPesertaSchema),
   })
   .refine(
      async (data) => {
         const res = await cekKetersediaanNamaTim(data.namaTim);
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
         const res = await cekKetersediaanNoWa(data.noWa);
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
         // Mengambil semua nilai NPM dari array
         const npms = data.peserta
            .map((peserta) => peserta.npm)
            .filter(Boolean);
         // Membuat Set untuk menghilangkan duplikat
         const uniqueNpms = new Set(npms);

         // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
         return npms.length === uniqueNpms.size;
      },
      {
         // Pesan error jika validasi gagal
         error: `Tidak boleh ada NPM yang sama!. ${emotError}`,
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

export type FormPendaftaranTimSchemaType = z.infer<
   typeof formPendaftaranTimSchema
>;

export type FormPendaftaranPesertaSchemaType = z.infer<
   typeof formPendaftaranPesertaSchema
>;
