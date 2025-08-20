// app/form-schema.ts
import { z } from "zod";
import { pesertaML } from "./pesertaML-display";

export const timMLDisplaySchema = z.object({
          id: z.string(),
        namaTim: z.string(),
        noWa: z.string().nullable(),
        instansi: z.string().nullable(),
        buktiPembayaran: z.any(),
        pesertaMLs: z.array(pesertaML),
});

export type TimMLDisplaySchema = z.infer<typeof timMLDisplaySchema>;
