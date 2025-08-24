import { KABUPATEN_KOTA_SUMSEL } from "@/data/kabupaten-kote-sumsel";
import z from "zod";

export const asEnumSchema = z.enum(["mahasiswa", "umum"]);
export const kabupatenKotaEnumSchema = z.enum(KABUPATEN_KOTA_SUMSEL);
export const metodeDaftarEnumSchema = z.enum(["individu", "kelas"])