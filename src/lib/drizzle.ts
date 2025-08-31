/**
 * @file db/drizzle.ts
 * @description File ini menginisialisasi koneksi database menggunakan Drizzle ORM
 * dan Neon (serverless driver). Konfigurasi dan skema database
 * dimuat untuk memastikan koneksi yang aman dan query yang
 * berorientasi pada tipe (type-safe).
 */
import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from "dotenv";
import { esportRelations } from "@/server/db/relations/esport-relation";
import { videoCampaignRelation } from "@/server/db/relations/video-campaign-relation";
import { webDesignRelations } from "@/server/db/relations/web-design-relation";
import { enumSchema } from "@/server/db/schemas/enum-schema";
import { esportSchema } from "@/server/db/schemas/esport-schema";
import { videoCampaignSchema } from "@/server/db/schemas/video-campaign-schema";
import { webDesignSchema } from "@/server/db/schemas/web-design-schema";
import { seminarSchema } from "@/server/db/schemas/seminar-schema";
import { kelasSchema } from "@/server/db/schemas/kelas";
import { kelasRelations } from "@/server/db/relations/kelas-relation";
import { seminarRelations } from "@/server/db/relations/seminar-relation";
import { pelatihanSchema } from "@/server/db/schemas/pelatihan";
import { pelatihanRelation } from "@/server/db/relations/pelatihan";
import { authSchema } from "@/server/db/schemas/auth-schema";
import { historySchema } from "@/server/db/schemas/history";
import postgres from "postgres";

// Memuat variabel lingkungan dari file .env
config({
    path: ".env",
});

/**
 * @constant sql
 * Inisialisasi klien Neon untuk membuat koneksi ke database.
 * Koneksi dibuat menggunakan URL yang disimpan di variabel lingkungan.
 */
// NEON
// const sql = neon(process.env.DATABASE_URL!);
const connectionString = process.env.POSTGRES_URL!

/**
 * @constant db
 * Instans utama Drizzle ORM yang akan digunakan untuk semua operasi database.
 * Konfigurasi ini menghubungkan Drizzle dengan klien Neon dan mendaftarkan
 * skema serta relasi database yang telah ditentukan.
 */
export const client = postgres(connectionString, {prepare: false})
export const db = drizzle({
    client,
    schema: {
        ...esportSchema,
        ...esportRelations,
        ...webDesignSchema,
        ...webDesignRelations,
        ...videoCampaignSchema,
        ...videoCampaignRelation,
        ...seminarSchema,
        ...seminarRelations,
        ...pelatihanSchema,
        ...pelatihanRelation,
        ...kelasSchema,
        ...kelasRelations,
        ...enumSchema,
        ...authSchema,
        ...historySchema
    },
});
