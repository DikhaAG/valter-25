/**
 * Mengecek apakah sebuah objek error merupakan pelanggaran unique constraint.
 * Fungsi ini dirancang untuk bekerja dengan Drizzle ORM yang menggunakan driver `postgres`.
 * * @param error Objek error yang dilempar dari operasi Drizzle.
 * @returns `true` jika error disebabkan oleh pelanggaran unique constraint (PostgreSQL code '23505'), `false` jika tidak.
 */
import { DrizzleQueryError } from "drizzle-orm";
import { PostgresError } from "postgres";

export function isUniqueConstraintViolationError(error: unknown): boolean {
        if (!(error instanceof DrizzleQueryError)) {
                return false;
        }
        const cause = error.cause;
        if (!cause || typeof cause !== "object") {
                return false;
        }
        return "code" in cause && (cause as PostgresError).code === "23505";
}
