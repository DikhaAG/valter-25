import { KABUPATEN_KOTA_SUMSEL } from "@/data/kabupaten-kote-sumsel";
import z from "zod";

export const asEnum = z.enum(["mahasiswa", "umum"]);
export const kotaEnum = z.enum(KABUPATEN_KOTA_SUMSEL, {
   error: "Domisili tidak boleh kosong!.",
});
export const metodeDaftarEnum = z.enum(["individu", "kelas"]);

export type AsEnum = z.infer<typeof asEnum>;
export type kotaEnum = z.infer<typeof kotaEnum>;
export type metodeDaftarEnum = z.infer<typeof metodeDaftarEnum>;
