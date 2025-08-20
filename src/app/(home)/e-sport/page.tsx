"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CekRegistrasiButton } from "@/components/home/e-sport/CekRegistrasiButton";
import { FormRegistrasi } from "../../../components/home/e-sport/FormRegistrasi";

export default function ESportPage() {
        const [isVisible, setIsVisible] = useState(false);
        if (typeof window !== "undefined") {
                sessionStorage.clear();
        }

        useEffect(() => {
                setIsVisible(true);
        }, []);

        return (
                <div className="min-h-screen flex flex-col gap-10">
                        {/* Header Section */}
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
                                                                src="/images/game.png"
                                                                alt="Gaming Device"
                                                                width={1000}
                                                                height={1000}
                                                                className="w-full h-full"
                                                        />
                                                </div>
                                        </div>
                                        <div className="flex flex-col gap-5">
                                                <h1 className="text-2xl text-start md:text-3xl font-bold text-secondary mb-4">
                                                        Lomba Mobile Legends
                                                </h1>
                                                <p className="text-sm md:text-base font-poppins leading-relaxed text-justify mb-6">
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit, sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua. Ut
                                                        enim ad minim veniam,
                                                        quis nostrud
                                                        exercitation ullamco
                                                        laboris nisi ut aliquip
                                                        ex ea commodo consequat.
                                                        Duis aute irure dolor in
                                                        reprehenderit in
                                                        voluptate velit esse
                                                        cillum dolore eu fugiat
                                                        nulla pariatur.
                                                </p>
                                                <div className="text-3xl md:text-4xl font-bold text-secondary">
                                                        HTM Rp 45
                                                        <span className="font-funky-vibes">
                                                                .
                                                        </span>
                                                        000
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
                                                        <div className="flex justify-between items-center gap-4">
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
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="max-w-md md:max-w-2xl mx-auto">
                                                <h2 className="text-lg font-bold text-secondary text-center mb-2">
                                                        Contact Person
                                                </h2>
                                                <div className="flex flex-col md:flex-row md:gap-20 items-center text-xs">
                                                        <div className="flex justify-between items-center gap-4">
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
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Timeline Section */}
                        <section
                                id="timeline-section"
                                className={`min-h-screen flex justify-center py-8 px-4 transition-all duration-1000 delay-400 ${
                                        isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                }`}
                        >
                                <div className="max-w-4xl m-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-6">
                                                Timeline
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className=" p-4 rounded-lg border-2 border-foreground shadow-[7px_7px_0px_#00000040] text-center">
                                                        <h3 className="font-semibold mb-2">
                                                                Pendaftaran
                                                                <span className="font-funky-vibes text-2xl">
                                                                        :
                                                                </span>
                                                        </h3>
                                                        <p className="text-sm font-poppins">
                                                                1 September - 13
                                                                Oktober 2025
                                                        </p>
                                                </div>
                                                <div className=" p-4 rounded-lg border-2  border-foreground shadow-[7px_7px_0px_#00000040] text-center">
                                                        <h3 className="font-semibold mb-2">
                                                                Technical
                                                                Meeting
                                                                <span className="font-funky-vibes text-2xl">
                                                                        :
                                                                </span>
                                                        </h3>
                                                        <p className="text-sm font-poppins">
                                                                17 Okt 2025
                                                        </p>
                                                </div>
                                                <div className=" p-4 rounded-lg border-2  border-foreground shadow-[7px_7px_0px_#00000040]  text-center">
                                                        <h3 className="font-semibold mb-2">
                                                                Babak Penyisihan{" "}
                                                                <span className="font-funky-vibes text-2xl">
                                                                        &
                                                                </span>{" "}
                                                                Final
                                                                <span className="font-funky-vibes text-2xl">
                                                                        :
                                                                </span>
                                                        </h3>
                                                        <p className="text-sm font-poppins">
                                                                25 Okt 2025
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        {/* Registration Form Section */}
                        <section
                                className={`py-8 px-4 transition-all duration-1000 delay-500 ${
                                        isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                }`}
                        >
                                <div className="max-w-md md:max-w-5xl mx-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-6">
                                                Pendaftaran
                                        </h2>
                                        <FormRegistrasi />
                                        <div className="my-3"></div>
                                        <CekRegistrasiButton />
                                </div>
                        </section>
                </div>
        );
}
