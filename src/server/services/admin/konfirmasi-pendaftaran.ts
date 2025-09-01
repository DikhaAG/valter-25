"use server";
import { db } from "@/lib/drizzle";
import { timEsportTable } from "@/server/db/schemas/esport-schema";
import {
   pendaftaranPelatihanKelasTable,
   pesertaPelatihanTable,
} from "@/server/db/schemas/pelatihan";
import {
   pendaftaranSeminarKelasTable,
   pesertaSeminarTable,
} from "@/server/db/schemas/seminar-schema";
import { timVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { timWebDesignTable } from "@/server/db/schemas/web-design-schema";
import { ServerResponseType } from "@/types/server-response";
import { getCurrentPostgresTimestamp } from "@/utils/get-current-postgres-timestamp";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function konfirmasiPendaftaranKelasSeminar(
   idKelas: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateKelas = await db
         .update(pendaftaranSeminarKelasTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(pendaftaranSeminarKelasTable.id, idKelas));

      const getKelas = await db.query.pendaftaranSeminarKelasTable.findFirst({
         with: { peserta: true },
         where: eq(pendaftaranSeminarKelasTable.id, idKelas),
      });

      getKelas!.peserta.forEach(async (mhs) => {
         await db
            .update(pesertaSeminarTable)
            .set({
               statusPembayaran: true,
               tanggalKonfirmasi: getCurrentPostgresTimestamp(),
            })
            .where(eq(pesertaSeminarTable.id, mhs.id));
      });
      revalidatePath("/admin/seminar");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}

export async function konfirmasiPesertaIndividuSeminar(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateRes = await db
         .update(pesertaSeminarTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(pesertaSeminarTable.id, id));

      revalidatePath("/admin/seminar");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}

export async function konfirmasiPendaftaranKelasPelatihan(
   idKelas: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateKelas = await db
         .update(pendaftaranPelatihanKelasTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(pendaftaranPelatihanKelasTable.id, idKelas));

      const getKelas = await db.query.pendaftaranPelatihanKelasTable.findFirst({
         with: { peserta: true },
         where: eq(pendaftaranPelatihanKelasTable.id, idKelas),
      });

      getKelas!.peserta.forEach(async (mhs) => {
         await db
            .update(pesertaPelatihanTable)
            .set({
               statusPembayaran: true,
               tanggalKonfirmasi: getCurrentPostgresTimestamp(),
            })
            .where(eq(pesertaPelatihanTable.id, mhs.id));
      });
      revalidatePath("/admin/pelatihan");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}

export async function konfirmasiPesertaIndividuPelatihan(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateRes = await db
         .update(pesertaPelatihanTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(pesertaPelatihanTable.id, id));
      revalidatePath("/admin/pelatihan");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}

export async function konfirmasiTimEsport(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateRes = await db
         .update(timEsportTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(timEsportTable.id, id));
      revalidatePath("/admin/esport");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}

export async function konfirmasiTimVideoCampaign(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateRes = await db
         .update(timVideoCampaignTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(timVideoCampaignTable.id, id));
      revalidatePath("/admin/video-campaign");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}


export async function konfirmasiTimWebDesign(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      const updateRes = await db
         .update(timWebDesignTable)
         .set({
            statusPembayaran: true,
            tanggalKonfirmasi: getCurrentPostgresTimestamp(),
         })
         .where(eq(timWebDesignTable.id, id));
      revalidatePath("/admin/web-design");

      return {
         success: true,
      };
   } catch (e) {
      return {
         success: false,
         message: `${e}`,
      };
   }
}
