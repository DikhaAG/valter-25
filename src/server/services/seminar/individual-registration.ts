"use server";

import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response";
import { pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import {
   participantAsGeneral,
   ParticipantAsGeneral,
   participantAsMahasiswa,
   ParticipantAsMahasiswa,
} from "@/models/seminar/registration-form";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import { db } from "@/lib/drizzle";

export async function individualRegistration({
   data,
}: {
   data: ParticipantAsMahasiswa | ParticipantAsGeneral;
}): Promise<ServerResponseType<string>> {
   let result: ParticipantAsMahasiswa | ParticipantAsGeneral;
   const { as } = data;
   try {
      if (as === "mahasiswa") {
         result = await participantAsMahasiswa.parseAsync(data);
      } else if (as === "umum") {
         result = await participantAsGeneral.parseAsync(data);
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
      const participantInsert = await db
         .insert(pesertaSeminarTable)
         .values({
            id: uuidv4(),
            as: result.as,
            metodeDaftar: "individu",
            nama: result.nama,
            noWa: result.noWa,
            email: result.email,
            domisili: result.domisili,
            instansi: (result as ParticipantAsMahasiswa).instansi,
            buktiPembayaran: buktiPembayaranUrl,
         })
         .returning({ insertedId: pesertaSeminarTable.id });
      return {
         success: true,
         data: participantInsert[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(pesertaSeminarTable)
         .where(eq(pesertaSeminarTable.email, result.email));
      if (isUniqueConstraintViolationError(error)) {
         if ((error as DrizzleQueryError).cause?.message.includes("noWa")) {
            return {
               success: false,
               message: "Nomor Whatsapp telah terdaftar.",
            };
         } else if (
            (error as DrizzleQueryError).cause?.message.includes("email")
         ) {
            return {
               success: false,
               message: "Email telah terdaftar.",
            };
         }
      }
      console.log(error);
      return {
         success: false,
         statusCode: 500,
         error: error,
         message: "Terjadi kesalahan pada server.",
      };
   }
}
