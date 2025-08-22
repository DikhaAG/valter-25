/**
 * @file db/drizzle.ts
 * @description File ini menginisialisasi koneksi database menggunakan Drizzle ORM
 * dan Neon (serverless driver). Konfigurasi dan skema database
 * dimuat untuk memastikan koneksi yang aman dan query yang
 * berorientasi pada tipe (type-safe).
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { esportSchema } from "./schemas/esport-schema";
import { esportRelations } from "./relations/esport-relation";
import { webDesignSchema } from "./schemas/web-design-schema";
import { webDesignRelations } from "./relations/web-design-relation";
import { videoCampaignSchema } from "./schemas/video-campaign-schema";
import { videoCampaignRelation } from "./relations/video-campaign-relation";

// Memuat variabel lingkungan dari file .env
config({
   path: ".env",
});

/**
 * @constant sql
 * Inisialisasi klien Neon untuk membuat koneksi ke database.
 * Koneksi dibuat menggunakan URL yang disimpan di variabel lingkungan.
 */
const sql = neon(process.env.DATABASE_URL!);

/**
 * @constant db
 * Instans utama Drizzle ORM yang akan digunakan untuk semua operasi database.
 * Konfigurasi ini menghubungkan Drizzle dengan klien Neon dan mendaftarkan
 * skema serta relasi database yang telah ditentukan.
 */
export const db = drizzle({
   client: sql,
   schema: {
      ...esportSchema,
      ...esportRelations,
      ...webDesignSchema,
      ...webDesignRelations,
      ...videoCampaignSchema,
      ...videoCampaignRelation,
   },
});
