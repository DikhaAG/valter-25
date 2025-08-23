import { pgEnum } from "drizzle-orm/pg-core";
export const asEnumTable = pgEnum("as_enum", ["mahasiswa", "umum"]);

export const enumSchema = { asEnumTable };
