"use server";

import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(
        buffer: Buffer,
        originalFileName: string
) {
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
