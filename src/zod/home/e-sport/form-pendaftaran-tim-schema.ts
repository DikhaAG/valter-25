// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { z } from "zod";

/**
 * Skema validasi untuk setiap peserta (pemain) dalam sebuah tim.
 * @description
 * - `id`: ID unik untuk peserta, dibuat secara opsional.
 * - `idML`: ID in-game Mobile Legends. Harus diisi.
 * - `nama`: Nama lengkap peserta. Harus diisi.
 * - `npm`: Nomor Pokok Mahasiswa, harus berupa 12 digit angka.
 */
export const formPendaftaranPesertaEsportSchema = z.object({
        id: z.uuid().optional(),
        idML: z
                .string()
                .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
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
 * 1. Memastikan tidak ada duplikasi ID Mobile Legends di antara semua anggota.
 * 2. Memastikan tidak ada duplikasi NPM di antara semua anggota.
 *
 * @description
 * - `namaTim`: Nama unik untuk tim.
 * - `noWa`: Nomor WhatsApp kapten tim, minimal 11 angka.
 * - `instansi`: Nama instansi (kampus/sekolah) asal tim.
 * - `buktiPembayaran`: File bukti pembayaran. Tipe `any` digunakan karena validasi file biasanya ditangani secara terpisah.
 * - `peserta`: Sebuah array yang harus berisi skema validasi `formPendaftaranPesertaEsportSchema` untuk setiap pemain.
 */
export const formPendaftaranTimEsportSchema = z
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
                peserta: z.array(formPendaftaranPesertaEsportSchema),
        })
        .refine(
                (data) => {
                        const idMLs = data.peserta
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
 * Tipe inferensi dari skema validasi `formPendaftaranTimEsportSchema`.
 * Digunakan untuk memastikan keamanan tipe data tim yang sudah tervalidasi.
 */
export type FormPendaftaranTimEsportSchemaType = z.infer<
        typeof formPendaftaranTimEsportSchema
>;

/**
 * Tipe inferensi dari skema validasi `formPendaftaranPesertaEsportSchema`.
 * Digunakan untuk memastikan keamanan tipe data setiap peserta yang sudah tervalidasi.
 */
export type FormPendaftaranPesertaEsportSchemaType = z.infer<
        typeof formPendaftaranPesertaEsportSchema
>;
