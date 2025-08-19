"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CekRegistrasiButton } from "@/components/home/e-sport/registration-form/CekRegistrasiButton";
import { toast } from "sonner";

export default function ESportPage() {
        const [isVisible, setIsVisible] = useState(false);
        const [formData, setFormData] = useState({
                teamName: "",
                mlId: "",
                nisn: "",
                phoneNumber: "",
                address: "",
                paymentProof: null as File | null,
        });
        const [participants] = useState([
                {
                        no: 1,
                        name: "Team Alpha",
                        origin: "Jakarta",
                        status: "Confirmed",
                },
                {
                        no: 2,
                        name: "Team Beta",
                        origin: "Bandung",
                        status: "Pending",
                },
                {
                        no: 3,
                        name: "Team Gamma",
                        origin: "Surabaya",
                        status: "Confirmed",
                },
        ]);
        const [searchTerm, setSearchTerm] = useState("");

        useEffect(() => {
                setIsVisible(true);
        }, []);

        const handleInputChange = (
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                        setFormData((prev) => ({
                                ...prev,
                                paymentProof: file,
                        }));
                }
        };

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                console.log("Form submitted:", formData);
        };

        const filteredParticipants = participants.filter(
                (participant) =>
                        participant.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                        participant.origin
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
        );

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

                        {/* Payment Section */}
                        {/* <section
                                className={`py-6 px-4 transition-all duration-1000 delay-200 ${
                                        isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                }`}
                        >
                                <div className="max-w-2xl mx-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-4">
                                                Pembayaran
                                        </h2>
                                        <div className="flex flex-row gap-20 items-center">
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Mandiri
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-2xl">
                                                                        (
                                                                </span>
                                                                1300207961069
                                                                <span className="font-funky-vibes text-2xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Dana
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-2xl">
                                                                        (
                                                                </span>
                                                                081378575693
                                                                <span className="font-funky-vibes text-2xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </section> */}

                        {/* Contact Person Section */}
                        {/* <section
                                className={`py-6 px-4 transition-all duration-1000 delay-200 ${
                                        isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                }`}
                        >
                                <div className="max-w-2xl mx-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-4">
                                                Contact Person
                                        </h2>
                                        <div className="flex flex-row gap-20 items-center">
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Rama
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-2xl">
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
                                                                <span className="font-funky-vibes text-2xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4">
                                                        <span className="font-semibold text-secondary">
                                                                Ihsan
                                                        </span>
                                                        <span className="">
                                                                <span className="font-funky-vibes text-2xl">
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
                                                                <span className="font-funky-vibes text-2xl">
                                                                        )
                                                                </span>
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </section> */}

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
                                                <div className="bg-white p-4 rounded-lg border-2 border-foreground shadow-[7px_7px_0px_#00000040] text-center">
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
                                                <div className="bg-white p-4 rounded-lg border-2  border-foreground shadow-[7px_7px_0px_#00000040] text-center">
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
                                                <div className="bg-white p-4 rounded-lg border-2  border-foreground shadow-[7px_7px_0px_#00000040]  text-center">
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
                                <div className="max-w-md mx-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-6">
                                                Pendaftaran
                                        </h2>
                                        <form
                                                onSubmit={handleSubmit}
                                                className="space-y-10"
                                        >
                                                <div>
                                                        <label className="block text-sm font-medium  mb-1">
                                                                Nama Tim
                                                        </label>
                                                        <Input
                                                                name="teamName"
                                                                value={
                                                                        formData.teamName
                                                                }
                                                                onChange={
                                                                        handleInputChange
                                                                }
                                                                placeholder="Tulis Tim Mobile Legends"
                                                                className="w-full text-xs font-poppins border-2 border-foreground shadow-[7px_7px_0px_#00000040]"
                                                        />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                        <div>
                                                                <label className="block text-sm font-medium mb-1">
                                                                        ID
                                                                        Mobile
                                                                        Legends
                                                                </label>
                                                                <Input
                                                                        name="mlId"
                                                                        value={
                                                                                formData.mlId
                                                                        }
                                                                        onChange={
                                                                                handleInputChange
                                                                        }
                                                                        placeholder="Tulis 5 Callsign"
                                                                        className="w-full text-xs font-poppins border-2 border-foreground shadow-[7px_7px_0px_#00000040]"
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm font-medium  mb-1">
                                                                        NISN/NIK
                                                                </label>
                                                                <Input
                                                                        name="nisn"
                                                                        value={
                                                                                formData.nisn
                                                                        }
                                                                        onChange={
                                                                                handleInputChange
                                                                        }
                                                                        placeholder="Cth: Anggota"
                                                                        className="w-full text-xs font-poppins border-2 border-foreground shadow-[7px_7px_0px_#00000040]"
                                                                />
                                                        </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                                <label className="block text-sm font-medium  mb-1">
                                                                        Nomor HP
                                                                        / WA
                                                                        Aktif
                                                                </label>
                                                                <Input
                                                                        name="phoneNumber"
                                                                        value={
                                                                                formData.phoneNumber
                                                                        }
                                                                        onChange={
                                                                                handleInputChange
                                                                        }
                                                                        placeholder="ex: whatsapp"
                                                                        className="w-full text-xs font-poppins border-2 border-foreground shadow-[7px_7px_0px_#00000040]"
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm font-medium  mb-1">
                                                                        Asal
                                                                        Instansi
                                                                        /
                                                                        Komunitas
                                                                </label>
                                                                <Input
                                                                        name="address"
                                                                        value={
                                                                                formData.address
                                                                        }
                                                                        onChange={
                                                                                handleInputChange
                                                                        }
                                                                        placeholder="ex: sekolah"
                                                                        className="w-full text-xs font-poppins border-2 border-foreground shadow-[7px_7px_0px_#00000040]"
                                                                />
                                                        </div>
                                                </div>

                                                <div>
                                                        <label className="block text-sm font-medium mb-1">
                                                                Bukti Pembayaran
                                                        </label>
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                                <input
                                                                        type="file"
                                                                        onChange={
                                                                                handleFileUpload
                                                                        }
                                                                        accept="image/*"
                                                                        className="hidden"
                                                                        id="file-upload"
                                                                />
                                                                <label
                                                                        htmlFor="file-upload"
                                                                        className="cursor-pointer"
                                                                >
                                                                        <div className="font-poppins mb-2">
                                                                                Drop
                                                                                or
                                                                                Drag
                                                                        </div>
                                                                        <Button
                                                                                type="button"
                                                                                variant={"gosong"}
                                                                        >
                                                                                Choose
                                                                                File
                                                                        </Button>
                                                                </label>
                                                                {formData.paymentProof && (
                                                                        <p className="mt-2 text-sm ">
                                                                                {
                                                                                        formData
                                                                                                .paymentProof
                                                                                                .name
                                                                                }
                                                                        </p>
                                                                )}
                                                        </div>
                                                        <p className="text-xs  mt-2 font-poppins">
                                                                *) Saya
                                                                menyatakan bahwa
                                                                data yang saya
                                                                berikan adalah
                                                                benar dan
                                                                bersedia
                                                                memenuhi seluruh
                                                                ketentuan
                                                                Pendaftaran
                                                                VALTER 2025.
                                                        </p>
                                                </div>

                                                <Button
                                                        type="submit"
                                                        variant={"secondary"}
                                                        className="w-full"
                                                        onClick={() => toast.custom(() => (
                                                                                <div className="border-4 border-foreground bg-background rounded-md shadow-[7px_7px_0px_#00000040] p-2 text-xs">
                                                                                        Fungsi registrasinya belum ditambahin njir  :(
                                                                                </div>
                                                                        ))}
                                                >
                                                        Submit
                                                </Button>
                                        </form>
                                        <div className="my-3"></div>
                                        <CekRegistrasiButton />
                                </div>
                        </section>

                        {/* Participants List Section */}
                        {/* <section
                                className={`py-8 px-4 transition-all duration-1000 delay-600 ${
                                        isVisible
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-10"
                                }`}
                        >
                                <div className="max-w-4xl mx-auto">
                                        <h2 className="text-xl font-bold text-secondary text-center mb-6">
                                                Daftar Peserta
                                        </h2>
                                        <p className="text-center  mb-4">
                                                Sudah mendaftar? Cek apakah
                                                status pembayaran sudah
                                                terkonfirmasi!
                                        </p>

                                        <div className="mb-4">
                                                <Input
                                                        value={searchTerm}
                                                        onChange={(e) =>
                                                                setSearchTerm(
                                                                        e.target
                                                                                .value
                                                                )
                                                        }
                                                        placeholder="Cari di sini..."
                                                        className="max-w-md mx-auto block"
                                                />
                                        </div>

                                        <div className="overflow-x-auto">
                                                <table className="w-full border-collapse border border-gray-300 bg-white">
                                                        <thead>
                                                                <tr className="bg-gray-100">
                                                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                                                                No
                                                                        </th>
                                                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                                                                Nama
                                                                                Tim
                                                                        </th>
                                                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                                                                Asal
                                                                                Instansi
                                                                                /
                                                                                Komunitas
                                                                        </th>
                                                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                                                                Status
                                                                        </th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>
                                                                {filteredParticipants.map(
                                                                        (
                                                                                participant
                                                                        ) => (
                                                                                <tr
                                                                                        key={
                                                                                                participant.no
                                                                                        }
                                                                                >
                                                                                        <td className="border border-gray-300 px-4 py-2">
                                                                                                {
                                                                                                        participant.no
                                                                                                }
                                                                                        </td>
                                                                                        <td className="border border-gray-300 px-4 py-2">
                                                                                                {
                                                                                                        participant.name
                                                                                                }
                                                                                        </td>
                                                                                        <td className="border border-gray-300 px-4 py-2">
                                                                                                {
                                                                                                        participant.origin
                                                                                                }
                                                                                        </td>
                                                                                        <td className="border border-gray-300 px-4 py-2">
                                                                                                <span
                                                                                                        className={`px-2 py-1 rounded text-xs ${
                                                                                                                participant.status ===
                                                                                                                "Confirmed"
                                                                                                                        ? "bg-green-100 text-green-800"
                                                                                                                        : "bg-yellow-100 text-yellow-800"
                                                                                                        }`}
                                                                                                >
                                                                                                        {
                                                                                                                participant.status
                                                                                                        }
                                                                                                </span>
                                                                                        </td>
                                                                                </tr>
                                                                        )
                                                                )}
                                                        </tbody>
                                                </table>
                                        </div>
                                </div>
                        </section> */}
                </div>
        );
}
