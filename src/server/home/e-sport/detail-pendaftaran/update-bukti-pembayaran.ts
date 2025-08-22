/**
 * Server Action untuk memperbarui bukti pembayaran tim esport.
 *
 * Fungsi ini menerima file gambar baru dan nama tim, lalu mengunggahnya ke Cloudinary
 * dan memperbarui URL gambar di database.
 *
 * @param {object} params - Objek parameter.
 * @param {File} params.file - File gambar baru yang akan diunggah.
 * @param {string} params.namaTim - Nama tim yang bukti pembayarannya akan diperbarui.
 * @returns {Promise<object>} Sebuah promise yang mengembalikan objek dengan properti `success` jika berhasil, atau `error` jika gagal.
 * - Jika berhasil: `{ success: true }`.
 * - Jika gagal: `{ error: string }` dengan pesan kesalahan.
 */
"use server";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../../../utils/upload-to-cloudinary";
import { db } from "@/db/drizzle";
import { timEsportTable } from "@/db/schemas/esport-schema";
import { ServerResponseType } from "@/types/server-response-type";

// --- SERVER ACTION UNTUK UPDATE GAMBAR ---
export async function updateBuktiPembayaran({
        file,
        namaTim,
}: {
        file: File;
        namaTim: string;
}): Promise<ServerResponseType<unknown>> {
        if (!file) {
                return { message: "File tidak ditemukan.", success: false };
        }

        if (!namaTim) {
                return { message: "Nama tim tidak ditemukan.", success: false };
        }

        // Validasi file
        const MAX_FILE_SIZE_KB = 500;
        const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

        if (
                !ACCEPTED_IMAGE_TYPES.includes(file.type) ||
                file.size > MAX_FILE_SIZE_KB * 1024
        ) {
                return {
                        success: false,
                        message: "Jenis atau ukuran file tidak valid.",
                };
        }

        try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Unggah gambar baru ke Cloudinary
                const imageUrl = await uploadToCloudinary(buffer, file.name);

                // Perbarui URL gambar di database
                await db
                        .update(timEsportTable)
                        .set({ buktiPembayaran: imageUrl })
                        .where(eq(timEsportTable.namaTim, namaTim));

                return { success: true };
        } catch (error) {
                return {
                        message: "Gagal memperbarui gambar.",
                        error: error,
                        success: false,
                };
        }
}
