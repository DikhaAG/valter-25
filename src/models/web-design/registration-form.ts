// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { isNumeric } from "@/utils/is-numeric";
import { asEnum } from "@/models/enums";
import { z } from "zod";
import { teamNameCheck } from "@/server/services/web-design/tim-name-available-check";
import { noWaCheck } from "@/server/services/web-design/no-wa-available-check";

export const participantAsMahasiswa = z.object({
   id: z.uuid().optional(),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
   npm: z
      .string()
      .min(12, { message: "NPM harus berjumlah 12 angka." })
      .max(12, { message: "NPM harus berjumlah 12 angka." }),
});
export const participantAsGeneral = z.object({
   id: z.uuid().optional(),
   nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});

export const teamAsMahasiswa = z
   .object({
      as: asEnum,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      instansi: z.string().min(1, {
         message: "Asal instansi tidak boleh kosong.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(participantAsMahasiswa),
   })
   .refine(
      async (data) => {
         const res = await teamNameCheck(data.namaTim);
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
         const res = await noWaCheck(data.noWa);
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

export const teamAsGeneral = z
   .object({
      as: asEnum,
      namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
      noWa: z.string().min(11, {
         message: "Nomor Whatsapp minimal 11 angka.",
      }),
      buktiPembayaran: z.any(),
      peserta: z.array(participantAsGeneral),
   })
   .refine(
      async (data) => {
         const res = await teamNameCheck(data.namaTim);
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
         const res = await noWaCheck(data.noWa);
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

export type TeamAsMahasiswa = z.infer<typeof teamAsMahasiswa>;
export type TeamAsGeneral = z.infer<typeof teamAsGeneral>;
export type ParticipantAsMahasiswa = z.infer<typeof participantAsMahasiswa>;
export type ParticipantAsGeneral = z.infer<typeof participantAsGeneral>;
