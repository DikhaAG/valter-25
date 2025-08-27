import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadFormatDataKelasExcel = () => {
   // Allow string values for keys like '!ref'
   const formatDataKelasSheet: {
      [key: string]: XLSX.CellObject | XLSX.Range | string;
   } = {};

   // Each cell value must be a CellObject, not just a string.
   formatDataKelasSheet["A1"] = {
      v: "nama",
      t: "s",
   };
   formatDataKelasSheet["B1"] = {
      v: "email",
      t: "s",
   };
   formatDataKelasSheet["C1"] = {
      v: "noWa",
      t: "s",
   };

   formatDataKelasSheet["A2"] = {
      v: "<nama lengkap>",
      t: "s",
   };
   formatDataKelasSheet["B2"] = {
      v: "contoh@email.com",
      t: "s",
   };
   formatDataKelasSheet["C2"] = {
      v: "0811xxx",
      t: "s",
   };

   // This line is now valid because we've added `string` to the type union
   formatDataKelasSheet["!ref"] = "A1:C2"; // Use a simple string here

   // Create a new workbook and append the formatted sheet
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(
      workbook,
      formatDataKelasSheet as XLSX.WorkSheet,
      "Format data mahasiswa"
   );

   // Write the workbook to a buffer and save as a file
   const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
   });
   const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
   });

   saveAs(blob, `format_data_mahasiswa_valter.xlsx`);
};
