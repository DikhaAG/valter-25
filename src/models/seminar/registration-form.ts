// app/form-schema.ts
import { isNumeric } from "@/utils/is-numeric";
import { asEnum, kotaEnum, metodeDaftarEnum } from "@/models/enums";
import { z } from "zod";
import { noWaCheck } from "@/server/services/seminar/no-wa-available-check";
import { emailCheck } from "@/server/services/seminar/email-check";

export const participantAsMahasiswa = z
   .object({
      as: asEnum,
      metodeDaftar: metodeDaftarEnum,
      nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
      noWa: z
         .string()
         .min(11, {
            message: "Nomor Whatsapp minimal 11 angka.",
         })
         .refine(
            (noWa) => {
               console.log(isNumeric(noWa));
               return isNumeric(noWa);
            },
            {
               error: `Nomor Whatsapp tidak validsss!.`,
            }
         )
         .refine(
            async (noWa) => {
               const res = await noWaCheck(noWa);
               return res.success;
            },
            {
               error: "Nomor Whatsapp telah terdaftar!.",
            }
         ),
      email: z.email({ error: "Email tidak valid!." }).refine(
         async (email) => {
            const res = await emailCheck(email);
            return res.success;
         },
         {
            error: "Email telah terdaftar!.",
         }
      ),
      instansi: z.string().min(1, {
         message: "Asal instansi tidak boleh kosong.",
      }),
      domisili: kotaEnum.refine(
         (domisili) => {
            return domisili !== undefined || domisili !== null;
         },
         {
            error: `Domisili tidak boleh kosong!.`,
            path: ["domisili"],
         }
      ),
      buktiPembayaran: z.instanceof(File, {
         error: "Bukti pembayaran tidak boleh kosong!.",
      }),
   })
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
      noWa: z
         .string()
         .min(11, {
            message: "Nomor Whatsapp minimal 11 angka.",
         })
         .refine(
            (noWa) => {
               console.log(isNumeric(noWa));
               return isNumeric(noWa);
            },
            {
               error: `Nomor Whatsapp tidak validsss!.`,
            }
         )
         .refine(
            async (noWa) => {
               const res = await noWaCheck(noWa);
               return res.success;
            },
            {
               error: "Nomor Whatsapp telah terdaftar!.",
            }
         ),
      email: z.email().refine(
         async (email) => {
            const res = await emailCheck(email);
            return res.success;
         },
         {
            error: "Email telah terdaftar!.",
         }
      ),
      domisili: kotaEnum.refine(
         (domisili) => {
            return domisili !== undefined || domisili !== null;
         },
         {
            error: `Domisili tidak boleh kosong!.`,
            path: ["domisili"],
         }
      ),
      buktiPembayaran: z.instanceof(File, {
         error: "Bukti pembayaran tidak boleh kosong!.",
      }),
   })
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
      buktiPembayaran: z.instanceof(File, {
         error: "Bukti pembayaran belum diupload.",
      }),
      excelFile: z
         .instanceof(File, { error: "File belum diupload!." })
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
         return nominal % 60000 === 0;
      },
      {
         error: "Nominal bayar tidak sesuai!.",
         path: ["nominal"],
      }
   )
   .superRefine(({ participants }, ctx) => {
      const uniqueWa: string[] = [];
      participants.forEach((p, i) => {
         if (uniqueWa.length > 0) {
            if (uniqueWa.includes(p.noWa)) {
               console.log("==============");
               ctx.addIssue({
                  code: "custom",
                  message: `Nomor Whatsapp ini sudah dimasukan!.`,
                  path: ["participants", i, "noWa"],
               });
            }
         } else {
            uniqueWa.push(p.noWa);
         }
      });
   })
   .superRefine(({ participants }, ctx) => {
      const uniqueEmail: string[] = [];
      participants.forEach((p, i) => {
         if (uniqueEmail.length > 0) {
            if (uniqueEmail.includes(p.email)) {
               console.log("==============");

               ctx.addIssue({
                  code: "custom",
                  message: `Email ini sudah dimasukan!.`,
                  path: ["participants", i, "email"],
               });
            }
         } else {
            uniqueEmail.push(p.noWa);
         }
      });
   })
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
         error: `Tidak boleh ada nomor Whatsapp yang sama!.`,
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
