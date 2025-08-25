// File: utils/export-excel.ts

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TeamTable } from "@/models/web-design/table";

/**
 * Mengonversi data JSON ke format Excel dan memicu pengunduhan.
 * @param {object} data - Objek data tim.
 */
export const exportToExcel = ({ data }: { data: TeamTable }) => {
   let teamData, pesertaData;
   if (data.as === "mahasiswa") {
      // Siapkan data untuk sheet utama (informasi tim)
      teamData = [
         ["Informasi Tim"],
         ["Kode Tim", data.id],
         ["Nama Tim", data.namaTim],
         ["Nomor WhatsApp", data.noWa],
         ["Instansi", data.instansi],
         [
            "Status Pembayaran",
            data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
         ],
      ];

      // Siapkan data untuk sheet kedua (daftar peserta)
      pesertaData = [
         ["Daftar Peserta"],
         ["Nama", "NPM"],
         ...data.peserta.map((p) => [p.nama, p.npm]),
      ];
   } else if (data.as === "umum") {
      // Siapkan data untuk sheet utama (informasi tim)
      teamData = [
         ["Informasi Tim"],
         ["Kode Tim", data.id],
         ["Nama Tim", data.namaTim],
         ["Nomor WhatsApp", data.noWa],
         [
            "Status Pembayaran",
            data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
         ],
      ];

      // Siapkan data untuk sheet kedua (daftar peserta)
      pesertaData = [
         ["Daftar Peserta"],
         ["Nama"],
         ...data.peserta.map((p) => [p.nama]),
      ];
   }

   // Buat workbook dan sheets
   const workbook = XLSX.utils.book_new();
   const teamSheet = XLSX.utils.aoa_to_sheet(teamData!);
   const pesertaSheet = XLSX.utils.aoa_to_sheet(pesertaData!);

   XLSX.utils.book_append_sheet(workbook, teamSheet, "Informasi Tim");
   XLSX.utils.book_append_sheet(workbook, pesertaSheet, "Daftar Peserta");

   // Tulis workbook ke buffer dan simpan sebagai file
   const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
   });
   const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
   });

   saveAs(blob, `data_pendaftaran_web_design_valter_${data.namaTim}.xlsx`);
};
