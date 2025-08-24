import { relations } from "drizzle-orm";
import { kelasTable, prodiTable } from "../schemas/kelas";

export const prodiRelation = relations(prodiTable, ({ many }) => ({
   kelas: many(kelasTable),
}));

export const kelasRelation = relations(kelasTable, ({ one }) => ({
   prodi: one(prodiTable, {
      fields: [kelasTable.prodi],
      references: [prodiTable.nama],
   }),
}));