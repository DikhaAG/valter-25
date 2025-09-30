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
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function hapusPendaftaranKelasSeminar(
   idKelas: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .delete(pendaftaranSeminarKelasTable)
         .where(eq(pendaftaranSeminarKelasTable.id, idKelas));
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

export async function hapusPesertaIndividuSeminar(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .delete(pesertaSeminarTable)
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

export async function hapusPendaftaranKelasPelatihan(
   idKelas: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .delete(pendaftaranPelatihanKelasTable)
         .where(eq(pendaftaranPelatihanKelasTable.id, idKelas));
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

export async function hapusPesertaIndividuPelatihan(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .delete(pesertaPelatihanTable)
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

export async function hapusTimEsport(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db.delete(timEsportTable).where(eq(timEsportTable.id, id));
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

export async function hapusTimVideoCampagin(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db
         .delete(timVideoCampaignTable)
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

export async function hapusTimWebDesign(
   id: string
): Promise<ServerResponseType<unknown>> {
   try {
      await db.delete(timWebDesignTable).where(eq(timWebDesignTable.id, id));
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
