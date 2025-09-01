// app/actions/export-data.ts
"use server";

import * as XLSX from "xlsx";
import { db } from "@/lib/drizzle";
import { pesertaSeminarTable } from "@/server/db/schemas/seminar-schema";
import { ServerResponseType } from "@/types/server-response";
import { pesertaPelatihanTable } from "@/server/db/schemas/pelatihan";
import { pesertaEsportTable } from "@/server/db/schemas/esport-schema";
import { pesertaVideoCampaignTable } from "@/server/db/schemas/video-campaign-schema";
import { pesertaWebDesignTable } from "@/server/db/schemas/web-design-schema";

export async function exportSemuaDataPesertaSeminar(): Promise<
   ServerResponseType<{ data: string; filename: string }>
> {
   try {
      // Fetch all data from the participantTable using Drizzle
      const allParticipants = await db.select().from(pesertaSeminarTable);

      if (!allParticipants || allParticipants.length === 0) {
         return {
            success: false,
            message: "Tidak ada data peserta untuk diekspor.",
         };
      }

      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(allParticipants);

      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Peserta");

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(workbook, {
         bookType: "xlsx",
         type: "buffer",
      });

      // Ubah buffer (Uint8Array) menjadi string Base64
      const base64String = Buffer.from(excelBuffer).toString("base64");
      // We can't directly trigger a download from a Server Action,
      // so we return the buffer and handle the download on the client.
      return {
         success: true,
         data: { data: base64String, filename: "Data_Peserta_Seminar.xlsx" },
      };
   } catch (error) {
      console.error("Error exporting data:", error);
      return { success: false, message: "Gagal mengekspor data: " + error };
   }
}

export async function exportSemuaDataPesertaPelatihan(): Promise<
   ServerResponseType<{ data: string; filename: string }>
> {
   try {
      // Fetch all data from the participantTable using Drizzle
      const allParticipants = await db.select().from(pesertaPelatihanTable);

      if (!allParticipants || allParticipants.length === 0) {
         return {
            success: false,
            message: "Tidak ada data peserta untuk diekspor.",
         };
      }

      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(allParticipants);

      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Peserta");

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(workbook, {
         bookType: "xlsx",
         type: "buffer",
      });

      // Ubah buffer (Uint8Array) menjadi string Base64
      const base64String = Buffer.from(excelBuffer).toString("base64");
      // We can't directly trigger a download from a Server Action,
      // so we return the buffer and handle the download on the client.
      return {
         success: true,
         data: { data: base64String, filename: "Data_Peserta_Pelatihan.xlsx" },
      };
   } catch (error) {
      console.error("Error exporting data:", error);
      return { success: false, message: "Gagal mengekspor data: " + error };
   }
}

export async function exportSemuaDataPesertaEsport(): Promise<
   ServerResponseType<{ data: string; filename: string }>
> {
   try {
      // Fetch all data from the participantTable using Drizzle
      const allParticipants = await db.select().from(pesertaEsportTable);

      if (!allParticipants || allParticipants.length === 0) {
         return {
            success: false,
            message: "Tidak ada data peserta untuk diekspor.",
         };
      }

      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(allParticipants);

      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Peserta");

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(workbook, {
         bookType: "xlsx",
         type: "buffer",
      });

      // Ubah buffer (Uint8Array) menjadi string Base64
      const base64String = Buffer.from(excelBuffer).toString("base64");
      // We can't directly trigger a download from a Server Action,
      // so we return the buffer and handle the download on the client.
      return {
         success: true,
         data: { data: base64String, filename: "Data_Peserta_Esport.xlsx" },
      };
   } catch (error) {
      console.error("Error exporting data:", error);
      return { success: false, message: "Gagal mengekspor data: " + error };
   }
}


export async function exportSemuaDataPesertaVideoCampaign(): Promise<
   ServerResponseType<{ data: string; filename: string }>
> {
   try {
      // Fetch all data from the participantTable using Drizzle
      const allParticipants = await db.select().from(pesertaVideoCampaignTable);

      if (!allParticipants || allParticipants.length === 0) {
         return {
            success: false,
            message: "Tidak ada data peserta untuk diekspor.",
         };
      }

      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(allParticipants);

      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Peserta");

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(workbook, {
         bookType: "xlsx",
         type: "buffer",
      });

      // Ubah buffer (Uint8Array) menjadi string Base64
      const base64String = Buffer.from(excelBuffer).toString("base64");
      // We can't directly trigger a download from a Server Action,
      // so we return the buffer and handle the download on the client.
      return {
         success: true,
         data: { data: base64String, filename: "Data_Peserta_Video_Campaign.xlsx" },
      };
   } catch (error) {
      console.error("Error exporting data:", error);
      return { success: false, message: "Gagal mengekspor data: " + error };
   }
}


export async function exportSemuaDataPesertaWebDesign(): Promise<
   ServerResponseType<{ data: string; filename: string }>
> {
   try {
      // Fetch all data from the participantTable using Drizzle
      const allParticipants = await db.select().from(pesertaWebDesignTable);

      if (!allParticipants || allParticipants.length === 0) {
         return {
            success: false,
            message: "Tidak ada data peserta untuk diekspor.",
         };
      }

      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(allParticipants);

      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Peserta");

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(workbook, {
         bookType: "xlsx",
         type: "buffer",
      });

      // Ubah buffer (Uint8Array) menjadi string Base64
      const base64String = Buffer.from(excelBuffer).toString("base64");
      // We can't directly trigger a download from a Server Action,
      // so we return the buffer and handle the download on the client.
      return {
         success: true,
         data: { data: base64String, filename: "Data_Peserta_Web_Design.xlsx" },
      };
   } catch (error) {
      console.error("Error exporting data:", error);
      return { success: false, message: "Gagal mengekspor data: " + error };
   }
}
