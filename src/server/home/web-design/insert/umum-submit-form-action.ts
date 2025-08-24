"use server";

import { db } from "@/db/drizzle";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response-type";
import { uploadToCloudinary } from "@/utils/home/upload-to-cloudinary";
import {
   WebDesignTimUmumFormSchemaType,
   webDesignTimUmumFormSchema,
} from "@/zod/home/web-design/umum-form";
import {
   pesertaWebDesignTable,
   timWebDesignTable,
} from "@/db/schemas/web-design-schema";

export async function webDesignUmumSubmitFormAction(
   registrasiFormData: WebDesignTimUmumFormSchemaType
): Promise<ServerResponseType<string>> {
   const result = await webDesignTimUmumFormSchema.parseAsync(
      registrasiFormData
   );

   const { namaTim, noWa, buktiPembayaran, peserta } = result;
   let buktiPembayaranUrl: string | null = null;

   try {
      if (buktiPembayaran instanceof File) {
         const arrayBuffer = await buktiPembayaran.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
         buktiPembayaranUrl = await uploadToCloudinary(
            buffer,
            buktiPembayaran.name
         );
      }

      // Insert ke tabel timML
      const insertTim = await db
         .insert(timWebDesignTable)
         .values({
            id: uuidv4(),
            as: "umum",
            namaTim: namaTim,
            noWa,
            buktiPembayaran: buktiPembayaranUrl!,
         })
         .returning({ insertedId: timWebDesignTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const pesertaToInsert = peserta.map((p) => ({
         id: uuidv4(),
         namaTim: namaTim,
         nama: p.nama,
      }));

      await db.insert(pesertaWebDesignTable).values(pesertaToInsert);

      return {
         success: true,
         data: insertTim[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(timWebDesignTable)
         .where(eq(timWebDesignTable.namaTim, namaTim));
      return {
         success: false,
         statusCode: 500,
         error: error,
         message: "Gagal memproses permintaan. Periksa log server.",
      };
   }
}
