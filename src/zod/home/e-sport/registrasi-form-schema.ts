// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { z } from "zod";

export const registrasiPesertaSchema = z.object({
        id: z.uuidv4().optional(),
        idML: z
                .string()
                .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
        nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
        npm: z
                .string()
                .min(12, { message: "NPM harus berjumlah 12 angka." })
                .max(12, { message: "NPM harus berjumlah 12 angka." }),
});

export const registrasiFormSchema = z
        .object({
                namaTim: z
                        .string()
                        .min(1, { message: "Nama tim tidak boleh kosong" }),
                noWa: z.string().min(11, {
                        message: "Nomor Whatsapp minimal 11 angka.",
                }),
                instansi: z.string().min(1, {
                        message: "Asal instansi tidak boleh kosong.",
                }),
                buktiPembayaran: z.any(),
                tim: z.array(registrasiPesertaSchema),
        })
        .refine(
                (data) => {
                        const idMLs = data.tim
                                .map((p) => p.idML)
                                .filter(Boolean);
                        // Membuat Set untuk menghilangkan duplikat
                        const uniqueIdMLs = new Set(idMLs);

                        // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
                        return idMLs.length === uniqueIdMLs.size;
                },
                {
                        // Pesan error jika validasi gagal
                        error: `Tidak boleh ada ID yang sama!. ${emotError}`,
                        // Path di mana error akan ditampilkan
                        path: [`npmatauidsama`],
                }
        )
        .refine(
                (data) => {
                        // Mengambil semua nilai NPM dari array
                        const npms = data.tim
                                .map((peserta) => peserta.npm)
                                .filter(Boolean);
                        // Membuat Set untuk menghilangkan duplikat
                        const uniqueNpms = new Set(npms);

                        // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
                        return npms.length === uniqueNpms.size;
                },
                {
                        // Pesan error jika validasi gagal
                        error: `Tidak boleh ada NPM yang sama!. ${emotError}`,
                        // Path di mana error akan ditampilkan
                        path: [`npmatauidsama`],
                }
        );

export type RegistrasiFormSchema = z.infer<typeof registrasiFormSchema>;
export type RegistrasiPesertaSchema = z.infer<typeof registrasiPesertaSchema>;
