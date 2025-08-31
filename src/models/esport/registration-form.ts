// app/form-schema.ts
import { emotError } from "@/data/emot-response";
import { isNumeric } from "@/utils/is-numeric";
import { asEnum } from "@/models/enums";
import { z } from "zod";
import { teamNameCheck } from "@/server/services/esport/tim-name-available-check";
import { noWaCheck } from "@/server/services/esport/no-wa-available-check";
import { idMlCheck } from "@/server/services/esport/id-ml-check";

/**
 * PESERTA MAHASISWa
 */
export const participantAsMahasiswa = z.object({
    id: z.uuid().optional(),
    idML: z
        .string()
        .min(1, { message: "ID Mobile Legends tidak boleh kosong." }),
    nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
    npm: z
        .string().min(1, { message: "NIM/NPM tidak boleh kosong." })


});
/**
 * PESERTA UMUM
 */
export const participantAsGeneral = z.object({
    id: z.uuid().optional(),
    idML: z
        .string()
        .min(1, { message: "ID Mobile Legends tidak boleh kosong." })
        .refine(async (idml) => {
            const res = await idMlCheck(idml)
        console.log(res)
            return res.success
        }, {
            error: "ID telah terdaftar"
        }),
    nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
});
// TIM MAHASISWA
export const teamAsMahasiswa = z
    .object({
        as: asEnum,
        namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
        noWa: z.string().min(11, {
            message: "Nomor Whatsapp minimal 11 angka.",
        }),
        instansi: z.string().min(1, {
            message: "Asal instansi/komunitas tidak boleh kosong.",
        }),
        buktiPembayaran: z.any(),
        peserta: z.array(participantAsMahasiswa),
    })
    .refine(
        async (data) => {
            const res = await teamNameCheck(data.namaTim);
            return res.success;
        },
        {
            error: "Nama Tim telah terdaftar!.",
            path: ["namaTim"],
        }
    )
    .refine(
        (data) => {
            return isNumeric(data.noWa);
        },
        {
            error: `Nomor Whatsapp tidak validsss!.`,
            path: ["noWa"],
        }
    )
    .refine(
        async (data) => {
            const res = await noWaCheck(data.noWa);
            return res.success;
        },
        {
            error: "Nomor Whatsapp telah terdaftar!.",
            path: ["noWa"],
        }
    )
    .refine(
        (data) => {
            return data.buktiPembayaran;
        },
        {
            error: `Bukti pembayaran belum diupload!.`,
            path: ["buktiPembayaran"],
        }
    )
    .superRefine((data, ctx) => {
        data.peserta.map((p, i) => {
            if (!isNumeric(p.npm)) {
                ctx.addIssue({
                    code: "custom",
                    message: "NPM tidak valid",
                    path: [`peserta[${i}].npm`],
                });
            }
        });
    })
    .refine(
        (data) => {
            const idMLs = data.peserta.map((p) => p.idML).filter(Boolean);
            // Membuat Set untuk menghilangkan duplikat
            const uniqueIdMLs = new Set(idMLs);

            // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
            return idMLs.length === uniqueIdMLs.size;
        },
        {
            // Pesan error jika validasi gagal
            error: `Tidak boleh ada ID yang sama!. ${emotError}`,
            // Path di mana error akan ditampilkan
            path: [`pesertaError`],
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
            error: `Tidak boleh ada NIM/NPM yang sama!. ${emotError}`,
            // Path di mana error akan ditampilkan
            path: [`pesertaError`],
        }
    )
    .refine(
        (data) => {
            return data.peserta.length >= 5;
        },
        {
            error: `Jumlah pemain minimal 5!.`,
            path: ["pesertaError"],
        }
    );
// TIM UMUM
export const teamAsGeneral = z
    .object({
        as: asEnum,
        namaTim: z.string().min(1, { message: "Nama tim tidak boleh kosong" }),
        noWa: z.string().min(11, {
            message: "Nomor Whatsapp minimal 11 angka.",
        }),
        instansi: z.string().min(1, {
            message: "Asal instansi/komunitas tidak boleh kosong.",
        }),
        buktiPembayaran: z.any(),
        peserta: z.array(participantAsGeneral),
    })
    .refine(
        async (data) => {
            const res = await teamNameCheck(data.namaTim);
            return res.success;
        },
        {
            error: "Nama Tim telah terdaftar!.",
            path: ["namaTim"],
        }
    )
    .refine(
        (data) => {
            return isNumeric(data.noWa);
        },
        {
            error: `Nomor Whatsapp tidak validsss!.`,
            path: ["noWa"],
        }
    )
    .refine(
        async (data) => {
            const res = await noWaCheck(data.noWa);
            return res.success;
        },
        {
            error: "Nomor Whatsapp telah terdaftar!.",
            path: ["noWa"],
        }
    )
    .refine(
        (data) => {
            return data.buktiPembayaran;
        },
        {
            error: `Bukti pembayaran belum diupload!.`,
            path: ["buktiPembayaran"],
        }
    )
    .refine(
        (data) => {
            const idMLs = data.peserta.map((p) => p.idML).filter(Boolean);
            // Membuat Set untuk menghilangkan duplikat
            const uniqueIdMLs = new Set(idMLs);

            // Memeriksa apakah jumlah item di Set sama dengan jumlah item di array asli
            return idMLs.length === uniqueIdMLs.size;
        },
        {
            // Pesan error jika validasi gagal
            error: `Tidak boleh ada ID yang sama!. ${emotError}`,
            // Path di mana error akan ditampilkan
            path: [`pesertaError`],
        }
    )
    .refine(
        (data) => {
            return data.peserta.length >= 5;
        },
        {
            error: `Jumlah pemain minimal 5!.`,
            path: ["pesertaError"],
        }
    );

export type ParticipantAsMahasiswa = z.infer<typeof participantAsMahasiswa>;
export type ParticipantAsGeneral = z.infer<typeof participantAsGeneral>;
export type TeamAsMahasiswa = z.infer<typeof teamAsMahasiswa>;
export type TeamAsGeneral = z.infer<typeof teamAsGeneral>;
