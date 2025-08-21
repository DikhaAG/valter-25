/**
 * Konstanta dan fungsi utilitas untuk validasi file gambar.
 * Digunakan untuk memeriksa tipe dan ukuran file yang diunggah.
 */

// --- VALIDASI GAMBAR ---

/**
 * Ukuran maksimum file yang diizinkan dalam kilobyte (KB).
 * @constant
 */
export const MAX_FILE_SIZE_KB = 500;

/**
 * Array berisi tipe MIME (Multipurpose Internet Mail Extensions) gambar yang diizinkan.
 * @constant
 */
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * Mengecek apakah tipe file yang diunggah sesuai dengan tipe yang diizinkan.
 *
 * @param file Objek File dari input unggahan.
 * @returns `true` jika tipe file valid, `false` jika tidak.
 * @example
 * // return true
 * isValidImageType(file)
 */
export function isValidImageType(file: File): boolean {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

/**
 * Mengecek apakah ukuran file tidak melebihi batas maksimum yang ditentukan.
 *
 * @param file Objek File dari input unggahan.
 * @returns `true` jika ukuran file valid, `false` jika tidak.
 * @example
 * // return true
 * isFileSizeValid(file)
 */
export function isFileSizeValid(file: File): boolean {
        return file.size <= MAX_FILE_SIZE_KB * 1024;
}
