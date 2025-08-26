import { sql } from "drizzle-orm";
import {
   pgTable,
   uuid,
   text,
   boolean,
   timestamp,
   integer,
} from "drizzle-orm/pg-core";
import {
   asEnumTable,
   kabupatenkotaEnum,
   metodeDaftarEnum,
} from "./enum-schema";
import { kelasTable } from "./kelas";

/**
 * - INDIVIDU
 *    -  MAHASISWA
 *          id
 *          as("mahasiswa")
 *          metodeDaftar("individu")
 *          nama
 *          no wa
 *          email
 *          instansi
 *          domisili
 *          buktiPembayaran
 *    -  UMUM
 *          id
 *          as("umum")
 *          metodeDaftar("individu")
 *          nama
 *          no wa
 *          email
 *          domisili
 *          buktiPembayaran
 * -  KELAS
 *    -  MAHASISWA
 *          id
 *          as("mahasiswa")
 *          metodeDaftar("kelas")
 *          kelas
 *          nama
 *          noWa
 *          email
 *          instansi("Politeknik Negeri Sriwijaya")
 *          domisili("Palembang")
 *          buktiPembayaran
 *
 */
export const pesertaSeminarTable = pgTable("peserta_seminar", {
   id: uuid("id").primaryKey().defaultRandom(),
   as: asEnumTable("as").notNull(),
   metodeDaftar: metodeDaftarEnum("metode_daftar").notNull(),
   kelas: text("kelas").references(() => pendaftaranSeminarKelasTable.kelas, {
      onDelete: "cascade",
   }),
   nama: text("nama").notNull(),
   noWa: text("no_wa").notNull().unique(),
   email: text("email").notNull().unique(),
   instansi: text("instansi"),
   domisili: kabupatenkotaEnum("domisili").notNull(),
   buktiPembayaran: text("bukti_pembayaran").notNull(),
   statusPembayaran: boolean("status_pembayaran").default(false).notNull(),
   tanggalKonfirmasi: timestamp("tanggal_konfirmasi", { mode: "string" }),
   createdat: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
   updatedat: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Setiap pendaftaran perkelas harus unique
 */
export const pendaftaranSeminarKelasTable = pgTable(
   "pendaftaran_seminar_kelas",
   {
      id: uuid("id").primaryKey().defaultRandom(),
      kelas: text("kelas")
         .unique()
         .notNull()
         .references(() => kelasTable.nama, { onDelete: "set null" }),
      nominal: integer("nominal").notNull(),
      buktiPembayaran: text("bukti_pembayaran").unique().notNull(),
      statusPembayaran: boolean("status_pembayaran").default(false).notNull(),
      tanggalKonfirmasi: timestamp("tanggal_konfirmasi", { mode: "string" }),
      createdat: timestamp("created_at", { mode: "string" })
         .defaultNow()
         .notNull(),
      updatedat: timestamp("updated_at", { mode: "string" })
         .defaultNow()
         .notNull()
         .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
   }
);

export const seminarSchema = {
   pesertaSeminarTable,
   pendaftaranSeminarKelasTable,
};
