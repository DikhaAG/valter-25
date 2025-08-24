import { z } from "zod";
import {
   asEnumSchema,
   kabupatenKotaEnumSchema,
   metodeDaftarEnumSchema,
} from "../enums/asEnum";
/**
 * - INDIVIDU
 *    -  MAHASISWA
 *          id
 *          as("mahasiswa")
 *          metodeDaftar("individu")
 *          nama
 *          no wa
 *          email
 *          instansi
 *          domisili
 *          buktiPembayaran
 *    -  UMUM
 *          id
 *          as("umum")
 *          metodeDaftar("individu")
 *          nama
 *          no wa
 *          email
 *          domisili
 *          buktiPembayaran
 * -  KELAS
 *    -  MAHASISWA
 *          id
 *          as("mahasiswa")
 *          metodeDaftar("kelas")
 *          kelas
 *          nama
 *          noWa
 *          email
 *          instansi("Politeknik Negeri Sriwijaya")
 *          domisili("Palembang")
 *          buktiPembayaran
 *
 */
export const pesertaSeminarTableSchema = z.object({
   id: z.uuid(),
   as: asEnumSchema,
   metodeDaftar: metodeDaftarEnumSchema,
   kelas: z.string().nullable(),
   nama: z.string().nullable(),
   noWa: z.string(),
   email: z.email(),
   instansi: z.string().nullable(),
   domisili: kabupatenKotaEnumSchema,
   buktiPembayaran: z.any(),
   statusPembayaran: z.boolean().default(false),
   tanggalKonfirmasi: z.string().nullable(),
   createdat: z.string(),
   updatedat: z.string(),
});

export const pendaftaranSeminarKelas = z.object({
   id: z.uuid(),
   kelas: z.string(),
   nominal: z.number(),
   buktiPembayaran: z.any(),
   createdat: z.string(),
   updatedat: z.string(),
   peserta: z.array(pesertaSeminarTableSchema),
});

export type PesertaSeminarTableSchemaType = z.infer<
   typeof pesertaSeminarTableSchema
>;
export type PendaftaranSeminarTableSchemaType = z.infer<
   typeof pendaftaranSeminarKelas
>;
