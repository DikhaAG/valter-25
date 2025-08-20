import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const timML = pgTable("tim_ml", {
  id: uuid("id").primaryKey(),
  namaTim: text("nama_tim").unique().notNull(),
  noWa: text("no_wa"),
  instansi: text("instansi"),
  buktiPembayaran: text("bukti_pembayaran").unique(),
});

export const pesertaML = pgTable("peserta_ml", {
  id: uuid("id").primaryKey(),
  namaTim: text("nama_tim")
    .notNull()
    .references(() => timML.namaTim, { onDelete: "cascade" }),
  idML: text("id_ml").unique().notNull(),
  npm: text("npm"),
  nama: text("nama"),
});

export const schema = {
          timML,
          pesertaML
}