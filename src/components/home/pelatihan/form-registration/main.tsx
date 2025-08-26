/**
 * Komponen klien React untuk menampilkan bagian formulir pendaftaran lomba video campaign.
 *
 * Komponen ini memiliki fungsionalitas utama:
 * 1.  Menyertakan `FormRegistrasi` untuk input data pendaftaran.
 * 2.  Menyertakan `CekRegistrasiButton` untuk validasi status registrasi.
 * 3.  Menggunakan properti `isVisible` untuk mengontrol animasi transisi masuk
 * (fade-in dan slide-up) saat komponen dimuat.
 *
 * @param {object} props
 * @param {boolean} props.isVisible - Properti untuk mengontrol apakah
 * komponen ini terlihat dan mengaktifkan animasi.
 */

import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/nb/tabs";
import { MahasiswaForm } from "./mahasiswa/main";
import { GeneralForm } from "./general/main";
import { RegistrationCheckButton } from "./registration-check-button";
import { KelasForm } from "./kelas/main";
import { useState } from "react";

interface Props {
   isVisible: boolean;
}
export function Form({ isVisible }: Props) {
   const [tabsValue, setTabsValue] = useState("mahasiswa");
   return (
      <section
         id="pendaftaran-section"
         className={`py-8 px-4 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
         }`}
      >
         <div className="max-w-md md:max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-secondary text-center mb-6">
               Pendaftaran
            </h2>
            <Tabs
               defaultValue="mahasiswa"
               value={tabsValue}
               onValueChange={(v) => setTabsValue(v)}
            >
               <TabsList className="mb-4 self-end">
                  <TabsTrigger
                     value="mahasiswa"
                     className={`${
                        tabsValue === "kelas" &&
                        " shadow-none drop-shadow-none bg-foreground text-background translate-0"
                     }`}
                  >
                     Mahasiswa
                  </TabsTrigger>
                  <TabsTrigger value="umum">Umum</TabsTrigger>
               </TabsList>
               <TabsContent value="mahasiswa">
                  <MahasiswaForm handleTabsValue={setTabsValue} />
               </TabsContent>
               <TabsContent value="kelas">
                  <KelasForm />
               </TabsContent>
               <TabsContent value="umum">
                  <GeneralForm />
               </TabsContent>
            </Tabs>
            <div className="my-3"></div>
            <RegistrationCheckButton />
         </div>
      </section>
   );
}
