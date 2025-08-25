import z from "zod";
import { asEnum } from "../enums";

export const participantTable = z.object({
   id: z.uuid(),
   namaTim: z.string(),
   npm: z.string().nullable(),
   nama: z.string().nullable(),
   createdat: z.string(),
   updatedat: z.string(),
});

export const teamTable = z.object({
   id: z.string(),
   namaTim: z.string(),
   noWa: z.string().nullable(),
   instansi: z.string().nullable(),
   buktiPembayaran: z.any(),
   statusPembayaran: z.boolean().default(false),
   tanggalKonfirmasi: z.string().nullable,
   createdat: z.string(),
   updatedat: z.string(),
   peserta: z.array(participantTable),
   as: asEnum,
});
export type TeamTable = z.infer<typeof teamTable>;
export type ParticipantTable = z.infer<typeof participantTable>;
