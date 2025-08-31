// components/ExportExcelButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { exportSemuaDataPesertaPelatihan } from "@/server/services/admin/ekspor-data";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";

export function ExportSemuaDataPesertaPelatihanButton() {
   const [isExporting, setIsExporting] = useState(false);

   const handleExport = async () => {
      setIsExporting(true);
      const result = await exportSemuaDataPesertaPelatihan();

      if (result.success && result.data) {
         // Ubah string Base64 kembali menjadi Uint8Array
         const byteCharacters = atob(result.data.data);
         const byteNumbers = new Array(byteCharacters.length);
         for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);

         // Buat Blob dan URL unduhan dari Uint8Array
         const blob = new Blob([byteArray], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         });
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", result.data.filename);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
      } else {
         console.error(result.message);
         alert("Gagal mengekspor data: " + result.message);
      }

      setIsExporting(false);
   };

   return (
      <Button onClick={handleExport} disabled={isExporting}>
         <IconDownload className="mr-2 h-4 w-4" />
         {isExporting ? "Mengekspor..." : "Ekspor ke Excel"}
      </Button>
   );
}
