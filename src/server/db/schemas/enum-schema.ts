import { KABUPATEN_KOTA_INDONESIA } from "@/data/kabupaten-kote-indonesia";
import { pgEnum } from "drizzle-orm/pg-core";
export const asEnumTable = pgEnum("as_enum", ["mahasiswa", "umum"]);
export const prodiEnum = pgEnum("prodi_enum", ["D3 - TEKKOM", "D4 - TIMD"])
export type ProdiEnum = (typeof prodiEnum.enumValues)[number]
export const kabupatenkotaEnum = pgEnum(
   "kabupaten_kota_enum",
   KABUPATEN_KOTA_INDONESIA
);
export const metodeDaftarEnum = pgEnum("metode_daftar", ["individu", "kelas"]);
export const actionHistoryEnum = pgEnum("action_history", ["konfirmasi"])
export const divisiEnum = pgEnum("divisi", ["superadmin", "bph", "acara"])
export type DivisiEnum = (typeof divisiEnum.enumValues)[number];
export const enumSchema = { asEnumTable,prodiEnum, kabupatenkotaEnum, metodeDaftarEnum, actionHistoryEnum };
