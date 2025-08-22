/**
 * @file db/relations/web-design-relation.ts
 * @description File ini mendefinisikan relasi (hubungan) antar tabel database
 * untuk lomba web design. Relasi ini memungkinkan Drizzle ORM untuk melakukan
 * join secara otomatis dan mengambil data dari tabel terkait dengan mudah.
 */
import { relations } from "drizzle-orm";
import {
        pesertaWebDesignTable,
        timWebDesignTable,
} from "../schemas/web-design-schema";

/**
 * @constant timWebDesignRelation
 * @description Relasi `one-to-many` dari sisi tabel tim.
 * Sebuah tim dapat memiliki banyak peserta. Relasi ini memungkinkan
 * Drizzle untuk mengambil semua data peserta yang terhubung
 * dengan sebuah tim.
 */
export const timWebDesignRelation = relations(
        timWebDesignTable,
        ({ many }) => ({
                peserta: many(pesertaWebDesignTable),
        })
);

/**
 * @constant pesertaWebDesignRelation
 * @description Relasi `many-to-one` dari sisi tabel peserta.
 * Sebuah peserta hanya milik satu tim. Relasi ini menghubungkan
 * `pesertaWebDesignTable.namaTim` sebagai foreign key ke
 * `timWebDesignTable.namaTim`.
 */
export const pesertaWebDesignRelation = relations(
        pesertaWebDesignTable,
        ({ one }) => ({
                tim: one(timWebDesignTable, {
                        fields: [pesertaWebDesignTable.namaTim],
                        references: [timWebDesignTable.namaTim],
                }),
        })
);

/**
 * @constant webDesignRelations
 * @description Objek yang mengelompokkan semua definisi relasi
 * untuk skema esport. Digunakan untuk mendaftarkan relasi
 * ke instance Drizzle ORM.
 */
export const webDesignRelations = {
        timWebDesignRelation,
        pesertaWebDesignRelation,
};
