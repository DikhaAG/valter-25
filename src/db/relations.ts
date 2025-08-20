import { relations } from "drizzle-orm";
import { timML, pesertaML } from "./schema";

// Definisi relasi
export const timRelations = relations(timML, ({ many }) => ({
  pesertaMLs: many(pesertaML),
}));

export const pesertaRelations = relations(pesertaML, ({ one }) => ({
  tim: one(timML, {
    fields: [pesertaML.namaTim],
    references: [timML.namaTim],
  }),
}));

export const relationsSchema = {timRelations, pesertaRelations}