"use server";

import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/is-unique-constraint-error";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/server-response";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "@/server/db/schemas/seminar-schema";
import {
   classRegstrationSchema,
   ClassRegstrationSchema,
} from "@/models/seminar/registration-form";
import { uploadToCloudinary } from "@/server/services/upload-to-cloudinary";
import { db } from "@/lib/drizzle";
import { ParticipantTable } from "@/models/seminar/table";

export async function classRegistration({
   data,
}: {
   data: ClassRegstrationSchema;
}): Promise<ServerResponseType<string>> {
   const result = await classRegstrationSchema.parseAsync(data);

   if (!result) {
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
      const classInsert = await db
         .insert(pendaftaranSeminarKelasTable)
         .values({
            id: uuidv4(),
            kelas: result.kelas,
            nominal: result.nominal,
            buktiPembayaran: buktiPembayaranUrl,
         })
         .returning({ insertedId: pesertaSeminarTable.id });

      // Setelah berhasil, insert ke tabel pesertaML
      const participants: ParticipantTable[] = result.participants.map((p) => ({
         id: uuidv4(),
         as: "mahasiswa",
         metodeDaftar: "kelas",
         kelas: result.kelas,
         nama: p.nama,
         noWa: p.noWa,
         email: p.email,
         instansi: "Politeknik Negeri Sriwijaya",
         domisili: "Palembang",
         buktiPembayaran: buktiPembayaranUrl,
         statusPembayaran: false,
         tanggalKonfirmasi: null,
         createdat: getCurrentPostgresTimestamp(),
         updatedat: getCurrentPostgresTimestamp(),
      }));

      await db.insert(pesertaSeminarTable).values(participants);

      return {
         success: true,
         data: classInsert[0].insertedId,
      };
   } catch (error) {
      await db
         .delete(pendaftaranSeminarKelasTable)
         .where(eq(pendaftaranSeminarKelasTable.kelas, result.kelas));
      if (isUniqueConstraintViolationError(error)) {
         if ((error as DrizzleQueryError).cause?.message.includes("kelas")) {
            return {
               success: false,
               message: "Kelas telah terdaftar.",
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
