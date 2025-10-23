/**
 * @file db/schemas/esport-schema.ts
 * @description File ini mendefinisikan skema tabel database untuk turnamen esport
 * menggunakan Drizzle ORM. Terdapat dua tabel utama: `timEsportTable`
 * dan `pesertaEsportTable`, yang terhubung melalui relasi.
 */
import { sql } from "drizzle-orm";
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { asEnumTable } from "./enum-schema";

/**
 * @constant timEsportTable
 * @description Skema untuk tabel `tim_esport`. Tabel ini menyimpan informasi
 * dasar setiap tim yang mendaftar.
 */
export const timEsportTable = pgTable("tim_esport", {
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
 * @constant pesertaEsportTable
 * @description Skema untuk tabel `peserta_esport`. Tabel ini menyimpan data
 * setiap peserta (pemain) yang terkait dengan sebuah tim.
 */
export const pesertaEsportTable = pgTable("peserta_esport", {
   /**
    * ID unik peserta.
    * Merupakan kunci utama (primary key).
    */
   id: uuid("id").primaryKey(),

   /**
    * Nama tim yang menjadi kunci asing (foreign key) ke `timEsportTable`.
    * Apabila tim dihapus, semua peserta yang terkait juga akan dihapus (onDelete: "cascade").
    */
   namaTim: text("nama_tim")
      .notNull()
      .references(() => timEsportTable.namaTim, {
         onDelete: "cascade",
      }),

   /**
    * ID in-game Mobile Legends.
    * Tidak boleh kosong dan harus unik.
    */
   idML: text("id_ml").unique().notNull(),

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
 * @constant esportSchema
 * @description Objek yang mengelompokkan semua skema tabel esport.
 * Digunakan untuk mendaftarkan skema dan relasi ke instance Drizzle.
 */
export const esportSchema = {
   timEsportTable,
   pesertaEsportTable,
};
