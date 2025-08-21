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
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
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
                                                                        href="#"
                                                                        className="text-white/80 hover:text-white transition-colors"
                                                                >
                                                                        Beranda
                                                                </Link>
                                                        </li>
                                                        <li>
                                                                <Link
                                                                        href="#"
                                                                        className="text-white/80 hover:text-white transition-colors"
                                                                >
                                                                        Acara
                                                                </Link>
                                                        </li>
                                                        <li>
                                                                <Link
                                                                        href="#"
                                                                        className="text-white/80 hover:text-white transition-colors"
                                                                >
                                                                        Timeline
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
                                                        <li>Email:</li>
                                                        <li>Instagram:</li>
                                                        <li>Address</li>
                                                </ul>
                                        </div>

                                        {/* Ikuti Kami */}
                                        <div className="text-center md:text-left">
                                                <h3 className="text-lg sm:text-xl font-bold mb-4 font-glofium">
                                                        Ikuti Kami
                                                </h3>
                                                <div className="flex justify-center md:justify-start space-x-4">
                                                        <Link
                                                                href="#"
                                                                className="text-white/80 hover:text-white transition-colors"
                                                        >
                                                                <Instagram className="w-6 h-6" />
                                                        </Link>
                                                        <Link
                                                                href="#"
                                                                className="text-white/80 hover:text-white transition-colors"
                                                        >
                                                                <Music className="w-6 h-6" />
                                                        </Link>
                                                </div>
                                        </div>
                                </div>

                                {/* Bottom border and copyright */}
                                <div className="border-t border-white/20 pt-8">
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                                <p className="text-white/60 font-poppins text-xs sm:text-sm mb-4 md:mb-0">
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit, sed do
                                                        eiusmod tempor
                                                        incididunt
                                                </p>
                                                <p className="text-white/60 font-poppins text-xs sm:text-sm">
                                                        © Valter 2025. All
                                                        Rights Reserved.
                                                </p>
                                        </div>
                                </div>
                        </div>
                </footer>
        );
}
