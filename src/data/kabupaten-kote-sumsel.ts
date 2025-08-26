import { kotaEnum } from "@/models/enums";

export const KABUPATEN_KOTA_SUMSEL = [
   "Palembang",
   "Pagar Alam",
   "Prabumulih",
   "Lubuklinggau",
   "Banyuasin",
   "Empat Lawang",
   "Lahat",
   "Muara Enim",
   "Musi Banyuasin",
   "Musi Rawas",
   "Musi Rawas Utara (Muratara)",
   "Ogan Ilir",
   "Ogan Komering Ilir (OKI)",
   "Ogan Komering Ulu (OKU)",
   "Ogan Komering Ulu Selatan (OKU Selatan)",
   "Ogan Komering Ulu Timur (Oku Timur)",
   "Penukal Abab Lematang Ilir (PALI)",
   "Lainnya",
] as const;

export type KABUPATEN_KOTA_SUMSEL_TYPE = readonly kotaEnum[];
