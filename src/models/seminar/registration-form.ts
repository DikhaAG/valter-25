// app/form-schema.ts
import { isNumeric } from "@/utils/is-numeric";
import { asEnum, kotaEnum, metodeDaftarEnum } from "@/models/enums";
import { z } from "zod";
import { noWaCheck } from "@/server/services/seminar/no-wa-available-check";
import { emailCheck } from "@/server/services/seminar/email-check";
import { CustomToast } from "@/components/ui/nb/custom-toast";

export const participantAsMahasiswa = z
   .object({
      as: asEnum,
      metodeDaftar: metodeDaftarEnum,
      nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      email: z.email(),
      instansi: z.string().min(1, {
         message: "Asal instansi tidak boleh kosong.",
      }),
      domisili: kotaEnum,
      buktiPembayaran: z.any(),
   })
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
         const res = await noWaCheck(data.noWa);
         return res.success;
      },
      {
         error: "Nomor Whatsapp telah terdaftar!.",
         path: ["noWa"],
      }
   )
   .refine(
      async (data) => {
         const res = await emailCheck(data.email);
         return res.success;
      },
      {
         error: "Nomor Whatsapp telah terdaftar!.",
         path: ["email"],
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

export const participantAsGeneral = z
   .object({
      as: asEnum,
      metodeDaftar: metodeDaftarEnum,
      nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      email: z.email(),
      domisili: kotaEnum,
      buktiPembayaran: z.any(),
   })
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
         const res = await noWaCheck(data.noWa);
         return res.success;
      },
      {
         error: "Nomor Whatsapp telah terdaftar!.",
         path: ["noWa"],
      }
   )
   .refine(
      async (data) => {
         const res = await emailCheck(data.email);
         return res.success;
      },
      {
         error: "Nomor Whatsapp telah terdaftar!.",
         path: ["email"],
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

export const classRegstrationSchema = z
   .object({
      kelas: z.string("Kelas harus diisi!."),
      nominal: z
         .number()
         .min(60000, { error: "Nominal bayar tidak boleh dibawah Rp 60.000" }),
      buktiPembayaran: z.any(),
      excelFile: z
         .instanceof(File, {error: "Gambar belum diupload!."})
         .refine((file) => file.name.endsWith(".xlsx"), {
            message: "File harus berformat .xlsx",
         }),
      participants: z.array(
         z
            .object({
               nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
               noWa: z
                  .string({ error: "Nomor Whatsapp tidak valid!." })
                  .min(11, {
                     message: "Nomor Whatsapp minimal 11 angka.",
                  }),
               email: z.email({ error: "Email tidak valid!." }),
            })
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
                  const res = await noWaCheck(data.noWa);
                  return res.success;
               },
               {
                  error: "Nomor Whatsapp telah terdaftar!.",
                  path: ["noWa"],
               }
            )
            .refine(
               async (data) => {
                  const res = await emailCheck(data.email);
                  return res.success;
               },
               {
                  error: "Email telah terdaftar!.",
                  path: ["email"],
               }
            )
      ),
   })
   .refine(
      ({ nominal }) => {
         console.log(nominal % 60000);
         return nominal % 60000 === 0;
      },
      {
         error: "Nominal bayar tidak sesuai!.",
         path: ["nominal"],
      }
   )
   .refine(
      (data) => {
         // Mengambil semua nilai NPM dari array
         const noWa = data.participants
            .map((peserta) => peserta.noWa)
            .filter(Boolean);
         // Membuat Set untuk menghilangkan duplikat
         const uniqueNoWa = new Set(noWa);

         // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
         return noWa.length === uniqueNoWa.size;
      },
      {
         // Pesan error jika validasi gagal
         error: `Tidak boleh ada NPM yang sama!.`,
         // Path di mana error akan ditampilkan
         path: [`pesertaError`],
      }
   )
   .refine(
      (data) => {
         // Mengambil semua nilai NPM dari array
         const email = data.participants
            .map((peserta) => peserta.email)
            .filter(Boolean);
         // Membuat Set untuk menghilangkan duplikat
         const uniqueEmail = new Set(email);

         // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
         return email.length === uniqueEmail.size;
      },
      {
         // Pesan error jika validasi gagal
         error: `Tidak boleh ada email yang sama!.`,
         // Path di mana error akan ditampilkan
         path: [`pesertaError`],
      }
   );

export type ParticipantAsMahasiswa = z.infer<typeof participantAsMahasiswa>;
export type ParticipantAsGeneral = z.infer<typeof participantAsGeneral>;
export type ClassRegstrationSchema = z.infer<typeof classRegstrationSchema>;
