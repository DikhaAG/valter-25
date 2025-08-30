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

export const pesertaPelatihanTable = pgTable("peserta_pelatihan", {
   id: uuid("id").primaryKey().defaultRandom(),
   as: asEnumTable("as").notNull(),
   metodeDaftar: metodeDaftarEnum("metode_daftar").notNull(),
   kelas: text("kelas").references(() => pendaftaranPelatihanKelasTable.kelas, {
      onDelete: "cascade",
      onUpdate: "cascade",
   }),
   nama: text("nama").notNull(),
   npm: text("npm"),
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
export const pendaftaranPelatihanKelasTable = pgTable(
   "pendaftaran_pelatihan_kelas",
   {
      id: uuid("id").primaryKey().defaultRandom(),
      kelas: text("kelas")
         .unique()
         .notNull()
         .references(() => kelasTable.nama, {
            onDelete: "set null",
            onUpdate: "set default",
         }),
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

export const pelatihanSchema = {
   pesertaPelatihanTable,
   pendaftaranPelatihanKelasTable,
};
