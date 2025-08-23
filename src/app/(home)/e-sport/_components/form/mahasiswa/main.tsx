"use client";
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/nb/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { UploadBuktiPembayaranField } from "../upload-bukti-pembayaran-field";
import { v4 as uuidv4 } from "uuid";
import { esportMahasiswaSubmitFormAction } from "@/server/home/e-sport/mahasiswa-submit-form-action";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/nb/checkbox";
import { Label } from "@/components/ui/nb/label";
import { wrapSymbols } from "@/utils/wrap-symbols";
import { Spinner } from "@/components/ui/nb/Spinner";
import { EsportPesertaNpmAvailableCheck } from "@/server/home/e-sport/cek-ketersediaan-npm";
import {
   esportTimMahasiswaFormSchema,
   EsportTimMahasiswaFormSchemaType,
} from "@/zod/home/e-sport/mahasiswa-form";
import { esportIdMlAvailableCheck } from "@/server/home/e-sport/cek-ketersediaan-id-ml";

export function EsportMahasiswaForm() {
   const [termsChecked, setTermsChecked] = useState<boolean>(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const form = useForm<EsportTimMahasiswaFormSchemaType>({
      resolver: zodResolver(esportTimMahasiswaFormSchema),
      defaultValues: {
         as: "mahasiswa",
         namaTim: "",
         instansi: "",
         noWa: "",
         peserta: [{ id: uuidv4(), idML: "", nama: "", npm: "" }], // Baris pertama secara default
      },
      mode: "onBlur",
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "peserta",
   });

   async function onSubmit(data: EsportTimMahasiswaFormSchemaType) {
      setLoading(true);

      let hasError = false;
      for (const [i, p] of data.peserta.entries()) {
         const cekIdMl = await esportIdMlAvailableCheck(p);
         const cekNpm = await EsportPesertaNpmAvailableCheck(p);
         if (!cekIdMl.success) {
            form.setError(`peserta.${i}.idML`, {
               type: "server",
               message: cekIdMl.message, // Gunakan pesan dari server
            });
            hasError = true;
         }
         if (!cekNpm.success) {
            form.setError(`peserta.${i}.npm`, {
               type: "server",
               message: cekNpm.message, // Gunakan pesan dari server
            });
            hasError = true;
         }
      }

      if (hasError) {
         setLoading(false);
         return;
      }

      const res = await esportMahasiswaSubmitFormAction(data);
      if (!res.success) {
         setLoading(false);
         CustomToast({
            variant: "error",
            message: `${res.message} 😂💀`,
         });
         return;
      } else {
         setLoading(false);
         CustomToast({
            variant: "success",
            message: `Berhasil melakukan pendaftaran 😂. Tunggu admin untuk konfirmasi 😘`,
         });
         form.reset();
         sessionStorage.setItem("kodeTim", res.data!);
         router.push("/e-sport/detail-pendaftaran");
         router.refresh();
      }
   }

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="as"
               defaultValue="mahasiswa"
               render={({}) => <FormItem hidden></FormItem>}
            />
            <div>
               <FormField
                  control={form.control}
                  name={`namaTim`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>Nama Tim</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="ex: Aruna Agnivesha."
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="">
                  <FormField
                     control={form.control}
                     name={`noWa`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel className="text-xs">
                              Nomor Whatsapp Aktif
                           </FormLabel>
                           <FormControl>
                              <Input
                                 className="text-xs"
                                 placeholder="ex: 0869..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="pt-4 md:pt-0">
                  <FormField
                     control={form.control}
                     name={`instansi`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel className="text-xs">
                              Asal Instansi
                           </FormLabel>
                           <FormControl>
                              <Input
                                 className="text-xs"
                                 placeholder="ex: Politeknik Negeri Sriwijaya"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>

            <div>
               <FormField
                  control={form.control}
                  name={`buktiPembayaran`}
                  render={({}) => (
                     <FormItem>
                        <FormLabel className="mb-2">Bukti Pembayaran</FormLabel>
                        <FormControl>
                           <UploadBuktiPembayaranField form={form} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <h2>Daftar Peserta</h2>
            {fields.map((field, index) => (
               <div key={field.id} className="grid md:grid-cols-8 gap-6">
                  <div className="">
                     {wrapSymbols("#")}
                     {index + 1}
                     {index >= 5 && (
                        <div className="font-poppins opacity-80">
                           (cadangan)
                        </div>
                     )}
                  </div>
                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name={`peserta.${index}.idML`}
                        render={({ field }) => (
                           <FormItem className="flex-1">
                              <FormLabel>ID ML</FormLabel>
                              <FormControl>
                                 <Input placeholder="ex: 6969" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name={`peserta.${index}.npm`}
                        render={({ field }) => (
                           <FormItem className="flex-1">
                              <FormLabel>NPM</FormLabel>
                              <FormControl>
                                 <Input placeholder="ex: 0624..." {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name={`peserta.${index}.nama`}
                        render={({ field }) => (
                           <FormItem className="flex-1">
                              <FormLabel>Nama</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="ex: Timothy R."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className=" mt-6.5 flex">
                     <Button
                        type="button"
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => remove(index)}
                        disabled={form.getValues("peserta").length === 1}
                     >
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
            ))}
            <div className="flex justify-end">
               <Button
                  type="button"
                  onClick={() =>
                     append({
                        idML: "",
                        nama: "",
                        npm: "",
                     })
                  }
                  disabled={form.getValues("peserta").length === 7}
                  variant="gosong"
                  className="text-center items-center"
               >
                  <Plus className="size-5 font-bold" />{" "}
                  <span className="flex">Tambah peserta</span>
               </Button>
            </div>
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
                  form.formState.isDirty === false ||
                  termsChecked === false ||
                  loading
               }
            >
               {loading ? <Spinner /> : "Submit"}
            </Button>
         </form>
      </FormProvider>
   );
}
