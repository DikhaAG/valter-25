import { relations } from "drizzle-orm";
import { kelasTable, prodiTable } from "../schemas/kelas";
import { pendaftaranSeminarKelasTable } from "../schemas/seminar-schema";

export const prodiRelation = relations(prodiTable, ({ many }) => ({
   kelas: many(kelasTable),
}));

export const kelasRelation = relations(kelasTable, ({ one, many }) => ({
   prodi: one(prodiTable, {
      fields: [kelasTable.prodi],
      references: [prodiTable.nama],
   }),
   pendaftaranSeminarKelas: many(pendaftaranSeminarKelasTable),
}));

export const kelasRelations = { prodiRelation, kelasRelation };
