import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const prodiTable = pgTable("prodi", {
   id: uuid().primaryKey().defaultRandom(),
   nama: text("nama").notNull().unique(),
});

export const kelasTable = pgTable("kelas", {
   id: uuid("id").primaryKey().defaultRandom(),
   nama: text("nama").unique().notNull(),
   prodi: text("prodi")
      .notNull()
      .references(() => prodiTable.nama, { onDelete: "cascade" }),
});

export const kelasSchema = { kelasTable };
