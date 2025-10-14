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
import { wrapSymbols } from "@/utils/wrap-symbols";
import { classRegistration } from "@/server/services/seminar/class-registration";
import { handleFileChange } from "@/server/services/seminar/handle-excel-field";
import { validateNominal } from "@/server/services/seminar/validate-nominal";
import { downloadFormatDataKelasExcel } from "@/utils/download-format-data-kelas-excel";
import { kelasCheck } from "@/server/services/seminar/kelas-check";
import { exportKelasToExcel } from "@/server/services/seminar/export-kelas-to-excel";

export type MahasiswaExcelRow = {
   nama: string;
   npm: string;
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
      defaultValues: {
         kelas: undefined,
         nominal: 0,
         excelFile: undefined,
         participants: [],
      },
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

   async function onSubmit(data: ClassRegstrationSchema) {
      const isNominalValid = validateNominal({ data });
      if (!isNominalValid.success) {
         const { message } = isNominalValid;
         form.setError("nominal", { message });
         CustomToast({
            variant: "warning",
            message: message!,
         });
         return;
      }
      const isKelasAvalable = await kelasCheck(data.kelas);
      if (!isKelasAvalable.success) {
         const { message } = isKelasAvalable;
         form.setError("kelas", { message });
         CustomToast({
            variant: "warning",
            message: message!,
         });
         return;
      }

      const res = await classRegistration({ data });
      if (!res.success) {
         CustomToast({
            variant: "error",
            message: `${res.message}`,
         });
         return;
      } else {
         CustomToast({
            variant: "success",
            message: `Berhasil melakukan pendaftaran. Tunggu admin untuk konfirmasi`,
         });
         exportKelasToExcel({ data: res.data! });
         form.reset();
         sessionStorage.setItem("registrationId", res.data!.id);
         sessionStorage.setItem("metodeDaftar", "kelas");
         router.push(`/seminar/detail-pendaftaran/${res.data!.kelas}`);
      }
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
      if (
         Object.keys(e).length > 0
         // Object.keys(e).includes("pesertaError") ||
         // Object.keys(e).includes("participants")
      ) {
         CustomToast({
            variant: "warning",
            message: "Data mahasiswa tidak valid",
         });
      }
      return;
   }
   const handleDownloadFormatExcel = () => {
      downloadFormatDataKelasExcel();
   };
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
                              onKelasChange={async (kelas) => {
                                 if (kelas) {
                                    const isKelasAvalable = await kelasCheck(
                                       kelas.nama
                                    );
                                    if (!isKelasAvalable.success) {
                                       form.setError("kelas", {
                                          message: isKelasAvalable.message,
                                       });
                                    }
                                 }
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
                        <FormDescription className="font-poppins">
                           Pastikan nominal bayar sudah pas dengan total
                           keseluruhan mahasiswa.
                        </FormDescription>
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
                              onChange={(e) =>
                                 handleFileChange({
                                    e,
                                    form,
                                    replace,
                                    setColumnsError,
                                    setFileError,
                                 })
                              }
                              className="cursor-pointer"
                           />
                        </FormControl>
                        <FormDescription className="font-poppins">
                           Unggah file Excel (.xlsx) yang berisi data mahasiswa.
                        </FormDescription>
                        <span
                           className="cursor-pointer text-secondary underline text-xs"
                           onClick={handleDownloadFormatExcel}
                        >
                           unduh format excel
                        </span>
                        {fileError && (
                           <p className="font-poppins text-sm font-medium text-destructive">
                              {fileError}
                           </p>
                        )}
                        <FormMessage className="font-poppins" />
                     </FormItem>
                  )}
               />
            </div>
            {/* <div className="">
               <Button
                  type="button"
                  onClick={handleProcessFile}
                  className="w-full"
               >
                  Tampilkan Data
               </Button>
            </div> */}
            <div className="">
               {columnsError && (
                  <p className="font-poppins text-sm font-medium text-destructive">
                     {columnsError}
                  </p>
               )}
            </div>
            {fields.length > 0 && (
               <div className="max-h-screen overflow-y-scroll">
                  <h3 className="text-lg font-semibold mt-4">
                     Daftar Mahasiswa
                  </h3>
                  <div className="space-y-4">
                     {watchedRows.map((row, index) => (
                        <div
                           key={index}
                           className="border-4 border-dashed p-4 rounded-md bg-muted"
                        >
                           <p className="font-bold mb-2">
                              {wrapSymbols("#")}
                              {index + 1}
                           </p>
                           <div className="grid lg:grid-cols-4 gap-4">
                              {Object.keys(row as MahasiswaExcelRow).map(
                                 (key) => (
                                    <FormField
                                       key={key}
                                       control={form.control}
                                       name={`participants.${index}.${
                                          key as keyof MahasiswaExcelRow
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
                                 )
                              )}
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
               name="pesertaError"
               render={({}) => (
                  <FormItem>
                     <FormMessage className="p-4 bg-background border-4 rounded-lg font-semibold border-foreground shadow-[7px_7px_0px_#00000040]" />
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
