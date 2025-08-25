/**
 * @file db/relations/esport-relation.ts
 * @description File ini mendefinisikan relasi (hubungan) antar tabel database
 * untuk turnamen esport. Relasi ini memungkinkan Drizzle ORM untuk melakukan
 * join secara otomatis dan mengambil data dari tabel terkait dengan mudah.
 */
import { relations } from "drizzle-orm";
import { pesertaEsportTable, timEsportTable } from "../schemas/esport-schema";

/**
 * @constant timEsportRelation
 * @description Relasi `one-to-many` dari sisi tabel tim.
 * Sebuah tim dapat memiliki banyak peserta. Relasi ini memungkinkan
 * Drizzle untuk mengambil semua data peserta yang terhubung
 * dengan sebuah tim.
 */
export const timEsportRelation = relations(timEsportTable, ({ many }) => ({
   peserta: many(pesertaEsportTable),
}));

/**
 * @constant pesertaEsportRelation
 * @description Relasi `many-to-one` dari sisi tabel peserta.
 * Sebuah peserta hanya milik satu tim. Relasi ini menghubungkan
 * `pesertaEsportTable.namaTim` sebagai foreign key ke
 * `timEsportTable.namaTim`.
 */
export const pesertaEsportRelation = relations(
   pesertaEsportTable,
   ({ one }) => ({
      tim: one(timEsportTable, {
         fields: [pesertaEsportTable.namaTim],
         references: [timEsportTable.namaTim],
      }),
   })
);

/**
 * @constant esportRelations
 * @description Objek yang mengelompokkan semua definisi relasi
 * untuk skema esport. Digunakan untuk mendaftarkan relasi
 * ke instance Drizzle ORM.
 */
export const esportRelations = { timEsportRelation, pesertaEsportRelation };
