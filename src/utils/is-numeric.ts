/**
 * Mengecek apakah sebuah string hanya berisi digit (0-9).
 *
 * @param str String yang akan diuji.
 * @returns true jika string hanya berisi angka, false jika tidak.
 */
export function isNumeric(str: string): boolean {
        if (typeof str !== "string" || str.length === 0) {
                return false;
        }
        return /^[0-9]+$/.test(str);
}
