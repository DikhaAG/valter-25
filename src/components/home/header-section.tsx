import { HeaderDataType } from "@/types/header";
import { wrapSymbols } from "@/utils/wrap-symbols";
import { AnimatedCoinImage } from "../animated-coin.image";

interface Props {
   isVisible: boolean;
   data: HeaderDataType;
}
export function HeaderSection({ isVisible, data }: Props) {
   return (
      <section
         id="activity-section"
         className={`min-h-screen py-8 px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
         }`}
      >
         <div className="max-w-md md:max-w-4xl flex flex-col md:flex-row mx-auto gap-20 text-center">
            <div className="md:mb-6 flex justify-center">
               <div className="relative w-60 md:w-80">
                  {/* <Image
                     src={`/images/${data.img}`}
                     alt="Gaming Device"
                     width={1000}
                     height={1000}
                     className="w-full h-full"
                  /> */}
                  <AnimatedCoinImage
                     alt={data.title}
                     src={`/images/${data.img}`}
                     height={500}
                     width={500}
                  />
                  <div className="absolute top-0 right-10 w-10 h-10 bg-yellow-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-1/3 right-5 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-5 right-20 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute top-10 right-10 w-10 h-10 bg-yellow-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-20 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-1/4 right-5 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-10 right-20 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute top-15 right-10 w-10 h-10 bg-yellow-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-25 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-3/2 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-15 right-25 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute top-20 right-40 w-12 h-12 bg-yellow-300 rounded-full animate-ping opacity-60 delay-75"></div>
                  <div className="absolute top-1/3 right-5 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60 delay-100"></div>
                  <div className="absolute top-30 right-30 w-10 h-10 bg-amber-300 rounded-full animate-ping opacity-60 delay-150"></div>
                  <div className="absolute top-3/2 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60 delay-200"></div>
                  <div className="absolute top-15 right-10 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-60 delay-300"></div>
                  <div className="absolute top-1/4 right-5 w-3 h-3 bg-sky-300 rounded-full animate-pulse opacity-60 delay-500"></div>
                  <div className="absolute top-1/2 right-40 w-12 h-12 bg-yellow-300 rounded-full animate-ping opacity-60 delay-700"></div>
                  <div className="absolute top-1/2 right-5 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60 delay-1000"></div>
                  <div className="absolute top-1/2 right-30 w-10 h-10 bg-amber-300 rounded-full animate-ping opacity-60 delay-initial"></div>
                  <div className="absolute top-1/2 -left-0 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60 delay-75"></div>
                  <div className="absolute top-1/2 -left-0 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-60 delay-100"></div>
                  <div className="absolute top-1/2 -left-5 w-3 h-3 bg-sku-300 rounded-full animate-pulse opacity-60 delay-1000"></div>

                  <div className="absolute bottom-10 right-20 w-5 h-5 bg-indigo-300 rounded-full animate-ping opacity-60 delay-300"></div>
                  <div className="absolute bottom-15 right-35 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-60 delay-0"></div>
                  <div className="absolute top-30 -right-40 w-12 h-12 bg-yellow-300 rounded-full animate-ping opacity-60 delay-100"></div>
                  <div className="absolute -top-15 -right-30 w-10 h-10 bg-amber-300 rounded-full animate-ping opacity-60 delay-250"></div>
                  <div className="absolute -top-5 -right-10 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-60 delay-500"></div>

                  <div className="absolute top-0 -left-15 w-12 h-12 bg-yellow-300 rounded-full animate-ping opacity-60 delay-100"></div>
                  <div className="absolute -top-5 -left-10 w-10 h-10 bg-amber-300 rounded-full animate-ping opacity-60 delay-250"></div>
                  <div className="absolute -top-5 -left-0 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-60 delay-500"></div>
               </div>
            </div>
            <div className="flex flex-col gap-5">
               <h1 className="text-2xl text-start md:text-3xl font-bold text-secondary mb-4">
                  {wrapSymbols(data.title, "text-4xl")}
               </h1>
               <span className="text-sm md:text-base font-poppins leading-relaxed text-justify mb-6">
                  {data.desc}
               </span>
               <div className="text-3xl md:text-4xl font-bold text-secondary">
                  Rp {wrapSymbols(data.htm)}
               </div>
            </div>
         </div>
         <div className="my-20"></div>
         <div className="flex flex-col gap-5">
            <div className="max-w-md md:max-w-2xl mx-auto">
               <h2 className="text-lg font-bold text-secondary text-center mb-2">
                  Pembayaran
               </h2>
               <div className="flex flex-col md:flex-row md:gap-20 items-center text-xs">
                  {data.pembayaran.map((p, i) => (
                     <div
                        key={i}
                        className="flex justify-between items-center gap-4"
                     >
                        <span className="font-semibold text-secondary">
                           {p.nama}
                        </span>
                        <span className="">
                           {wrapSymbols("(")}
                           {p.nomor}

                           {wrapSymbols(")")}
                        </span>
                     </div>
                  ))}
                  {/* <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Mandiri
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-xl">
                                                                        (
                                                                </span>
                                                                1300207961069
                                                                <span className="font-funky-vibes text-xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Dana
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-xl">
                                                                        (
                                                                </span>
                                                                081378575693
                                                                <span className="font-funky-vibes text-xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div> */}
               </div>
            </div>
            <div className="max-w-md md:max-w-2xl mx-auto">
               <h2 className="text-lg font-bold text-secondary text-center mb-2">
                  Contact Person
               </h2>
               <div className="flex flex-col md:flex-row md:gap-20 items-center text-xs">
                  {data.cp.map((c, i) => (
                     <div
                        key={i}
                        className="flex justify-between items-center gap-4"
                     >
                        <span className="font-semibold text-secondary">
                           {c.nama}
                        </span>
                        <span className="">{wrapSymbols(c.kontak)}</span>
                     </div>
                  ))}
                  {/* <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Rama
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-xl">
                                                                        (
                                                                </span>
                                                                0896
                                                                <span className="font-funky-vibes text-2xl">
                                                                        -
                                                                </span>
                                                                2015
                                                                <span className="font-funky-vibes text-2xl">
                                                                        -
                                                                </span>
                                                                6526
                                                                <span className="font-funky-vibes text-xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Ihsan
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-xl">
                                                                        (
                                                                </span>
                                                                0856
                                                                <span className="font-funky-vibes text-2xl">
                                                                        -
                                                                </span>
                                                                5836
                                                                <span className="font-funky-vibes text-2xl">
                                                                        -
                                                                </span>
                                                                4556
                                                                <span className="font-funky-vibes text-xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div> */}
               </div>
            </div>
         </div>
      </section>
   );
}
