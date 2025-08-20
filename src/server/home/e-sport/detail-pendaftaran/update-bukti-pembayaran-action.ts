"use server";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../upload-to-cloudinary";
import { timML } from "@/db/schema";
import { db } from "@/db/drizzle";

// --- SERVER ACTION UNTUK UPDATE GAMBAR ---
export async function updateBuktiPembayaranAction({
        file,
        namaTim,
}: {
        file: File;
        namaTim: string;
}) {
        if (!file) {
                return { error: "File tidak ditemukan." };
        }

        if (!namaTim) {
                return { error: "Nama tim tidak ditemukan." };
        }

        // Validasi file
        const MAX_FILE_SIZE_KB = 500;
        const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

        if (
                !ACCEPTED_IMAGE_TYPES.includes(file.type) ||
                file.size > MAX_FILE_SIZE_KB * 1024
        ) {
                return { error: "Jenis atau ukuran file tidak valid." };
        }

        try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Unggah gambar baru ke Cloudinary
                const imageUrl = await uploadToCloudinary(buffer, file.name);

                // Perbarui URL gambar di database
                await db
                        .update(timML)
                        .set({ buktiPembayaran: imageUrl })
                        .where(eq(timML.namaTim, namaTim));

                return { success: true };
        } catch (error) {
                console.error("Gagal memperbarui gambar:", error);
                return { error: "Gagal memperbarui gambar." };
        }
}
