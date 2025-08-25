import z from "zod";

export const kelasTableSchema = z.object({
   id: z.uuid(),
   nama: z.string(),
   prodi: z.string(),
});

export const prodiTableSchema = z.object({
   id: z.uuid(),
   nama: z.string(),
   kelas: z.array(kelasTableSchema),
});

export type ProdiTableSchema = z.infer<typeof prodiTableSchema>;
export type KelasTableSchema = z.infer<typeof kelasTableSchema>;
