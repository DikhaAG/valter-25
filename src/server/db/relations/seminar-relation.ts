import { relations } from "drizzle-orm";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "../schemas/seminar-schema";
import { kelasTable } from "../schemas/kelas";

export const pesertaSeminarRelation = relations(
   pesertaSeminarTable,
   ({ one }) => ({
      kelas: one(pendaftaranSeminarKelasTable, {
         fields: [pesertaSeminarTable.kelas],
         references: [pendaftaranSeminarKelasTable.kelas],
      }),
   })
);

export const pendaftaranSeminarKelasRelation = relations(
   pendaftaranSeminarKelasTable,
   ({ many, one }) => ({
      peserta: many(pesertaSeminarTable),
      kelas: one(kelasTable, {
         fields: [pendaftaranSeminarKelasTable.kelas],
         references: [kelasTable.nama],
      }),
   })
);

export const seminarRelations = {
   pesertaSeminarRelation,
   pendaftaranSeminarKelasRelation,
};
