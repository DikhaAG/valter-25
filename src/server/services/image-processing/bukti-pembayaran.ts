// src/server/actions/payment-proof.ts
"use server";

import { ServerResponseType } from "@/types/server-response";
import { createWorker } from "tesseract.js";

export async function buktiPembayaranImageProcessing(image: File): Promise<
   ServerResponseType<{
      accountNumber: string | null;
      amount: number | null;
   }>
> {
   // Validasi form data dengan Zod
   // const validatedFields = PaymentProofSchema.safeParse({
   //    paymentFile: formData.get("paymentFile"),
   //    description: formData.get("description"),
   // });

   // if (!validatedFields.success) {
   //    return { error: "Validasi gagal. Mohon periksa kembali file Anda." };
   // }

   const arrayBuffer = await image.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);

   // Proses OCR menggunakan Tesseract.js
   try {
      const worker = await createWorker("eng", 1); // 'eng' untuk bahasa Inggris
      const {
         data: { text },
      } = await worker.recognize(buffer);
      await worker.terminate();
      console.log("=====================");
      console.log("======= IMAGE PROCESSING ============");

      // Logika untuk mengurai teks dan mengekstrak data
      const extractedData = extractDataFromText(text); // Fungsi kustom

      return { success: true, data: extractedData };
      // // Simpan data ke database Drizzle
      // await db.insert(yourTable).values({
      //    filename: file.name,
      //    extractedText: text,
      //    // Simpan data hasil ekstraksi
      //    accountNumber: extractedData.accountNumber,
      //    amount: extractedData.amount,
      // });
   } catch (error) {
      console.error("OCR Error:", error);
      return {
         success: false,
         message: "Gagal memproses gambar. Mohon coba lagi.",
         error,
      };
   }
}

// Fungsi dummy untuk mengurai teks
// Anda perlu mengimplementasikan logika regex yang lebih kompleks di sini
function extractDataFromText(text: string) {
   const accountNumberMatch = text.match(/No\. Rekening: (\d+)/);
   const amountMatch = text.match(/Jumlah Transfer: (\d+(\.\d{2})?)/);

   return {
      accountNumber: accountNumberMatch ? accountNumberMatch[1] : null,
      amount: amountMatch ? parseFloat(amountMatch[1]) : null,
   };
}
