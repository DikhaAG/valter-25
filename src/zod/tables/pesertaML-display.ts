import { z } from "zod";

export const pesertaML = z.object({
        id: z.uuidv4(),
        idML: z.string(),
        nama: z.string().nullable(),
        npm: z.string().nullable(),
});

export type PesertaMLDisplayType = z.infer<typeof pesertaML>