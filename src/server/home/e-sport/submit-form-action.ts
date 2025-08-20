"use server";
import {
        registrasiFormSchema,
        RegistrasiFormSchema,
} from "@/zod/home/e-sport/registrasi-form-schema";
import { uploadToCloudinary } from "./upload-to-cloudinary";
import { db } from "@/db/drizzle";
import { pesertaML, timML } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function submitFormAction(
        registrasiFormData: RegistrasiFormSchema
) {
        const result = registrasiFormSchema.safeParse(registrasiFormData);
        if (!result.success) {
                return { error: result.error!.issues.join(", ") };
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
                await db.insert(timML).values({
                        id: uuidv4(),
                        namaTim: namaTim.toLocaleLowerCase(),
                        noWa,
                        instansi,
                        buktiPembayaran: buktiPembayaranUrl,
                });

                // Setelah berhasil, insert ke tabel pesertaML
                const pesertaToInsert = tim.map((p) => ({
                        id: uuidv4(),
                        namaTim: namaTim,
                        idML: p.idML,
                        nama: p.nama,
                        npm: p.npm,
                }));

                await db.insert(pesertaML).values(pesertaToInsert);

                return { success: true };
        } catch (error) {
                console.error("Gagal memproses form:", error);
                return {
                        error: "Gagal memproses permintaan. Periksa log server.",
                };
        }
}
