import { HomeAcaraHeaderDataType } from "@/types/home/home/acara/headerDataType";
import { wrapSymbols } from "@/utils/wrapSymbols";
import Image from "next/image";

interface Props {
        isVisible: boolean;
        data: HomeAcaraHeaderDataType;
}
export function HeaderSection({ isVisible, data }: Props) {
        return (
                <section
                        id="activity-section"
                        className={`min-h-screen py-8 px-4 transition-all duration-1000 ${
                                isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                        }`}
                >
                        <div className="max-w-md md:max-w-4xl flex flex-col md:flex-row mx-auto gap-20 text-center">
                                <div className="md:mb-6 flex justify-center">
                                        <div className="relative md:w-80">
                                                <Image
                                                        src={`/images/${data.img}`}
                                                        alt="Gaming Device"
                                                        width={1000}
                                                        height={1000}
                                                        className="w-full h-full"
                                                />
                                        </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                        <h1 className="text-2xl text-start md:text-3xl font-bold text-secondary mb-4">
                                                {data.title}
                                        </h1>
                                        <p className="text-sm md:text-base font-poppins leading-relaxed text-justify mb-6">
                                                {data.desc}
                                        </p>
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
                                                                        {wrapSymbols(
                                                                                "("
                                                                        )}
                                                                        {
                                                                                p.nomor
                                                                        }

                                                                        {wrapSymbols(
                                                                                ")"
                                                                        )}
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
                                                                <span className="">
                                                                        {wrapSymbols(
                                                                                c.kontak
                                                                        )}
                                                                </span>
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
