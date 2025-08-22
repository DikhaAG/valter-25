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

import { CekPendaftaranButton } from "./_components/cek-pendaftaran-button";
import { FormPendaftaran } from "./_components/form-pendaftaran";

interface Props {
   isVisible: boolean;
}
export function FormPendaftaranSection({ isVisible }: Props) {
   return (
      <section
         className={`py-8 px-4 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
         }`}
      >
         <div className="max-w-md md:max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-secondary text-center mb-6">
               Pendaftaran
            </h2>
            <FormPendaftaran />
            <div className="my-3"></div>
            <CekPendaftaranButton />
         </div>
      </section>
   );
}
