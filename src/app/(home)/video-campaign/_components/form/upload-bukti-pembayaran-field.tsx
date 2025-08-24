/**
 * Komponen klien React untuk mengunggah bukti pembayaran.
 *
 * Komponen ini terintegrasi dengan react-hook-form untuk mengelola state
 * input dan validasi. Ini menyediakan fungsionalitas drag-and-drop,
 * validasi tipe/ukuran file, dan preview gambar secara instan.
 *
 * @param {object} props
 * @param {ControllerRenderProps<FormPendaftaranTimSchemaType>} props.field - Properti dari `ControllerRenderProps` untuk mengintegrasikan input dengan form induk.
 * @param {UseFormReturn<FormPendaftaranTimSchemaType>} props.form - Objek form lengkap dari `useForm` untuk mengakses metode seperti `setValue` dan `setError`.
 */
"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
   isValidImageType,
   isFileSizeValid,
   MAX_FILE_SIZE_KB,
   ACCEPTED_IMAGE_TYPES,
} from "@/utils/home/image-upload-requirements";
import { VideoCampaignTimMahasiswaFormSchemaType } from "@/zod/home/video-campaign/mahasiswa-form";
import { VideoCampaignTimUmumFormSchemaType } from "@/zod/home/video-campaign/umum-form";

interface Props {
   form:
      | UseFormReturn<VideoCampaignTimUmumFormSchemaType>
      | UseFormReturn<VideoCampaignTimMahasiswaFormSchemaType>;
}

export function UploadBuktiPembayaranField({ form }: Props) {
   /**
    * State untuk menyimpan URL sementara dari gambar yang diunggah untuk preview.
    * @default null
    */
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

   /**
    * Fungsi callback yang dipanggil oleh `useDropzone` saat file dijatuhkan atau dipilih.
    * Ia menangani validasi file dan memperbarui state form induk.
    *
    * @param {File[]} acceptedFiles - Array file yang diterima oleh `react-dropzone`.
    */
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         const file = acceptedFiles?.[0];

         // Reset state jika tidak ada file yang diterima
         if (!file) {
            setPreviewUrl(null);
            return;
         }

         // Validasi tipe file
         if (!isValidImageType(file)) {
            form.setError(`buktiPembayaran`, {
               type: "invalid_type",
               message: "Jenis file harus JPG, JPEG, atau PNG.",
            });
            setPreviewUrl(null);
            return;
         }

         // Validasi ukuran file
         if (!isFileSizeValid(file)) {
            form.setError(`buktiPembayaran`, {
               type: "too_large",
               message: `Ukuran file maksimal ${MAX_FILE_SIZE_KB}KB.`,
            });
            setPreviewUrl(null);
            return;
         }

         // Jika validasi berhasil, hapus error dan perbarui nilai form
         form.clearErrors(`buktiPembayaran`);
         (
            form as UseFormReturn<
               | VideoCampaignTimMahasiswaFormSchemaType
               | VideoCampaignTimUmumFormSchemaType
            >
         ).setValue(`buktiPembayaran`, file, {
            shouldValidate: true,
         });
         // Buat URL objek untuk menampilkan preview
         setPreviewUrl(URL.createObjectURL(file));
      },
      [form]
   );

   /**
    * Hook `useDropzone` yang menginisialisasi fungsionalitas dropzone.
    */
   const { getRootProps, getInputProps } = useDropzone({
      accept: { "image/*": ACCEPTED_IMAGE_TYPES },
      maxFiles: 1,
      onDrop,
   });

   return (
      <div className="flex flex-col gap-2">
         {/* Area dropzone */}
         <div
            {...getRootProps()}
            className="transition-all duration-100 ease-in -translate-x-1 -translate-y-1 hover:translate-0 border-4 border-dashed border-foreground/70 shadow-[8px_8px_0px_#00000040] hover:shadow-none rounded-md p-4 cursor-pointer hover:bg-[#00000040]/10"
         >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center text-center space-y-2 font-poppins">
               <Upload className="h-5 w-5 text-muted-foreground" />
               <p className="text-sm text-muted-foreground">
                  Seret & lepas gambar di sini atau klik untuk{" "}
                  {previewUrl ? "upload" : "mengubah"}
               </p>
               <p className="text-xs text-muted-foreground">
                  (JPG, JPEG, PNG, maks {MAX_FILE_SIZE_KB}KB)
               </p>
            </div>
         </div>
         {/* Area preview gambar */}
         {previewUrl && (
            <div className="overflow-hidden rounded-md flex items-center justify-center py-10 px-2">
               <Image
                  src={previewUrl ? previewUrl : ""}
                  alt="Preview"
                  className="max-w-sm w-full object-cover border-4 border-foreground rounded-md shadow-[8px_8px_0px_#00000040]"
                  width={100}
                  height={100}
               />
            </div>
         )}
         {/* Area pesan kesalahan */}
         {form.formState.errors.buktiPembayaran?.message && (
            <p className="text-sm font-medium text-destructive mt-1 font-poppins">
               {`${form.formState.errors.buktiPembayaran?.message}`}
            </p>
         )}
      </div>
   );
}
