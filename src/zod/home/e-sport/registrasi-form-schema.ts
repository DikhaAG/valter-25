// app/form-schema.ts
import { z } from "zod";

export const registrasiPesertaSchema = z.object({
        id: z.uuidv4().optional(),
        idML: z
                .string()
                .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
        nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
        npm: z.string().min(1, { message: "NPM tidak boleh kosong." }),
});

export const registrasiFormSchema = z
        .object({
                namaTim: z
                        .string()
                        .min(1, { message: "Nama tim tidak boleh kosong" }),
                noWa: z
                        .string()
                        .min(1, { message: "Nomor WA tidak boleh kosong." }),
                instansi: z.string().min(1, {
                        message: "Asal instansi / komunitas tidak boleh kosong.",
                }),
                buktiPembayaran: z.any(),
                tim: z.array(registrasiPesertaSchema),
        })
        .refine(
                (data) => {
                        // Mengambil semua nilai NPM dari array
                        const npms = data.tim
                                .map((peserta) => peserta.npm)
                                .filter(Boolean);
                        const idMLs = data.tim
                                .map((p) => p.idML)
                                .filter(Boolean);
                        // Membuat Set untuk menghilangkan duplikat
                        const uniqueNpms = new Set(npms);
                        const uniqueIdMLs = new Set(idMLs);

                        // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
                        return (
                                npms.length === uniqueNpms.size ||
                                idMLs.length === uniqueIdMLs.size
                        );
                },
                {
                        // Pesan error jika validasi gagal
                        message: "Tidak boleh ada npm atau ID yang sama",
                        // Path di mana error akan ditampilkan
                        path: ["tim"],
                }
        );

export type RegistrasiFormSchema = z.infer<typeof registrasiFormSchema>;
