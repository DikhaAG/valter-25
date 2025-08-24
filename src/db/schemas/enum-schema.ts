import { KABUPATEN_KOTA_SUMSEL } from "@/data/kabupaten-kote-sumsel";
import { pgEnum } from "drizzle-orm/pg-core";
export const asEnumTable = pgEnum("as_enum", ["mahasiswa", "umum"]);
export const kabupatenkotaEnum = pgEnum(
   "kabupaten_kota_enum",
   KABUPATEN_KOTA_SUMSEL
);
export const metodeDaftarEnum = pgEnum("metode_daftar", ["individu", "kelas"]);

export const enumSchema = { asEnumTable };
