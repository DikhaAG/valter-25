import Image from "next/image";
import Link from "next/link";
import { TimeLeft } from "../layout";

interface Props {
        timeLeft: TimeLeft;
}
export function HomeNavSection({ timeLeft }: Props) {
        return (
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
        );
}
