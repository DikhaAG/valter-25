"use server";

import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";
import { timEsportTable } from "@/server/db/schemas/esport-schema";
import { TeamTable } from "@/models/esport/table";
import { db } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";

export async function getTeamById(
   id: string
): Promise<ServerResponseType<TeamTable>> {
   try {
      const res = await db.query.timEsportTable.findFirst({
         with: { peserta: true },
         where: eq(timEsportTable.id, id),
      });
      if (!res) {
         return {
            success: false,
            message: `Data tim tidak ditemukan ${emotError}`,
         };
      }
      return {
         success: true,
         message: `Berhasil mengambil data tim. ${emotSuccess}`,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data tim ${emotError}`,
         error,
      };
   }
}

export async function getAllTeam({
   revPath,
}: {
   revPath: string;
}): Promise<ServerResponseType<TeamTable[]>> {
   try {
      const res = await db.query.timEsportTable.findMany({
         with: { peserta: true },
      });
      if (!res) {
         return {
            success: false,
            message: `Data tim tidak ditemukan ${emotError}`,
         };
      }
      revalidatePath(revPath)
      return {
         success: true,
         data: res,
      };
   } catch (error) {
      return {
         success: false,
         message: `Terjadi kesalahan dalam mengambil data tim ${emotError}`,
         error,
      };
   }
}
