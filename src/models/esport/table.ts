import { z } from "zod";
import { asEnum } from "../enums";

export const participantTable = z.object({
   id: z.uuid(),
   namaTim: z.string(),
   idML: z.string(),
   npm: z.string().nullable(),
   nama: z.string().nullable(),
   createdat: z.string(),
   updatedat: z.string(),
});

export const teamTable = z.object({
   id: z.string().nullable(),
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

export type ParticipantTable = z.infer<typeof participantTable>;
export type TeamTable = z.infer<typeof teamTable>;
