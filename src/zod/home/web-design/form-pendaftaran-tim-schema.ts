// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { z } from "zod";

/**
 * Skema validasi untuk setiap peserta lomba web-design dalam sebuah tim.
 * @description
 * - `id`: ID unik untuk peserta, dibuat secara opsional.
 * - `nama`: Nama lengkap peserta. Harus diisi.
 * - `npm`: Nomor Pokok Mahasiswa, harus berupa 12 digit angka.
 */
export const formPendaftaranPesertaSchema = z.object({
        id: z.uuid().optional(),
        nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
        npm: z
                .string()
                .min(12, { message: "NPM harus berjumlah 12 angka." })
                .max(12, { message: "NPM harus berjumlah 12 angka." }),
});

/**
 * Skema validasi untuk seluruh tim, termasuk informasi tim dan anggota-anggotanya.
 *
 * Skema ini melakukan dua validasi tambahan menggunakan `refine`:
 * 1. Memastikan tidak ada duplikasi NPM di antara semua anggota.
 *
 * @description
 * - `namaTim`: Nama unik untuk tim.
 * - `noWa`: Nomor WhatsApp kapten tim, minimal 11 angka.
 * - `instansi`: Nama instansi (kampus/sekolah) asal tim.
 * - `buktiPembayaran`: File bukti pembayaran. Tipe `any` digunakan karena validasi file biasanya ditangani secara terpisah.
 * - `peserta`: Sebuah array yang harus berisi skema validasi `formPendaftaranPesertaEsportSchema` untuk setiap pemain.
 */
export const formPendaftaranTimSchema = z
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
                peserta: z.array(formPendaftaranPesertaSchema),
        })
        .refine(
                (data) => {
                        // Mengambil semua nilai NPM dari array
                        const npms = data.peserta
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

/**
 * Tipe inferensi dari skema validasi `formPendaftaranTimSchema`.
 * Digunakan untuk memastikan keamanan tipe data tim yang sudah tervalidasi.
 */
export type FormPendaftaranTimSchemaType = z.infer<
        typeof formPendaftaranTimSchema
>;

/**
 * Tipe inferensi dari skema validasi `formPendaftaranPesertaSchema`.
 * Digunakan untuk memastikan keamanan tipe data setiap peserta yang sudah tervalidasi.
 */
export type FormPendaftaranPesertaSchemaType = z.infer<
        typeof formPendaftaranPesertaSchema
>;
