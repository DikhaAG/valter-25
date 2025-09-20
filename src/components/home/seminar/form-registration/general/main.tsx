"use client";
// PACKAGES
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
// UTILS
import { wrapSymbols } from "@/utils/wrap-symbols";
// COMPONENTS
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/nb/input";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { Checkbox } from "@/components/ui/nb/checkbox";
import { Label } from "@/components/ui/nb/label";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import {
   FormField,
   FormItem,
   FormLabel,
   FormControl,
   FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/nb/Spinner";
import { UploadBuktiPembayaranField } from "../upload-bukti-pembayaran-field";
import {
   participantAsGeneral,
   ParticipantAsGeneral,
} from "@/models/seminar/registration-form";
import { individualRegistration } from "@/server/services/seminar/individual-registration";
import DomisiliSelector from "../domisili-selector";
import { KABUPATEN_KOTA_INDONESIA } from "@/data/kabupaten-kote-indonesia";
import { exportPesertaToExcel } from "@/server/services/seminar/export-peserta-to-excel";

export function GeneralForm() {
   const [termsChecked, setTermsChecked] = useState<boolean>(false);
   const router = useRouter();
   const form = useForm<ParticipantAsGeneral>({
      resolver: zodResolver(participantAsGeneral),
      defaultValues: {
         as: "umum",
         metodeDaftar: "individu",
         nama: "",
         noWa: "",
         email: "",
         instansi: "",
      },
      mode: "onBlur",
   });

   async function onSubmit(data: ParticipantAsGeneral) {
      const res = await individualRegistration({ data });
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
         exportPesertaToExcel({ data: res.data! });
         form.reset();
         sessionStorage.setItem("registrationId", res.data!.id!);
         sessionStorage.setItem("metodeDaftar", "individu");
         router.push("/seminar/detail-pendaftaran");
      }
   }
   function handleFormError(e: FieldErrors) {
      console.log(e);
   }
   return (
      <FormProvider {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit, handleFormError)}
            className="space-y-8"
         >
            <FormField
               control={form.control}
               name="as"
               defaultValue="mahasiswa"
               render={({}) => <div></div>}
            />
            <div>
               <FormField
                  control={form.control}
                  name={`nama`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                           <Input placeholder="ex: John Doe." {...field} />
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
                           <FormLabel className="">Nomor Whatsapp</FormLabel>
                           <FormControl>
                              <Input
                                 className=""
                                 placeholder="ex: 0869..."
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="">
                  <FormField
                     control={form.control}
                     name={`email`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel className="">Email Aktif</FormLabel>
                           <FormControl>
                              <Input
                                 className=""
                                 placeholder="ex: example@example.org..."
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
               <div className="">
                  <FormField
                     control={form.control}
                     name={`instansi`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel className="">
                              Asal Instansi{wrapSymbols("/")}Komunitas
                           </FormLabel>
                           <FormControl>
                              <Input
                                 className=""
                                 placeholder="ex: BlackRock"
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
                  name={`domisili`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>
                           Domisili {wrapSymbols(`(Kota/kabupaten)`)}
                        </FormLabel>
                        <FormControl>
                           <DomisiliSelector
                              domisiliData={KABUPATEN_KOTA_INDONESIA}
                              onDomisiliChange={(domisili) => {
                                 form.setValue(
                                    field.name,
                                    domisili || "Lainnya"
                                 );
                              }}
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
