// Asumsi Anda menggunakan driver 'postgres'
import { DrizzleQueryError } from "drizzle-orm";
import { PostgresError } from "postgres";

/**
 * Mengecek apakah error adalah pelanggaran unique constraint pada PostgreSQL.
 * Kode error unik untuk unique constraint di Postgres adalah '23505'.
 *
 * @param error Objek error yang dilempar oleh Drizzle.
 * @returns true jika error adalah pelanggaran unique constraint.
 */
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
