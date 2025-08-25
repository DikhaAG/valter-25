"use server";

import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response";
import {
   pesertaVideoCampaignTable,
   timVideoCampaignTable,
} from "@/server/db/schemas/video-campaign-schema";
import {
   ParticipantAsMahasiswa,
   teamAsGeneral,
   TeamAsGeneral,
   teamAsMahasiswa,
   TeamAsMahasiswa,
} from "@/models/video-campaign/registration-form";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import { db } from "@/lib/drizzle";

export async function registration({
   data,
}: {
   data: TeamAsMahasiswa | TeamAsGeneral;
}): Promise<ServerResponseType<string>> {
   let result: TeamAsMahasiswa | TeamAsGeneral;
   const { as } = data;
   try {
      if (as === "mahasiswa") {
         result = await teamAsMahasiswa.parseAsync(data);
      } else if (as === "umum") {
         result = await teamAsGeneral.parseAsync(data);
      }
   } catch (error) {
      return {
         success: false,
         message: "Data yang diberikan tidak valid!.",
         error: error,
      };
   }
   if (!result!) {
      return {
         success: false,
         message: "Data yang diberikan tidak valid!.",
      };
   }

   try {
      const buktiPembayaranUrl = await uploadToCloudinary(
         result.buktiPembayaran,
         result.buktiPembayaran.name
      );

      // Insert ke tabel timML
      const insertTim = await db
         .insert(timVideoCampaignTable)
         .values({
            id: uuidv4(),
            as: "mahasiswa",
            namaTim: result.namaTim,
            noWa: result.noWa,
            instansi: (result as TeamAsMahasiswa).instansi,
            buktiPembayaran: buktiPembayaranUrl,
         })
         .returning({ insertedId: timVideoCampaignTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const pesertaToInsert = result.peserta.map((p) => ({
         id: uuidv4(),
         namaTim: result.namaTim,
         nama: p.nama,
         npm: (p as ParticipantAsMahasiswa).npm,
      }));

      await db.insert(pesertaVideoCampaignTable).values(pesertaToInsert);

      return {
         success: true,
         data: insertTim[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(timVideoCampaignTable)
         .where(eq(timVideoCampaignTable.namaTim, result.namaTim));
      if (isUniqueConstraintViolationError(error)) {
         if ((error as DrizzleQueryError).cause?.message.includes("npm")) {
            return {
               success: false,
               message: "NPM telah terdaftar.",
            };
         }
      }
      return {
         success: false,
         statusCode: 500,
         error: error,
         message: "Gagal memproses permintaan. Periksa log server.",
      };
   }
}
