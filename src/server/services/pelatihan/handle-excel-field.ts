import { MahasiswaExcelRow } from "@/components/home/pelatihan/form-registration/kelas/main";
import { ClassRegstrationSchema } from "@/models/pelatihan/registration-form";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayReplace, UseFormReturn } from "react-hook-form";
import { read, utils } from "xlsx";

interface Props {
   e: React.ChangeEvent<HTMLInputElement>;
   setFileError: Dispatch<SetStateAction<string>>;
   form: UseFormReturn<ClassRegstrationSchema>;
   setColumnsError: Dispatch<SetStateAction<string>>;
   replace: UseFieldArrayReplace<ClassRegstrationSchema>;
}
export const handleFileChange = async ({
   e,
   setFileError,
   setColumnsError,
   form,
   replace,
}: Props) => {
   let file = e.target.files?.[0];
   if (!file) {
      setFileError("Pilih file terlebih dahulu.");
      form.setError("excelFile", { message: "File belum diupload." });
      return;
   }
   setFileError("");
   setColumnsError("");
   form.setValue("excelFile", file, { shouldValidate: true });

   file = form.getValues("excelFile");
   if (!file) {
      setFileError("Pilih file terlebih dahulu.");
      return;
   }
   setFileError("");
   setColumnsError("");

   try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet) as MahasiswaExcelRow[];

      if (json.length > 0) {
         console.log(json);
         const firstRow = json[0];
         const requiredColumns = ["nama", "npm", "noWa", "email"];
         const existingColumns = Object.keys(firstRow);

         const missingColumns = requiredColumns.filter(
            (col) => !existingColumns.includes(col)
         );

         if (missingColumns.length > 0) {
            setColumnsError(
               `File Excel tidak memiliki kolom yang diperlukan: ${missingColumns.join(
                  ", "
               )}`
            );
            form.resetField("participants");
            return;
         }

         // Validasi keunikan NPM
         const noWaValues = json.map((row) => row.noWa);
         const emailValues = json.map((row) => row.email);
         const uniqueNoWa = new Set(noWaValues);
         const uniqueEmail = new Set(emailValues);

         if (uniqueNoWa.size !== noWaValues.length) {
            setColumnsError(
               "Tidak boleh terdapat lebih dari satu nomor whatsapp yang sama"
            );
            form.resetField("participants");
            return;
         }
         if (uniqueEmail.size !== emailValues.length) {
            setColumnsError(
               "Tidak boleh terdapat lebih dari satu email yang sama"
            );
            form.resetField("participants");
            return;
         }

         replace(json);
      } else {
         setColumnsError("File Excel tidak berisi data.");
         form.resetField("participants");
      }
   } catch (error) {
      console.error("Gagal memproses file:", error);
      setFileError("Gagal membaca file. Pastikan formatnya benar.");
      form.resetField("participants");
   }
};
