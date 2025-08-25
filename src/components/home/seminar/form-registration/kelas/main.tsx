"use client";
// PACKAGES
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/nb/input";
import { Checkbox } from "@/components/ui/nb/checkbox";
import { Label } from "@/components/ui/nb/label";
import {
   useForm,
   FormProvider,
   FieldErrors,
   useFieldArray,
   useWatch,
} from "react-hook-form";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
   FormDescription,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/nb/Spinner";
import { UploadBuktiPembayaranField } from "../upload-bukti-pembayaran-field";
import {
   classRegstrationSchema,
   ClassRegstrationSchema,
} from "@/models/seminar/registration-form";
import ProdiSelector from "@/components/home/seminar/form-registration/prodi-selector";
import { ProdiTableSchema } from "@/models/kelas/table";
import { getAllProdiWithKelas } from "@/server/actions/queries/kelas";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { read, utils } from "xlsx";
import { wrapSymbols } from "@/utils/wrap-symbols";

type ExcelRow = {
   nama: string;
   noWa: string;
   email: string;
};
export function KelasForm() {
   const [termsChecked, setTermsChecked] = useState<boolean>(false);
   const [prodiData, setProdiData] = useState<ProdiTableSchema[]>();
   const [fileError, setFileError] = useState("");
   const [columnsError, setColumnsError] = useState("");
   const router = useRouter();
   const form = useForm<ClassRegstrationSchema>({
      resolver: zodResolver(classRegstrationSchema),
      defaultValues: { nominal: 0, excelFile: undefined, participants: [] },
      mode: "all",
   });
   const { fields, replace } = useFieldArray({
      control: form.control,
      name: "participants",
   });
   const watchedRows = useWatch({
      control: form.control,
      name: "participants",
   });
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
         setFileError("Pilih file terlebih dahulu.");
         return;
      }
      setFileError("");
      setColumnsError("");
      form.setValue("excelFile", file, { shouldValidate: true });
   };

   const handleProcessFile = async () => {
      const file = form.getValues("excelFile");
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
         const json = utils.sheet_to_json(sheet) as ExcelRow[];

         if (json.length > 0) {
            console.log(json);
            const firstRow = json[0];
            const requiredColumns = ["nama", "noWa", "email"];
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

   async function onSubmit(data: ClassRegstrationSchema) {
      console.log(data);
      const { nominal, participants } = data;
      const htm = 60_000;
      const nominalSeharusnya = participants.length * htm;
      if (nominal < nominalSeharusnya) {
         CustomToast({
            variant: "warning",
            message: "Nominal bayar kurang dari total yang seharusnya",
         });
         form.setError("nominal", {
            message: "Nominal bayar kurang dari total yang seharusnya",
         });
         return;
      } else if (nominal > nominalSeharusnya) {
         CustomToast({
            variant: "warning",
            message: "Nominal bayar lebih dari total yang seharusnya",
         });
         form.setError("nominal", {
            message: "Nominal bayar lebih dari total yang seharusnya",
         });
         return;
      }
      console.log(data)
      CustomToast({
         variant: "success",
         message: "Berhasil!",
      });
      return;
      // const res = await classRegistration({ data });
      // if (!res.success) {
      //    CustomToast({
      //       variant: "warning",
      //       message: `${res.message} 😂💀`,
      //    });
      //    setLoading(false);
      //    return;
      // } else {
      //    CustomToast({
      //       variant: "success",
      //       message: `Berhasil melakukan pendaftaran 😂. Tunggu admin untuk konfirmasi 😘`,
      //    });
      //    form.reset();
      //    sessionStorage.setItem("kodeTim", res.data!);
      //    router.push("/seminar/detail-pendaftaran");
      // }
   }
   useEffect(() => {
      getAllProdiWithKelas().then((res) => {
         if (res.success) {
            setProdiData(res.data);
         }
      });
   }, []);
   function handleFormError(e: FieldErrors) {
      console.log(e);
      if (Object.keys(e).includes("buktiPembayaran")) {
         CustomToast({
            variant: "warning",
            message: "Bukti pembayaran belum diupload!.",
         });
      }
      if (Object.keys(e).includes("participants")) {
         CustomToast({
            variant: "warning",
            message: "Data mahasiswa belum diupload!.",
         });
      }
   }
   return (
      <FormProvider {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit, handleFormError)}
            className="space-y-8"
         >
            <div className="">
               <FormField
                  control={form.control}
                  name={`kelas`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel className="text-xs">Kelas</FormLabel>
                        <FormControl className="">
                           <ProdiSelector
                              prodiData={prodiData!}
                              onKelasChange={(kelas) => {
                                 form.setValue(field.name, kelas?.nama || "");
                              }}
                           />
                        </FormControl>
                        <FormDescription className="font-poppins">
                           Pilih Program studi terlebih dahulu untuk memilih
                           kelas.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div>
               <FormField
                  control={form.control}
                  name={`nominal`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>Nominal Bayar</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="ex: 120000."
                              {...field}
                              onChange={(e) =>
                                 form.setValue(
                                    "nominal",
                                    e.target.value
                                       ? parseInt(e.target.value)
                                       : 0
                                 )
                              }
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div>
               <FormField
                  control={form.control}
                  name={`buktiPembayaran`}
                  render={({}) => (
                     <>
                        <FormItem>
                           <FormLabel className="mb-2">
                              Bukti Pembayaran
                           </FormLabel>
                           <FormControl>
                              <UploadBuktiPembayaranField form={form} />
                           </FormControl>
                           <FormMessage className="text-foreground mt-20" />
                        </FormItem>
                     </>
                  )}
               />
            </div>
            <div className="">
               <FormField
                  control={form.control}
                  name="excelFile"
                  render={({}) => (
                     <FormItem>
                        <FormLabel>Data Mahasiswa</FormLabel>
                        <FormControl>
                           <Input
                              type="file"
                              accept=".xlsx"
                              onChange={handleFileChange}
                              className="cursor-pointer"
                           />
                        </FormControl>
                        <FormDescription className="font-poppins">
                           Unggah file Excel (.xlsx) yang berisi data mahasiswa.
                        </FormDescription>
                        {fileError && (
                           <p className="font-poppins text-sm font-medium text-destructive">
                              {fileError}
                           </p>
                        )}
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="">
               <Button
                  type="button"
                  onClick={handleProcessFile}
                  className="w-full"
               >
                  Tampilkan Data
               </Button>
            </div>
            <div className="">
               {columnsError && (
                  <p className="text-sm font-medium text-destructive">
                     {columnsError}
                  </p>
               )}
            </div>
            {fields.length > 0 && (
               <div className="max-h-screen overflow-x-scroll">
                  <h3 className="text-lg font-semibold mt-4">
                     Daftar Mahasiswa
                  </h3>
                  <div className="space-y-4">
                     {watchedRows.map((row, index) => (
                        <div
                           key={index}
                           className="border p-4 rounded-md bg-muted"
                        >
                           <p className="font-bold mb-2">
                              {wrapSymbols("#")}
                              {index + 1}
                           </p>
                           <div className="grid lg:grid-cols-3 gap-4">
                              {Object.keys(row as ExcelRow).map((key) => (
                                 <FormField
                                    key={key}
                                    control={form.control}
                                    name={`participants.${index}.${
                                       key as keyof ExcelRow
                                    }`}
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="capitalize">
                                             {key}
                                          </FormLabel>
                                          <FormControl>
                                             <Input
                                                {...field}
                                                type="text"
                                                value={String(field.value)}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
            <div className="flex text-center items-center gap-x-2">
               <Checkbox
                  id="terms"
                  checked={termsChecked}
                  onCheckedChange={() => setTermsChecked(!termsChecked)}
               />
               <Label
                  className="text-xs  mt-2 font-poppins cursor-pointer"
                  htmlFor="terms"
               >
                  *) Saya menyatakan bahwa data yang saya berikan adalah benar
                  dan bersedia memenuhi seluruh ketentuan Pendaftaran VALTER
                  2025.
               </Label>
            </div>
            <FormField
               name="npmatauidsama"
               render={({}) => (
                  <FormItem>
                     <FormMessage className="p-4 bg-red-200 border-4 rounded-lg font-semibold border-foreground shadow-[7px_7px_0px_#00000040]" />
                  </FormItem>
               )}
            />
            <Button
               type="submit"
               variant={"secondary"}
               className="w-full max-w-lg flex justify-self-center"
               disabled={
                  form.formState.isLoading ||
                  form.formState.isSubmitting ||
                  form.formState.isDirty === false ||
                  termsChecked === false
               }
            >
               {form.formState.isSubmitting ? <Spinner /> : "Submit"}
            </Button>
         </form>
      </FormProvider>
   );
}
