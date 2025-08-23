import { Instagram, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HomeFooterSection() {
   return (
      <footer className="bg-primary text-white py-16 px-4">
         <div className="max-w-6xl mx-auto">
            {/* Main footer content */}
            <div className="text-center mb-12">
               <Image
                  width={200}
                  height={100}
                  src="/images/hero-logo.png"
                  alt="VALTER 2025"
                  className="w-48 h-auto mx-auto mb-6"
               />
               <p className="text-white/80 font-poppins max-w-2xl mx-auto text-xs sm:text-base">
                  Creative Synergy: “Kreativitas Berdaya bersama Teknologi”
               </p>
            </div>

            {/* Footer links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               {/* Jelajah lagi */}
               <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 font-glofium">
                     Jelajah lagi
                  </h3>
                  <ul className="text-sm sm:text-base space-y-2 font-poppins">
                     <li>
                        <Link
                           href="/seminar"
                           className="text-white/80 hover:text-white transition-colors"
                        >
                           Seminar
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/pelatihan"
                           className="text-white/80 hover:text-white transition-colors"
                        >
                           Pelatihan
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/e-sport"
                           className="text-white/80 hover:text-white transition-colors"
                        >
                           E-sport
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/web-design"
                           className="text-white/80 hover:text-white transition-colors"
                        >
                           Web Design
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/video-campaign"
                           className="text-white/80 hover:text-white transition-colors"
                        >
                           Video Campaign
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Hubungi Kami */}
               <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 font-glofium">
                     Hubungi Kami
                  </h3>
                  <ul className="text-sm sm:text-base space-y-2 font-poppins text-white/80">
                     <li>
                        <strong className="font-[900] mr-2">Alamat:</strong>
                        <span className="text-sm">
                           Kesekretariatan HMJ Teknik Komputer, Politeknik
                           Negeri Sriwijaya
                        </span>
                     </li>
                  </ul>
               </div>

               {/* Ikuti Kami */}
               <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 font-glofium">
                     Ikuti Kami
                  </h3>
                  <div className="flex justify-center md:justify-start space-x-4">
                     <Link
                        href="https://www.instagram.com/valterpolsri/"
                        passHref={true}
                        className="text-white/80 hover:text-white transition-colors"
                     >
                        <Instagram className="w-6 h-6" />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Bottom border and copyright */}
            <div className="border-t border-white/20 pt-8">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-white/60 font-poppins text-xs sm:text-sm mb-4 md:mb-0">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt
                  </p>
                  <p className="text-white/60 font-poppins text-xs sm:text-sm">
                     © Valter 2025. All Rights Reserved.
                  </p>
               </div>
            </div>
         </div>
      </footer>
   );
}
