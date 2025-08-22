/**
 * @file db/relations/video-campaign-relation.ts
 * @description File ini mendefinisikan relasi (hubungan) antar tabel database
 * untuk lomba video campaign. Relasi ini memungkinkan Drizzle ORM untuk melakukan
 * join secara otomatis dan mengambil data dari tabel terkait dengan mudah.
 */
import { relations } from "drizzle-orm";
import {
   pesertaVideoCampaignTable,
   timVideoCampaignTable,
} from "../schemas/video-campaign-schema";

/**
 * @constant timVideoCampaignRelation
 * @description Relasi `one-to-many` dari sisi tabel tim.
 * Sebuah tim dapat memiliki banyak peserta. Relasi ini memungkinkan
 * Drizzle untuk mengambil semua data peserta yang terhubung
 * dengan sebuah tim.
 */
export const timVideoCampaignRelation = relations(
   timVideoCampaignTable,
   ({ many }) => ({
      peserta: many(pesertaVideoCampaignTable),
   })
);

/**
 * @constant pesertaVideoCampaignRelation
 * @description Relasi `many-to-one` dari sisi tabel peserta.
 * Sebuah peserta hanya milik satu tim. Relasi ini menghubungkan
 * `pesertaWebDesignTable.namaTim` sebagai foreign key ke
 * `timWebDesignTable.namaTim`.
 */
export const pesertaVideoCampaignRelation = relations(
   pesertaVideoCampaignTable,
   ({ one }) => ({
      tim: one(timVideoCampaignTable, {
         fields: [pesertaVideoCampaignTable.namaTim],
         references: [timVideoCampaignTable.namaTim],
      }),
   })
);

/**
 * @constant videoCampaignRelation
 * @description Objek yang mengelompokkan semua definisi relasi
 * untuk skema esport. Digunakan untuk mendaftarkan relasi
 * ke instance Drizzle ORM.
 */
export const videoCampaignRelation = {
   timVideoCampaignRelation,
   pesertaVideoCampaignRelation,
};
