// --- VALIDASI GAMBAR ---
export const MAX_FILE_SIZE_KB = 500;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export function isValidImageType(file: File): boolean {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

export function isFileSizeValid(file: File): boolean {
        return file.size <= MAX_FILE_SIZE_KB * 1024;
}
