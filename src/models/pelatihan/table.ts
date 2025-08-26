import { z } from "zod";
import { asEnum, kotaEnum, metodeDaftarEnum } from "../enums";

export const participantTable = z.object({
   id: z.uuid().optional(),
   as: asEnum,
   metodeDaftar: metodeDaftarEnum,
   kelas: z.string().nullable(),
   nama: z.string(),
   noWa: z.string(),
   email: z.email(),
   instansi: z.string().nullable(),
   domisili: kotaEnum,
   buktiPembayaran: z.any(),
   statusPembayaran: z.boolean().default(false),
   tanggalKonfirmasi: z.string().nullable(),
   createdat: z.string(),
   updatedat: z.string(),
});

export const classRegistraionTable = z.object({
   id: z.uuid(),
   kelas: z.string(),
   nominal: z.number(),
   buktiPembayaran: z.any(),
   statusPembayaran: z.boolean().default(false),
   tanggalKonfirmasi: z.string().nullable(),
   createdat: z.string(),
   updatedat: z.string(),
   peserta: z.array(participantTable),
});

export type ParticipantTable = z.infer<typeof participantTable>;
export type ClassRegistrationTable = z.infer<typeof classRegistraionTable>;
