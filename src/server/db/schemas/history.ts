import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { actionHistoryEnum } from "./enum-schema";

export const historyTable = pgTable("history", {
   id: uuid().primaryKey().defaultRandom(),
   action: actionHistoryEnum("action"),
   tableName: text("table_name"),
   createdat: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
});

export const historySchema = { historyTable };
