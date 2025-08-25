/**
 * @file db/schemas/esport-schema.ts
 * @description File ini mendefinisikan skema tabel database untuk lomba video campaign
 * menggunakan Drizzle ORM. Terdapat dua tabel utama: `timVideoCampaignTable`
 * dan `pesertaVideoCampaignTable`, yang terhubung melalui relasi.
 */
import { sql } from "drizzle-orm";
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { asEnumTable } from "./enum-schema";

/**
 * @constant timVideoCampaignTable
 * @description Skema untuk tabel `tim_video_campaign`. Tabel ini menyimpan informasi
 * dasar setiap tim yang mendaftar.
 */
export const timVideoCampaignTable = pgTable("tim_video_campaign", {
   as: asEnumTable("as").notNull(),
   /**
    * ID unik tim.
    * Merupakan kunci utama (primary key).
    */
   id: uuid("id").primaryKey(),

   /**
    * Nama unik tim.
    * Tidak boleh kosong dan harus unik.
    */
   namaTim: text("nama_tim").unique().notNull(),

   /**
    * Nomor WhatsApp kapten tim.
    * Tipe data teks.
    */
   noWa: text("no_wa").notNull(),

   /**
    * Nama instansi atau asal tim.
    * Tipe data teks.
    */
   instansi: text("instansi"),

   /**
    * URL bukti pembayaran.
    * Nilai harus unik untuk setiap tim.
    */
   buktiPembayaran: text("bukti_pembayaran").unique().notNull(),

   /**
    * Status pembayaran tim.
    * Nilai default-nya adalah `false` dan tidak boleh kosong.
    */
   statusPembayaran: boolean("status_pembayaran").default(false).notNull(),
   tanggalKonfirmasi: timestamp("tanggal_konfirmasi", { mode: "string" }),

   /**
    * Timestamp saat data pertama kali dibuat.
    * Ditetapkan secara otomatis saat insert.
    */
   createdat: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),

   /**
    * Timestamp saat data terakhir diperbarui.
    * Diperbarui secara otomatis saat ada perubahan pada baris.
    */
   updatedat: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

/**
 * @constant pesertaVideoCampaignTable
 * @description Skema untuk tabel `peserta_web_design`. Tabel ini menyimpan data
 * setiap peserta yang terkait dengan sebuah tim.
 */
export const pesertaVideoCampaignTable = pgTable("peserta_video_campaign", {
   /**
    * ID unik peserta.
    * Merupakan kunci utama (primary key).
    */
   id: uuid("id").primaryKey(),

   /**
    * Nama tim yang menjadi kunci asing (foreign key) ke `timWebDesignTable`.
    * Apabila tim dihapus, semua peserta yang terkait juga akan dihapus (onDelete: "cascade").
    */
   namaTim: text("nama_tim")
      .notNull()
      .references(() => timVideoCampaignTable.namaTim, {
         onDelete: "cascade",
      }),

   /**
    * Nomor Pokok Mahasiswa (NPM).
    * Tidak boleh kosong dan harus unik.
    */
   npm: text("npm"),

   /**
    * Nama lengkap peserta.
    * Tipe data teks.
    */
   nama: text("nama"),

   /**
    * Timestamp saat data pertama kali dibuat.
    */
   createdat: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),

   /**
    * Timestamp saat data terakhir diperbarui.
    */
   updatedat: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

/**
 * @constant videoCampaignSchema
 * @description Objek yang mengelompokkan semua skema tabel web design.
 * Digunakan untuk mendaftarkan skema dan relasi ke instance Drizzle.
 */
export const videoCampaignSchema = {
   timVideoCampaignTable,
   pesertaVideoCampaignTable,
};
