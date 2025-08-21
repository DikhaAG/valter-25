import { sql } from "drizzle-orm";
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const timML = pgTable("tim_ml", {
        id: uuid("id").primaryKey(),
        namaTim: text("nama_tim").unique().notNull(),
        noWa: text("no_wa"),
        instansi: text("instansi"),
        buktiPembayaran: text("bukti_pembayaran").unique(),
        statusPembayaran: boolean("status_pembayaran").default(false).notNull(),
        createdat: timestamp("created_at", { mode: "string" })
                .defaultNow()
                .notNull(),
        updatedat: timestamp("updated_at", { mode: "string" })
                .defaultNow()
                .notNull()
                .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const pesertaML = pgTable("peserta_ml", {
        id: uuid("id").primaryKey(),
        namaTim: text("nama_tim")
                .notNull()
                .references(() => timML.namaTim, { onDelete: "cascade" }),
        idML: text("id_ml").unique().notNull(),
        npm: text("npm").unique().notNull(),
        nama: text("nama"),
        createdat: timestamp("created_at", { mode: "string" })
                .defaultNow()
                .notNull(),
        updatedat: timestamp("updated_at", { mode: "string" })
                .defaultNow()
                .notNull()
                .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const schema = {
        timML,
        pesertaML,
};
