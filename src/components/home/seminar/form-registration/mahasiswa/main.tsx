"use client";
// PACKAGES
import { Dispatch, SetStateAction, useState } from "react";
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
import { useForm, FormProvider } from "react-hook-form";
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
   participantAsMahasiswa,
   ParticipantAsMahasiswa,
} from "@/models/seminar/registration-form";
import { individualRegistration } from "@/server/services/seminar/individual-registration";

export function MahasiswaForm({
   handleTabsValue,
}: {
   handleTabsValue: Dispatch<SetStateAction<string>>;
}) {
   const [termsChecked, setTermsChecked] = useState<boolean>(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const form = useForm<ParticipantAsMahasiswa>({
      resolver: zodResolver(participantAsMahasiswa),
      defaultValues: {
         as: "mahasiswa",
         metodeDaftar: "individu",
         nama: "",
         noWa: "",
         email: "",
         instansi: "",
      },
      mode: "onBlur",
   });

   async function onSubmit(data: ParticipantAsMahasiswa) {
      setLoading(true);

      const res = await individualRegistration({ data });
      if (!res.success) {
         CustomToast({
            variant: "warning",
            message: `${res.message} 😂💀`,
         });
         setLoading(false);
         return;
      } else {
         CustomToast({
            variant: "success",
            message: `Berhasil melakukan pendaftaran 😂. Tunggu admin untuk konfirmasi 😘`,
         });
         form.reset();
         sessionStorage.setItem("kodeTim", res.data!);
         router.push("/seminar/detail-pendaftaran");
      }
   }
   return (
      <FormProvider {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
            className="space-y-8"
         >
            <div className="flex font-poppins">
               <div className="flex flex-row">
                  ribet daftar satu-satu?
                  <span
                     className="font-glofium-demo text-xs cursor-pointer"
                     onClick={() => handleTabsValue("kelas")}
                  >
                     {wrapSymbols(`daftar sekelas!`)}
                  </span>
               </div>
            </div>
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
               <div className="">
                  <FormField
                     control={form.control}
                     name={`email`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel className="text-xs">
                              Email Aktif
                           </FormLabel>
                           <FormControl>
                              <Input
                                 className="text-xs"
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
               <FormField
                  control={form.control}
                  name={`instansi`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>Asal Instansi</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="ex: Politeknik Negeri Sriwijaya."
                              {...field}
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
                  name={`domisili`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel>
                           Domisili {wrapSymbols(`(Kota/kabupaten)`)}
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="ex: Politeknik Negeri Sriwijaya."
                              {...field}
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
