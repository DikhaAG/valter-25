"use server";
import {
        registrasiFormSchema,
        RegistrasiFormSchema,
} from "@/zod/home/e-sport/registrasi-form-schema";
import { uploadToCloudinary } from "./upload-to-cloudinary";
import { db } from "@/db/drizzle";
import { pesertaML, timML } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { isUniqueConstraintViolationError } from "@/utils/uniqueConstraintError";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { ServerResponseType } from "@/types/serverResponseType";

export async function submitFormAction(
        registrasiFormData: RegistrasiFormSchema
): Promise<ServerResponseType<string>> {
        const result = registrasiFormSchema.safeParse(registrasiFormData);
        if (!result.success) {
                return {
                        success: false,
                        error: result.error!.issues.join(", "),
                };
        }

        const { namaTim, noWa, instansi, buktiPembayaran, tim } = result.data;
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
                const insertTimML = await db
                        .insert(timML)
                        .values({
                                id: uuidv4(),
                                namaTim: namaTim.toLocaleLowerCase(),
                                noWa,
                                instansi,
                                buktiPembayaran: buktiPembayaranUrl,
                        })
                        .returning({ insertedId: timML.id });

                // Setelah berhasil, insert ke tabel pesertaML
                const pesertaToInsert = tim.map((p) => ({
                        id: uuidv4(),
                        namaTim: namaTim,
                        idML: p.idML,
                        nama: p.nama,
                        npm: p.npm,
                }));

                await db.insert(pesertaML).values(pesertaToInsert);

                return {
                        success: true,
                        data: insertTimML[0].insertedId,
                };
        } catch (error) {
                await db.delete(timML).where(eq(timML.namaTim, namaTim));
                if (isUniqueConstraintViolationError(error)) {
                        console.log("errroorooror=================");
                        console.log(
                                Object.keys((error as DrizzleQueryError).cause!)
                        );
                        console.log(typeof (error as DrizzleQueryError));
                        console.log(
                                (error as DrizzleQueryError).cause?.message
                        );

                        if (
                                (
                                        error as DrizzleQueryError
                                ).cause?.message.includes("id_ml")
                        ) {
                                return {
                                        success: false,
                                        message: "ID telah terdaftar.",
                                };
                        } else if (
                                (
                                        error as DrizzleQueryError
                                ).cause?.message.includes("npm")
                        ) {
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
