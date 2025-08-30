// File: utils/export-excel.ts

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ClassRegistrationTable } from "@/models/pelatihan/table";

/**
 * Mengonversi data JSON ke format Excel dan memicu pengunduhan.
 * @param {object} data - Objek data tim.
 */
export const exportKelasToExcel = ({
    data,
}: {
    data: ClassRegistrationTable;
}) => {
    const kelasData = [
        ["Informasi Kelas"],
        ["Kode registrasi", data.id],
        ["Nama Kelas", data.kelas],
        ["Nominal", data.nominal],
        [
            "Status Pembayaran",
            data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
        ],
        [""],
        ["Daftar Peserta"],
        ["Nama", "NPM", "Nomor Whatsapp", "Email"],
        ...data.peserta.map((p) => [p.nama,p.npm, p.noWa, p.email]),
    ];

    // Siapkan data untuk sheet kedua (daftar peserta)

    // Buat workbook dan sheets
    const workbook = XLSX.utils.book_new();
    const kelasSheet = XLSX.utils.aoa_to_sheet(kelasData!);

    XLSX.utils.book_append_sheet(workbook, kelasSheet, "Informasi Kelas");

    // Tulis workbook ke buffer dan simpan sebagai file
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `data_pendaftaran_pelatihan_valter_${data.kelas}.xlsx`);
};
