"use client";

import { useState, useEffect, useRef } from "react";
import {
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        Instagram,
        Music,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
        const [timeLeft, setTimeLeft] = useState({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
        });

        const [isScrolled, setIsScrolled] = useState(false);
        const [showTopHand, setShowTopHand] = useState(false);
        const [showBottomHand, setShowBottomHand] = useState(false);
        const [showAboutSection, setShowAboutSection] = useState(false);
        const [showGuestSection, setShowGuestSection] = useState(false);
        const [showTrailerSection, setShowTrailerSection] = useState(false);
        const [showActivitySection, setShowActivitySection] = useState(false);
        const [showTimelineSection, setShowTimelineSection] = useState(false);
        const [showSponsorSection, setShowSponsorSection] = useState(false);
        const [currentActivityIndex, setCurrentActivityIndex] = useState(1); // Start with middle item selected

        const aboutSectionRef = useRef<HTMLElement>(null);
        const guestSectionRef = useRef<HTMLElement>(null);
        const trailerSectionRef = useRef<HTMLElement>(null);
        const activitySectionRef = useRef<HTMLElement>(null);
        const timelineSectionRef = useRef<HTMLElement>(null);
        const sponsorSectionRef = useRef<HTMLElement>(null);

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
        }, []);

        useEffect(() => {
                const handleScroll = () => {
                        const heroSection =
                                document.getElementById("hero-section");
                        if (heroSection) {
                                const heroBottom =
                                        heroSection.offsetTop +
                                        heroSection.offsetHeight;
                                setIsScrolled(
                                        window.scrollY > heroBottom - 100
                                );
                        }
                };

                const topHandTimer = setTimeout(() => {
                        setShowTopHand(true);
                }, 500);

                const observer = new IntersectionObserver(
                        (entries) => {
                                entries.forEach((entry) => {
                                        if (entry.isIntersecting) {
                                                if (
                                                        entry.target ===
                                                        aboutSectionRef.current
                                                ) {
                                                        setShowBottomHand(true);
                                                        setShowAboutSection(
                                                                true
                                                        );
                                                }
                                                if (
                                                        entry.target ===
                                                        guestSectionRef.current
                                                ) {
                                                        setShowGuestSection(
                                                                true
                                                        );
                                                }
                                                if (
                                                        entry.target ===
                                                        trailerSectionRef.current
                                                ) {
                                                        setShowTrailerSection(
                                                                true
                                                        );
                                                }
                                                if (
                                                        entry.target ===
                                                        activitySectionRef.current
                                                ) {
                                                        setShowActivitySection(
                                                                true
                                                        );
                                                }
                                                if (
                                                        entry.target ===
                                                        timelineSectionRef.current
                                                ) {
                                                        setShowTimelineSection(
                                                                true
                                                        );
                                                }
                                                if (
                                                        entry.target ===
                                                        sponsorSectionRef.current
                                                ) {
                                                        setShowSponsorSection(
                                                                true
                                                        );
                                                }
                                        }
                                });
                        },
                        { threshold: 0.2 }
                );

                if (aboutSectionRef.current) {
                        observer.observe(aboutSectionRef.current);
                }
                if (guestSectionRef.current) {
                        observer.observe(guestSectionRef.current);
                }
                if (trailerSectionRef.current) {
                        observer.observe(trailerSectionRef.current);
                }
                if (activitySectionRef.current) {
                        observer.observe(activitySectionRef.current);
                }
                if (timelineSectionRef.current) {
                        observer.observe(timelineSectionRef.current);
                }
                if (sponsorSectionRef.current) {
                        observer.observe(sponsorSectionRef.current);
                }

                window.addEventListener("scroll", handleScroll);

                return () => {
                        window.removeEventListener("scroll", handleScroll);
                        clearTimeout(topHandTimer);
                        observer.disconnect();
                };
        }, []);

        const scrollToAbout = () => {
                aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const openYouTubeVideo = () => {
                window.open(
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        "_blank"
                );
        };

        const activities = [
                {
                        image: "/images/uiuix.png",
                        title: "UI/UX Design",
                        description: "User Interface & Experience Design",
                },
                {
                        image: "/images/game.png",
                        title: "E-Sport",
                        description: "Epep, Mobile Legend dan Roblox",
                },
                {
                        image: "/images/vid.png",
                        title: "Video Campaign",
                        description: "",
                },
        ];

        const nextActivity = () => {
                setCurrentActivityIndex(
                        (prev) => (prev + 1) % activities.length
                );
        };

        const prevActivity = () => {
                setCurrentActivityIndex(
                        (prev) =>
                                (prev - 1 + activities.length) %
                                activities.length
                );
        };

        const getCarouselTransform = () => {
                // Calculate responsive item width including spacing
                const baseItemWidth = {
                        mobile: 120, // Base width for mobile (< 640px)
                        tablet: 160, // Base width for tablet (640px - 1024px)
                        desktop: 200, // Base width for desktop (> 1024px)
                };

                // Use CSS calc to make it truly responsive
                const mobileOffset =
                        -currentActivityIndex * baseItemWidth.mobile;
                const tabletOffset =
                        -currentActivityIndex * baseItemWidth.tablet;
                const desktopOffset =
                        -currentActivityIndex * baseItemWidth.desktop;

                // Return responsive transform using CSS custom properties approach
                return `translateX(calc(${mobileOffset}px + 50% - ${
                        baseItemWidth.mobile / 2
                }px))`;
        };

        const timelineEvents = [
                {
                        date: "07 Juli 2025 - 07 September 2025",
                        title: "Pendaftaran dan Submit Proposal",
                        description:
                                "Proses pendaftaran untuk peserta kompetisi dimulai pada tanggal 7 Juli 2025 hingga 7 September 2025. Pada tahap ini, peserta diharuskan mengisi formulir pendaftaran dan mengunggah proposal yang berisi detail ide atau proyek mereka yang akan dikutsertakan dalam kompetisi.",
                },
                {
                        date: "15 September 2025 - 26 September 2025",
                        title: "Babak Penyisihan",
                        description:
                                "Tahap babak penyisihan akan berlangsung pada tanggal 15 September 2025 dan 22 - 26 September 2025.",
                },
                {
                        date: "29 September 2025",
                        title: "Pengumuman Finalis",
                        description:
                                "Pengumuman finalis kompetisi akan dilakukan pada tanggal 29 September 2025. Peserta yang berhasil lolos ke tahap final akan diinformasikan melalui situs resmi kompetisi dan juga melalui email yang terdaftar pada saat pendaftaran.",
                },
                {
                        date: "12 Oktober 2025 - 14 Oktober 2025",
                        title: "Final",
                        description:
                                "Babak final akan dilaksanakan dari tanggal 12 Oktober hingga 14 Oktober 2025. Pada tahap ini, para finalis akan mempresentasikan hasil akhir dari proyek mereka di hadapan dewan juri. Penilaian akan dilakukan secara menyeluruh berdasarkan kreativitas, inovasi, dan dampak yang dihasilkan dari proyek tersebut.",
                },
        ];

        return (
                <div className="min-h-screen bg-background relative overflow-x-hidden">
                        <nav
                                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                                        isScrolled
                                                ? "bg-primary/80 backdrop-blur-[3px]"
                                                : "bg-transparent"
                                }`}
                        >
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                                                href="#"
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

                                                <div className="w-12"></div>
                                        </div>
                                </div>
                        </nav>

                        <section
                                id="hero-section"
                                className="min-h-screen flex flex-col items-center justify-center text-white relative"
                                style={{
                                        backgroundImage:
                                                "url(/images/hero-bg.png)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                }}
                        >
                                <div className="text-center z-10">
                                        <div className="mb-8">
                                                <Image
                                                        width={1000}
                                                        height={1000}
                                                        src="/images/hero-logo.png"
                                                        alt="VALTER 2026"
                                                        className="w-60 sm:w-96 h-auto mx-auto"
                                                />
                                        </div>

                                        <div className="flex justify-center space-x-4 mb-16">
                                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
                                                        <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">
                                                                {timeLeft.days}
                                                        </div>
                                                        <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">
                                                                Days
                                                        </div>
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
                                                        <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">
                                                                {timeLeft.hours}
                                                        </div>
                                                        <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">
                                                                Hours
                                                        </div>
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
                                                        <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">
                                                                {
                                                                        timeLeft.minutes
                                                                }
                                                        </div>
                                                        <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">
                                                                Minutes
                                                        </div>
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
                                                        <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">
                                                                {
                                                                        timeLeft.seconds
                                                                }
                                                        </div>
                                                        <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">
                                                                Seconds
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <div
                                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center group cursor-pointer z-50"
                                        onClick={scrollToAbout}
                                >
                                        <p className="text-white font-medium mb-4 font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Scroll ke bawah
                                        </p>
                                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-bounce group-hover:bg-white/20 transition-all duration-300">
                                                <ChevronDown className="w-6 h-6 text-white" />
                                        </div>
                                </div>
                        </section>

                        <section
                                ref={aboutSectionRef}
                                className={`min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20 relative transition-all duration-1000 ease-out z-20 ${
                                        showAboutSection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={`absolute -top-0 sm:-top-60 -right-50 sm:-right-60 z-50 w-[287px] sm:w-[550px] h-[252px] sm:h-[802px] transition-all duration-1000 ease-out ${
                                                showTopHand
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform -translate-y-20"
                                        }`}
                                        style={{
                                                animation: showTopHand
                                                        ? "fallBounce 1s ease-out"
                                                        : "none",
                                        }}
                                >
                                        <Image
                                                width={2000}
                                                height={2000}
                                                src="/images/hand.png"
                                                alt="Hand gesture"
                                                className="w-full h-full object-contain rotate-200 drop-shadow-[-7px_-7px_0px_#00000040]"
                                        />
                                </div>

                                <div
                                        className={`absolute -bottom-10 sm:-bottom-0 -left-50 sm:-left-70 z-100 w-[287px] sm:w-[487px] h-[252px] sm:h-[552px] transition-all duration-1000 ease-out ${
                                                showBottomHand
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-20"
                                        }`}
                                        style={{
                                                animation: showBottomHand
                                                        ? "throwUpBounce 1s ease-out"
                                                        : "none",
                                        }}
                                >
                                        <Image
                                                width={2000}
                                                height={2000}
                                                src="/images/hand.png"
                                                alt="Hand gesture"
                                                className="w-full h-full object-contain rotate-14 drop-shadow-[7px_9px_0px_#00000040]"
                                        />
                                </div>

                                <div
                                        className={`max-w-4xl mx-auto text-center sm:pt-20 transition-all duration-1000 delay-300 ease-out ${
                                                showAboutSection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <h2 className="text-[15px] sm:text-[28px] font-bold mb-5 font-glofium text-start">
                                                <span className="text-foreground">
                                                        Apa itu{" "}
                                                </span>
                                                <span className="text-secondary">
                                                        Valter
                                                </span>
                                                <span className="sm:text-[38px] text-secondary font-funky-vibes">
                                                        ?
                                                </span>
                                        </h2>

                                        <p className="text-foreground text-[10px] sm:text-[19.5px] leading-relaxed mb-10 sm:mb-16 font-poppins max-w-6xl">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute
                                                irure dolor in reprehenderit in
                                                voluptate velit esse cillum
                                                dolore eu fugiat nulla pariatur.
                                                Excepteur sint occaecat
                                                cupidatat non proident, sunt in
                                                culpa qui officia deserunt
                                                mollit anim id est laborum.
                                        </p>

                                        <div className="bg-primary rounded-3xl sm:p-3 relative shadow-2xl sm:drop-shadow-[0px_12px_0px_#00000040]">
                                                <div className="inline-block bg-secondary text-white px-2 pt-1 sm:pt-1.5 pb-0.5 sm:pb-1 rounded sm:rounded-md text-[5px] sm:text-[10px] font-medium mb-2 sm:mb-6 drop-shadow-[0px_7px_0px_#00000040] sm:drop-shadow-[0px_10px_0px_#00000040]">
                                                        Tema Valter 2025
                                                </div>
                                                <h3 className="text-white text-[13px] sm:text-[20px] font-bold font-glofium leading-tight pb-4 sm:pb-0 sm:mb-6">
                                                        Creative synergy
                                                        <span className="font-funky-vibes sm:text-[30px]">
                                                                : &quot;
                                                        </span>
                                                        Kreativitas Berdaya
                                                        bersama Teknologi{" "}
                                                        <span className="font-funky-vibes sm:text-[30px]">
                                                                &quot;
                                                        </span>
                                                </h3>
                                        </div>
                                </div>
                        </section>

                        <section
                                ref={guestSectionRef}
                                className={`min-h-screen bg-background flex items-center justify-center px-4 py-20 z-10 transition-all duration-1000 ease-out ${
                                        showGuestSection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ease-out ${
                                                showGuestSection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                                                <div className="flex sm:hidden justify-center lg:justify-end">
                                                        <div className="w-full">
                                                                <Image
                                                                        width={
                                                                                2000
                                                                        }
                                                                        height={
                                                                                2000
                                                                        }
                                                                        src="/images/guest-star.png"
                                                                        alt="Kevin Anggara Guest Star Card"
                                                                        className="w-[350px] h-[350px] object-contain"
                                                                />
                                                        </div>
                                                </div>

                                                <div className="space-y-2 sm:space-y-8">
                                                        <h2 className="text-center sm:text-[28px] font-bold font-glofium text-secondary">
                                                                Co-Create or
                                                                Compete
                                                        </h2>

                                                        <p className="text-foreground text-[12px] sm:text-[15px] leading-relaxed font-poppins">
                                                                Lorem ipsum
                                                                dolor sit amet,
                                                                consectetur
                                                                adipiscing elit,
                                                                sed do eiusmod
                                                                tempor
                                                                incididunt ut
                                                                labore et dolore
                                                                magna aliqua. Ut
                                                                enim ad minim
                                                                veniam, quis
                                                                nostrud
                                                                exercitation
                                                                ullamco laboris
                                                                nisi ut aliquip
                                                                ex ea commodo
                                                                consequat. Duis
                                                                aute irure dolor
                                                                in reprehenderit
                                                                in voluptate
                                                                velit esse
                                                                cillum dolore eu
                                                                fugiat nulla
                                                                pariatur.
                                                                Excepteur sint
                                                                occaecat
                                                                cupidatat non
                                                                proident, sunt
                                                                in culpa qui
                                                                officia deserunt
                                                                mollit anim id
                                                                est laborum.
                                                        </p>

                                                        <button className="w-full bg-secondary hover:bg-secondary/90 text-white pt-2 pb-1 mt-2 rounded-md font-medium font-glofium transition-colors duration-300 text-[10px] sm:text-[12px] hover:cursor-pointer">
                                                                Lihat
                                                                Selengkapnya
                                                        </button>
                                                </div>

                                                <div className="hidden md:flex justify-center lg:justify-end">
                                                        <div className="w-[400px]">
                                                                <Image
                                                                        width={
                                                                                2000
                                                                        }
                                                                        height={
                                                                                2000
                                                                        }
                                                                        src="/images/guest-star.png"
                                                                        alt="Kevin Anggara Guest Star Card"
                                                                        className="w-full h-full object-contain"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section
                                ref={trailerSectionRef}
                                className={`min-h-screen bg-background flex items-center justify-center px-4 py-20 transition-all duration-1000 ease-out ${
                                        showTrailerSection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={`w-full text-center transition-all duration-1000 delay-200 ease-out ${
                                                showTrailerSection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <div
                                                className="relative cursor-pointer group w-full"
                                                onClick={openYouTubeVideo}
                                        >
                                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                                        <div className="w-full h-[360px] sm:h-[480px] bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                                                <Image
                                                                        width={
                                                                                1000
                                                                        }
                                                                        height={
                                                                                1000
                                                                        }
                                                                        src="/images/hero-logo.png"
                                                                        alt="VALTER 2026 Logo"
                                                                        className="w-48 sm:w-72 h-auto"
                                                                />
                                                        </div>

                                                        <div className="absolute top-4 left-4 z-10">
                                                                <h2 className="text-xl sm:text-3xl font-bold font-glofium text-background/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                                                                        Watch
                                                                        Our
                                                                        Trailer
                                                                </h2>
                                                        </div>

                                                        {/* Play button overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                                                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                                        <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                                                                </div>
                                                        </div>
                                                </div>

                                                <p className="text-foreground font-poppins mt-4 text-sm sm:text-base">
                                                        Click to watch the
                                                        official VALTER 2026
                                                        trailer
                                                </p>
                                        </div>
                                </div>
                        </section>

                        {/* ACTIVITY SECTION */}
                        <section
                                ref={activitySectionRef}
                                className={`min-h-screen bg-background flex items-center justify-center px-4 py-20 transition-all duration-1000 ease-out ${
                                        showActivitySection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={` max-w-8xl lg:max-w-[1200px] mx-auto text-center transition-all duration-1000 delay-200 ease-out ${
                                                showActivitySection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 font-glofium">
                                                <span className="text-foreground">
                                                        Kegiatan{" "}
                                                </span>
                                                <span className="text-secondary">
                                                        Valter
                                                </span>
                                        </h2>

                                        <div className=" relative flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-20">
                                                {/* Left Arrow */}
                                                <button
                                                        onClick={prevActivity}
                                                        className="cursor-pointer p-2 sm:p-3 rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95 flex-shrink-0 z-20"
                                                >
                                                        <Image className="w-5 h-10 rotate-180" src={"/images/arrow-icon.png"} alt="arrow" width={1000} height={1000} />
                                                </button>

                                                <div className=" mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-[700px] xl:max-w-[1500px] flex items-center justify-center min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px] xl:min-h-[420px] overflow-hidden relative">
                                                        <div
                                                                className=" lg:h-[600px] lg:-ml-40 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                                                style={{
                                                                        transform: getCarouselTransform(),
                                                                        gap: "clamp(1rem, 4vw, 4rem)", // Responsive gap
                                                                }}
                                                        >
                                                                {activities.map(
                                                                        (
                                                                                activity,
                                                                                index
                                                                        ) => {
                                                                                const isCenter =
                                                                                        index ===
                                                                                        currentActivityIndex;
                                                                                const isAdjacent =
                                                                                        Math.abs(
                                                                                                index -
                                                                                                        currentActivityIndex
                                                                                        ) ===
                                                                                                1 ||
                                                                                        (currentActivityIndex ===
                                                                                                0 &&
                                                                                                index ===
                                                                                                        activities.length -
                                                                                                                1) ||
                                                                                        (currentActivityIndex ===
                                                                                                activities.length -
                                                                                                        1 &&
                                                                                                index ===
                                                                                                        0);

                                                                                return (
                                                                                        <div
                                                                                                key={`activity-${index}`}
                                                                                                className={` flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu flex-shrink-0 ${
                                                                                                        isCenter
                                                                                                                ? "transform scale-110 sm:scale-125 md:scale-130 lg:scale-140 xl:scale-150 z-10 opacity-100"
                                                                                                                : isAdjacent
                                                                                                                ? "transform scale-75 sm:scale-80 md:scale-85 lg:scale-90 xl:scale-95 opacity-60 hover:opacity-80"
                                                                                                                : "transform scale-60 sm:scale-65 md:scale-70 lg:scale-75 xl:scale-80 opacity-30"
                                                                                                }`}
                                                                                                style={{
                                                                                                        width: isCenter
                                                                                                                ? "clamp(120px, 20vw, 200px)"
                                                                                                                : isAdjacent
                                                                                                                ? "clamp(90px, 15vw, 150px)"
                                                                                                                : "clamp(70px, 12vw, 120px)",
                                                                                                }}
                                                                                        >
                                                                                                <div
                                                                                                        className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                                                                                                                isCenter
                                                                                                                        ? "drop-shadow-2xl"
                                                                                                                        : isAdjacent
                                                                                                                        ? "drop-shadow-md"
                                                                                                                        : "drop-shadow-sm"
                                                                                                        }`}
                                                                                                >
                                                                                                        <Link
                                                                                                                href={
                                                                                                                        "/"
                                                                                                                }
                                                                                                        >
                                                                                                                <Image
                                                                                                                        width={
                                                                                                                                200
                                                                                                                        }
                                                                                                                        height={
                                                                                                                                200
                                                                                                                        }
                                                                                                                        src={
                                                                                                                                activity.image ||
                                                                                                                                "/placeholder.svg" ||
                                                                                                                                "/placeholder.svg"
                                                                                                                        }
                                                                                                                        alt={
                                                                                                                                activity.title
                                                                                                                        }
                                                                                                                        className={`object-contain transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                                                                                                                                isCenter
                                                                                                                                        ? "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52"
                                                                                                                                        : isAdjacent
                                                                                                                                        ? "w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 xl:w-30 xl:h-30"
                                                                                                                                        : "w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 xl:w-26 xl:h-26"
                                                                                                                        }`}
                                                                                                                />
                                                                                                        </Link>
                                                                                                </div>
                                                                                                <div
                                                                                                        className={`mt-2 sm:mt-3 md:mt-4 lg:mt-5 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
                                                                                                                isCenter
                                                                                                                        ? "opacity-100 translate-y-0 scale-100"
                                                                                                                        : isAdjacent
                                                                                                                        ? "opacity-70 translate-y-1 scale-95"
                                                                                                                        : "opacity-50 translate-y-2 scale-90"
                                                                                                        } flex flex-col justify-start items-center text-center`}
                                                                                                        style={{
                                                                                                                width: "100%",
                                                                                                                maxWidth: isCenter
                                                                                                                        ? "clamp(140px, 25vw, 220px)"
                                                                                                                        : isAdjacent
                                                                                                                        ? "clamp(110px, 20vw, 180px)"
                                                                                                                        : "clamp(90px, 15vw, 140px)",
                                                                                                        }}
                                                                                                >
                                                                                                        <h3
                                                                                                                className={`font-bold font-funky-vibes text-foreground transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] leading-tight ${
                                                                                                                        isCenter
                                                                                                                                ? "text-md sm:text-lg md:text-xl lg:text-2xl xl:text-2xl"
                                                                                                                                : isAdjacent
                                                                                                                                ? "text-sm sm:text-md md:text-lg lg:text-xl xl:text-xl"
                                                                                                                                : "text-[12px] sm:text-sm md:text-base lg:text-md xl:text-xl"
                                                                                                                } mb-1`}
                                                                                                        >
                                                                                                                {
                                                                                                                        activity.title
                                                                                                                }
                                                                                                        </h3>
                                                                                                        <p
                                                                                                                className={`font-poppins text-foreground/70 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] leading-tight ${
                                                                                                                        isCenter
                                                                                                                                ? "text-[10px] sm:text-base md:text-md lg:text-xl xl:text-[14px]"
                                                                                                                                : isAdjacent
                                                                                                                                ? "text-[8px] sm:text-sm md:text-base lg:text-md xl:text-[10px]"
                                                                                                                                : "text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-[6px]"
                                                                                                                }`}
                                                                                                        >
                                                                                                                {
                                                                                                                        activity.description
                                                                                                                }
                                                                                                        </p>
                                                                                                </div>
                                                                                        </div>
                                                                                );
                                                                        }
                                                                )}
                                                        </div>
                                                </div>

                                                {/* Right Arrow */}
                                                <button
                                                        onClick={nextActivity}
                                                        className="cursor-pointer p-2 sm:p-3 rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95 flex-shrink-0 z-20"
                                                >
                                                        <Image className="w-5 h-10" src={"/images/arrow-icon.png"} alt="arrow" width={1000} height={1000} />
                                                </button>
                                        </div>
                                </div>
                        </section>

                        {/* TIMELINE SECTION */}
                        <section
                        id="timeline-section"
                                ref={timelineSectionRef}
                                className={`min-h-screen bg-background flex items-center justify-center px-4 py-20 transition-all duration-1000 ease-out ${
                                        showTimelineSection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ease-out ${
                                                showTimelineSection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 font-glofium text-foreground">
                                                Timeline
                                        </h2>
                                        <div className="w-16 h-1 bg-primary mx-auto mb-12"></div>

                                        <div className=" relative">
                                                {/* Vertical line */}
                                                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary h-full"></div>

                                                {timelineEvents.map(
                                                        (event, index) => (
                                                                <div
                                                                        key={
                                                                                index
                                                                        }
                                                                        className={`relative flex items-center mb-16 ${
                                                                                index %
                                                                                        2 ===
                                                                                0
                                                                                        ? "flex-row-reverse"
                                                                                        : "flex-row"
                                                                        }`}
                                                                >
                                                                        {/* Timeline dot */}
                                                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>

                                                                        {/* Content */}
                                                                        <div
                                                                                className={` w-5/12 ${
                                                                                        index %
                                                                                                2 ===
                                                                                        0
                                                                                                ? "text-right sm:pr-8"
                                                                                                : "text-left sm:pl-8"
                                                                                }`}
                                                                        >
                                                                                <div className="bg-primary/10 rounded-lg p-4 shadow-sm">
                                                                                        <div className="text-primary text-[10px] md:text-sm font-medium mb-2 font-poppins">
                                                                                                {
                                                                                                        event.date
                                                                                                }
                                                                                        </div>
                                                                                        <h3 className="text-[10px] md:text-lg font-bold mb-3 font-glofium text-foreground">
                                                                                                {
                                                                                                        event.title
                                                                                                }
                                                                                        </h3>
                                                                                        <p className="text-[8px] md:text-sm text-foreground/70 font-poppins leading-relaxed">
                                                                                                {
                                                                                                        event.description
                                                                                                }
                                                                                        </p>
                                                                                </div>
                                                                        </div>

                                                                        {/* Spacer for the other side */}
                                                                        <div className="w-5/12"></div>
                                                                </div>
                                                        )
                                                )}
                                        </div>

                                        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium font-glofium transition-colors duration-300 mt-8">
            📅 Detail Timeline
          </button> */}
                                </div>
                        </section>

                        {/* SPONSOR SECTION */}
                        <section
                                ref={sponsorSectionRef}
                                className={`min-h-screen bg-background flex items-center justify-center px-4 md:py-20 relative transition-all duration-1000 ease-out ${
                                        showSponsorSection
                                                ? "opacity-100 transform translate-y-0"
                                                : "opacity-0 transform translate-y-10"
                                }`}
                        >
                                <div
                                        className={`absolute -top-0 sm:-top-60 -right-50 sm:-right-60 z-100 w-[287px] sm:w-[550px] h-[252px] sm:h-[802px] transition-all duration-1000 ease-out ${
                                                showTopHand
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform -translate-y-20"
                                        }`}
                                        style={{
                                                animation: showTopHand
                                                        ? "fallBounce 1s ease-out"
                                                        : "none",
                                        }}
                                >
                                        <Image
                                                width={2000}
                                                height={2000}
                                                src="/images/hand.png"
                                                alt="Hand gesture"
                                                className="w-full h-full object-contain rotate-200 drop-shadow-[-7px_-7px_0px_#00000040]"
                                        />
                                </div>

                                <div
                                        className={`absolute -bottom-20 sm:-bottom-30 -left-50 sm:-left-70 z-50 w-[287px] sm:w-[487px] h-[252px] sm:h-[552px] transition-all duration-1000 ease-out ${
                                                showBottomHand
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-20"
                                        }`}
                                        style={{
                                                animation: showBottomHand
                                                        ? "throwUpBounce 1s ease-out"
                                                        : "none",
                                        }}
                                >
                                        <Image
                                                width={2000}
                                                height={2000}
                                                src="/images/hand.png"
                                                alt="Hand gesture"
                                                className="w-full h-full object-contain rotate-14 drop-shadow-[7px_9px_0px_#00000040]"
                                        />
                                </div>
                                {/* Decorative hands with sparkles */}
                                <div className="absolute top-20 right-20 w-16 h-16 opacity-60">
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                                </div>

                                <div className="absolute bottom-20 left-20 w-20 h-20 opacity-60">
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                                        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                                </div>

                                <div
                                        className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ease-out ${
                                                showSponsorSection
                                                        ? "opacity-100 transform translate-y-0"
                                                        : "opacity-0 transform translate-y-10"
                                        }`}
                                >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                                {/* Telephone illustration */}
                                                <div className="flex justify-center lg:justify-start relative">
                                                        <div className="relative">
                                                                <Image
                                                                        width={
                                                                                400
                                                                        }
                                                                        height={
                                                                                400
                                                                        }
                                                                        src="/images/telephone.png"
                                                                        alt="Vintage telephone"
                                                                        className="w-50 md:w-80 md:h-80 object-contain"
                                                                />
                                                                {/* Sparkle effects */}
                                                                <div className="absolute top-10 right-10 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                                                                <div className="absolute bottom-20 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-75"></div>
                                                                <div className="absolute top-1/2 right-5 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-75"></div>
                                                                <div className="absolute bottom-10 right-20 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-75"></div>
                                                        </div>
                                                </div>

                                                {/* Content */}
                                                <div className="text-center lg:text-left space-y-6">
                                                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-glofium">
                                                                <span className="text-foreground">
                                                                        Memanggil{" "}
                                                                </span>
                                                                <span className="text-pink-600">
                                                                        Sponsorship
                                                                        <span className=" font-funky-vibes text-5xl md:text-7xl">
                                                                                !
                                                                        </span>
                                                                </span>
                                                        </h2>

                                                        <div className="md:space-y-4">
                                                                <div className="flex items-center justify-center lg:justify-start space-x-3">
                                                                        <span className="text-pink-600 font-bold text-sm md:text-lg font-glofium">
                                                                                Khaidir
                                                                        </span>
                                                                        <span className="text-foreground font-funky-vibes">
                                                                                (+62
                                                                                813-7340-3806)
                                                                        </span>
                                                                </div>
                                                                <div className="flex items-center justify-center lg:justify-start space-x-3">
                                                                        <span className="text-pink-600 font-bold text-sm md:text-lg font-glofium">
                                                                                Fathir
                                                                        </span>
                                                                        <span className="text-foreground  font-funky-vibes">
                                                                                (+62
                                                                                851-4254-5842)
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

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

                        <style jsx>{`
                                @keyframes fallBounce {
                                        0% {
                                                transform: translateY(-100px);
                                                opacity: 0;
                                        }
                                        60% {
                                                transform: translateY(10px);
                                                opacity: 1;
                                        }
                                        80% {
                                                transform: translateY(-5px);
                                        }
                                        100% {
                                                transform: translateY(0);
                                                opacity: 1;
                                        }
                                }

                                @keyframes throwUpBounce {
                                        0% {
                                                transform: translateY(100px);
                                                opacity: 0;
                                        }
                                        60% {
                                                transform: translateY(-10px);
                                                opacity: 1;
                                        }
                                        80% {
                                                transform: translateY(5px);
                                        }
                                        100% {
                                                transform: translateY(0);
                                                opacity: 1;
                                        }
                                }

                                @keyframes slideInCenter {
                                        0% {
                                                transform: scale(0.75)
                                                        translateX(0)
                                                        translateY(10px);
                                                opacity: 0.6;
                                        }
                                        50% {
                                                transform: scale(1.05)
                                                        translateX(0)
                                                        translateY(-5px);
                                                opacity: 0.95;
                                        }
                                        100% {
                                                transform: scale(1.1)
                                                        translateX(0)
                                                        translateY(0);
                                                opacity: 1;
                                        }
                                }

                                @keyframes slideInLeft {
                                        0% {
                                                transform: scale(1.1)
                                                        translateX(20px)
                                                        translateY(-10px);
                                                opacity: 1;
                                        }
                                        50% {
                                                transform: scale(0.85)
                                                        translateX(-10px)
                                                        translateY(5px);
                                                opacity: 0.7;
                                        }
                                        100% {
                                                transform: scale(0.75)
                                                        translateX(-4px)
                                                        translateY(0);
                                                opacity: 0.6;
                                        }
                                }

                                @keyframes slideInRight {
                                        0% {
                                                transform: scale(1.1)
                                                        translateX(-20px)
                                                        translateY(-10px);
                                                opacity: 1;
                                        }
                                        50% {
                                                transform: scale(0.85)
                                                        translateX(10px)
                                                        translateY(5px);
                                                opacity: 0.7;
                                        }
                                        100% {
                                                transform: scale(0.75)
                                                        translateX(4px)
                                                        translateY(0);
                                                opacity: 0.6;
                                        }
                                }

                                .line-clamp-2 {
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                }

                                @media (min-width: 640px) {
                                        @keyframes slideInCenter {
                                                0% {
                                                        transform: scale(0.8)
                                                                translateY(8px);
                                                        opacity: 0.7;
                                                }
                                                50% {
                                                        transform: scale(1.15)
                                                                translateY(-3px);
                                                        opacity: 0.95;
                                                }
                                                100% {
                                                        transform: scale(1.1)
                                                                translateY(0);
                                                        opacity: 1;
                                                }
                                        }
                                }

                                @media (min-width: 1025px) {
                                        @keyframes slideInCenter {
                                                0% {
                                                        transform: scale(0.7)
                                                                translateY(12px);
                                                        opacity: 0.6;
                                                }
                                                50% {
                                                        transform: scale(1.55)
                                                                translateY(-8px);
                                                        opacity: 0.9;
                                                }
                                                100% {
                                                        transform: scale(1.5)
                                                                translateY(0);
                                                        opacity: 1;
                                                }
                                        }
                                }
                        `}</style>
                </div>
        );
}
