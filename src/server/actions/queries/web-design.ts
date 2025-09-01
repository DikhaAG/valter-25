/**
 * Server Action untuk mengambil data tim esport berdasarkan ID.
 *
 * Fungsi ini melakukan pencarian tim pada database berdasarkan `id` yang diberikan.
 * Data peserta yang terkait dengan tim juga akan ikut diambil (relasi one-to-many).
 *
 * @param id ID unik tim yang akan dicari.
 * @returns Sebuah Promise yang mengembalikan `ServerResponseType`.
 * - Jika tim ditemukan: `{ success: true, message: string, data: TimDisplaySchemaType }`
 * dengan data tim dan peserta.
 * - Jika tim tidak ditemukan: `{ success: false, message: "Data tim tidak ditemukan" }`.
 * - Jika terjadi kesalahan pada server: `{ success: false, message: "Terjadi kesalahan...", error: unknown }`.
 */
"use server";

import { emotError, emotSuccess } from "@/data/emot-response";
import { ServerResponseType } from "@/types/server-response";
import { eq } from "drizzle-orm";
import { timWebDesignTable } from "@/server/db/schemas/web-design-schema";
import { db } from "@/lib/drizzle";
import { TeamTable } from "@/models/web-design/table";
import { revalidatePath } from "next/cache";

export async function getTeamById(
   id: string
): Promise<ServerResponseType<TeamTable>> {
   try {
      const res = await db.query.timWebDesignTable.findFirst({
         with: { peserta: true },
         where: eq(timWebDesignTable.id, id),
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
      const res = await db.query.timWebDesignTable.findMany({
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
