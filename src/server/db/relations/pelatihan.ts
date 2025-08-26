import { relations } from "drizzle-orm";
import {
   pendaftaranPelatihanKelasTable,
   pesertaPelatihanTable,
} from "../schemas/pelatihan";
import { kelasTable } from "../schemas/kelas";

export const pesertaPelatihanRelation = relations(
   pesertaPelatihanTable,
   ({ one }) => ({
      kelas: one(pendaftaranPelatihanKelasTable, {
         fields: [pesertaPelatihanTable.kelas],
         references: [pendaftaranPelatihanKelasTable.kelas],
      }),
   })
);

export const pendaftaranPelatihanKelasRelation = relations(
   pendaftaranPelatihanKelasTable,
   ({ many, one }) => ({
      peserta: many(pesertaPelatihanTable),
      kelas: one(kelasTable, {
         fields: [pendaftaranPelatihanKelasTable.kelas],
         references: [kelasTable.nama],
      }),
   })
);

export const pelatihanRelation = {
   pesertaPelatihanRelation,
   pendaftaranPelatihanKelasRelation,
};
