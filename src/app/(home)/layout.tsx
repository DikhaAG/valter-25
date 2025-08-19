"use client";
import { Instagram, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Props {
        children: React.ReactNode;
}
export default function HomeLayout({ children }: Props) {
        const [timeLeft, setTimeLeft] = useState({
                days: 72,
                hours: 8,
                minutes: 18,
                seconds: 45,
        });

        useEffect(() => {
                const calculateTimeLeft = () => {
                        const targetDate = new Date(
                                "2025-10-10T00:00:00"
                        ).getTime();
                        const now = new Date().getTime();
                        const difference = targetDate - now;

                        if (difference > 0) {
                                const days = Math.floor(
                                        difference / (1000 * 60 * 60 * 24)
                                );
                                const hours = Math.floor(
                                        (difference % (1000 * 60 * 60 * 24)) /
                                                (1000 * 60 * 60)
                                );
                                const minutes = Math.floor(
                                        (difference % (1000 * 60 * 60)) /
                                                (1000 * 60)
                                );
                                const seconds = Math.floor(
                                        (difference % (1000 * 60)) / 1000
                                );

                                setTimeLeft({ days, hours, minutes, seconds });
                        } else {
                                setTimeLeft({
                                        days: 0,
                                        hours: 0,
                                        minutes: 0,
                                        seconds: 0,
                                });
                        }
                };

                calculateTimeLeft(); // Calculate immediately
                const timer = setInterval(calculateTimeLeft, 1000);

                return () => clearInterval(timer);

                return () => clearInterval(timer);
        }, []);
        const pathname = usePathname();
        if (pathname === "/") {
                return <div className="font-glofium-demo">{children}</div>;
        }
        return (
                <div className="min-h-screen bg-background relative overflow-x-hidden font-glofium-demo text-foreground">
                        <nav
                                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary rounded-b-lg drop-shadow-[0px_10px_0px_#00000040]`}
                        >
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                                        <div className="flex items-center justify-between h-16">
                                                <div className="flex items-center">
                                                        <Image
                                                                width={2000}
                                                                height={2000}
                                                                src="/images/brand-logo.png"
                                                                alt="Brand Logo"
                                                                className="w-12 h-12"
                                                        />
                                                </div>

                                                <div className="hidden md:flex items-center space-x-8">
                                                        <Link
                                                                href="/"
                                                                className="text-white hover:text-secondary font-medium"
                                                        >
                                                                Beranda
                                                        </Link>
                                                        <Link
                                                                href="#activity-section"
                                                                className="text-white hover:text-secondary font-medium"
                                                        >
                                                                Acara
                                                        </Link>
                                                        <Link
                                                                href="#timeline-section"
                                                                className="text-white hover:text-secondary font-medium"
                                                        >
                                                                Timeline
                                                        </Link>
                                                </div>

                                                {/* Countdown Timer in Navbar */}
                                                <div className="flex items-center space-x-2">
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                                                                <span className="text-white text-sm font-bold font-glofium">
                                                                        {timeLeft.days
                                                                                .toString()
                                                                                .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                )}
                                                                </span>
                                                        </div>
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                                                                <span className="text-white text-sm font-bold font-glofium">
                                                                        {timeLeft.hours
                                                                                .toString()
                                                                                .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                )}
                                                                </span>
                                                        </div>
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                                                                <span className="text-white text-sm font-bold font-glofium">
                                                                        {timeLeft.minutes
                                                                                .toString()
                                                                                .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                )}
                                                                </span>
                                                        </div>
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                                                                <span className="text-white text-sm font-bold font-glofium">
                                                                        {timeLeft.seconds
                                                                                .toString()
                                                                                .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                )}
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </nav>
                        <div className="mt-30 mb-80">{children}</div>
                        {/* FOOTER */}
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
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit, sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua.
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
                                                                <li>
                                                                        Instagram:
                                                                </li>
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
                                                                Lorem ipsum
                                                                dolor sit amet,
                                                                consectetur
                                                                adipiscing elit,
                                                                sed do eiusmod
                                                                tempor
                                                                incididunt
                                                        </p>
                                                        <p className="text-white/60 font-poppins text-xs sm:text-sm">
                                                                © Valter 2025.
                                                                All Rights
                                                                Reserved.
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </footer>
                </div>
        );
}
