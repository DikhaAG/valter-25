/**
 * Mengunggah file (dalam bentuk buffer) ke Cloudinary.
 *
 * @param buffer Buffer dari file yang akan diunggah.
 * @param originalFileName Nama asli file yang diunggah.
 * @returns Sebuah Promise yang mengembalikan URL aman (secure URL) dari file yang diunggah.
 * @throws Mengembalikan error jika proses unggahan ke Cloudinary gagal.
 */
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(
   file: unknown,
   originalFileName: string
): Promise<string> {
   if (!(file instanceof File)) {
      throw new Error("Gambar tidak valid!.");
   }
   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);
   return new Promise<string>((resolve, reject) => {
      const uniquePublicId = `${uuidv4()}-${originalFileName}`;
      cloudinary.uploader
         .upload_stream(
            {
               resource_type: "auto",
               public_id: uniquePublicId,
            },
            (error, result) => {
               if (error || !result) {
                  return reject(error);
               }
               resolve(result.secure_url);
            }
         )
         .end(buffer);
   });
}
