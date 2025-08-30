// File: utils/export-excel.ts

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ParticipantTable } from "@/models/pelatihan/table";

/**
 * Mengonversi data JSON ke format Excel dan memicu pengunduhan.
 * @param {object} data - Objek data tim.
 */
export const exportPesertaToExcel = ({ data }: { data: ParticipantTable }) => {
    let pesertaData;
    if (data.as === "mahasiswa") {
        // Siapkan data untuk sheet utama (informasi tim)
        pesertaData = [
            ["Informasi Peserta"],
            ["Kode Registrasi", data.id],
            ["Nama", data.nama],
            ["Nomor WhatsApp", data.noWa],
            ["Email", data.email],
            ["NIM/NPM", data.npm],
            ["Instansi", data.instansi],
            ["Domisili", data.domisili],
            [
                "Status Pembayaran",
                data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
            ],
        ];
    }
    else if (data.kelas) {
        // Siapkan data untuk sheet utama (informasi tim)
        pesertaData = [
            ["Informasi Peserta"],
            ["Kode Registrasi", data.id],
            ["Nama", data.nama],
            ["Nomor WhatsApp", data.noWa],
            ["Email", data.email],
            ["NIM/NPM", data.npm],
            ["Kelas", data.kelas],
            ["Instansi", data.instansi],
            ["Domisili", data.domisili],
            [
                "Status Pembayaran",
                data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
            ],
        ];
    }
    else if (data.as === "umum") {
        // Siapkan data untuk sheet utama (informasi tim)
        pesertaData = [
            ["Informasi Peserta"],
            ["Kode Registrasi", data.id],
            ["Nama", data.nama],
            ["Nomor WhatsApp", data.noWa],
            ["Email", data.email],
            ["Instansi/Komunitas", data.instansi],
            ["Domisili", data.domisili],
            [
                "Status Pembayaran",
                data.statusPembayaran ? "Terkonfirmasi" : "Menunggu dikonfirmasi",
            ],
        ];
    }

    // Buat workbook dan sheets
    const workbook = XLSX.utils.book_new();
    const pesertaSheet = XLSX.utils.aoa_to_sheet(pesertaData!);
    XLSX.utils.book_append_sheet(workbook, pesertaSheet, "Informasi Peserta");

    // Tulis workbook ke buffer dan simpan sebagai file
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `data_pendaftaran_pelatihan_valter_${data.nama}.xlsx`);
};
