import { z } from "zod";
import { pesertaEsportTableSchema } from "./peserta";

/**
 * Skema validasi untuk data tim esport yang diambil dari database.
 * Digunakan untuk memastikan konsistensi struktur data tim saat ditampilkan
 * atau diproses di aplikasi.
 */
export const timEsportTableSchema = z.object({
        /**
         * ID unik tim.
         * @example "c1d2e3f4-g5h6-7i8j-9k0l-1m2n3o4p5q6r"
         */
        id: z.string(),

        /**
         * Nama tim.
         * @example "Tim Mulmeds"
         */
        namaTim: z.string(),

        /**
         * Nomor WhatsApp kapten tim. Properti ini bisa bernilai `null`.
         * @example "081234567890"
         */
        noWa: z.string().nullable(),

        /**
         * Nama instansi (kampus/sekolah) asal tim. Properti ini bisa bernilai `null`.
         * @example "Polsri"
         */
        instansi: z.string().nullable(),

        /**
         * Data bukti pembayaran. Tipe `any` digunakan karena ini adalah file
         * yang sudah diunggah dan validasinya telah dilakukan sebelumnya.
         */
        buktiPembayaran: z.any(),

        /**
         * Status pembayaran tim. Nilai defaultnya adalah `false`.
         * Digunakan sebagai indikator di antarmuka pengguna.
         */
        statusPembayaran: z.boolean().default(false),

        /**
         * Array berisi data peserta yang terkait dengan tim ini.
         * Tipe datanya divalidasi oleh `pesertaEsportTableSchema`.
         */
        pesertaEsport: z.array(pesertaEsportTableSchema),
});

/**
 * Tipe inferensi untuk skema `timEsportTableSchema`.
 * Digunakan untuk memastikan keamanan tipe data tim yang diambil dari database.
 */
export type TimEsportTableSchemaType = z.infer<typeof timEsportTableSchema>;
