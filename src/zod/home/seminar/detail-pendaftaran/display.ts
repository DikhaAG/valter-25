import { asEnumSchema } from "@/zod/tables/enums/asEnum";
import { pesertaWebDesignTableSchema } from "@/zod/tables/web-design/peserta";
import { z } from "zod";
export const webDesignRegistrationDisplaySchema = z.object({
   as: asEnumSchema,
   id: z.string(),
   namaTim: z.string(),
   noWa: z.string().nullable(),
   instansi: z.string().nullable(),
   buktiPembayaran: z.any(),
   statusPembayaran: z.boolean().default(false),
   peserta: z.array(pesertaWebDesignTableSchema),
});

export type WebDesignRegistrationDisplaySchemaType = z.infer<
   typeof webDesignRegistrationDisplaySchema
>;
