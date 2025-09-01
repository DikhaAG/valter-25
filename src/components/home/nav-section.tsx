import Image from "next/image";
import Link from "next/link";
import { TimeLeft } from "../../app/(home)/layout";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/nb/button";

interface Props {
   timeLeft: TimeLeft;
}
export function HomeNavSection({ timeLeft }: Props) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
      <>
         <div
            className={`block md:hidden fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 transform transition-transform duration-300 opacity-100 border-10 border-background border-dashed inset-shadow-xl rounded-t-full rounded-b-4xl -skew-x-[10deg] -skew-y-[20deg] ${
               !isSidebarOpen && "skew-y-[60deg] opacity-0 rounded-b-full"
            } translate-y-10 ${
               isSidebarOpen
                  ? "translate-x-[50%] sm:translate-x-[55%]"
                  : "translate-x-full"
            }`}
         >
            <div className="p-4 flex flex-col h-full mt-20">
               <div className="flex justify-end items-end mb-10 max-w-[38%]">
                  {/* Tombol Tutup Sidebar */}
               </div>

               {/* Link Navigasi Sidebar */}
               <nav className="flex flex-col space-y-4 text-2xl font-bold max-w-[38%]">
                  <Link
                     href="/"
                     onClick={() => setIsSidebarOpen(false)}
                     className="flex flex-col justify-end items-end text-end"
                  >
                     <Button
                        variant={"gosong"}
                        className="bg-background text-foreground w-fit"
                     >
                        Beranda
                     </Button>
                     <div className="border w-[60%] mt-2"></div>
                  </Link>
                  <Link
                     href="/#activity-section"
                     onClick={() => setIsSidebarOpen(false)}
                     className="flex flex-col justify-end items-end text-end"
                  >
                     <Button
                        variant={"gosong"}
                        className="bg-background text-foreground w-fit"
                     >
                        Kegiatan
                     </Button>
                     <div className="border w-[40%] mt-2"></div>
                  </Link>
                  <Link
                     href="#timeline-section"
                     onClick={() => setIsSidebarOpen(false)}
                     className="flex flex-col justify-end items-end text-end"
                  >
                     <Button
                        variant={"gosong"}
                        className="bg-background text-foreground w-fit"
                     >
                        Timeline
                     </Button>
                     <div className="border w-[60%] mt-2"></div>
                  </Link>
                  <Link
                     href="#pendaftaran-section"
                     onClick={() => setIsSidebarOpen(false)}
                     className="flex flex-col justify-end items-end text-end"
                  >
                     <Button
                        variant={"gosong"}
                        className="bg-background text-foreground w-fit"
                     >
                        Pendaftaran
                     </Button>
                     <div className="border w-[80%] mt-2"></div>
                  </Link>
               </nav>
            </div>
         </div>

         {/* Navbar */}
         <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-primary rounded-b-lg drop-shadow-[0px_10px_0px_#00000040]`}
         >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <div className="flex items-center">
                     <Image
                        width={500}
                        height={500}
                        src="/images/brand-logo.png"
                        alt="Brand Logo"
                        className="w-10 h-10"
                     />
                  </div>

                  {/* Desktop Navigation Links */}
                  <div className="hidden md:flex items-center space-x-8">
                     <Link
                        href="/"
                        className="text-white hover:text-secondary font-medium"
                     >
                        Beranda
                     </Link>
                     <Link
                        href="#timeline-section"
                        className="text-white hover:text-secondary font-medium"
                     >
                        Timeline
                     </Link>
                     <Link
                        href="#pendaftaran-section"
                        className="text-white hover:text-secondary font-medium"
                     >
                        Pendaftaran
                     </Link>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center space-x-2">
                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-sm font-bold font-glofium">
                           {timeLeft.days.toString().padStart(2, "0")}
                        </span>
                     </div>
                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-sm font-bold font-glofium">
                           {timeLeft.hours.toString().padStart(2, "0")}
                        </span>
                     </div>
                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-sm font-bold font-glofium">
                           {timeLeft.minutes.toString().padStart(2, "0")}
                        </span>
                     </div>
                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-sm font-bold font-glofium">
                           {timeLeft.seconds.toString().padStart(2, "0")}
                        </span>
                     </div>
                  </div>

                  {/* Mobile Toggle Button */}
                  <div className="md:hidden flex items-center">
                     <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white focus:outline-none cursor-pointer"
                     >
                        {isSidebarOpen ? (
                           <X className="h-8 w-8 border-2 border-foreground bg-background text-foreground rounded-md p-1.5 transition-all " />
                        ) : (
                           <Menu className="h-8 w-8 border-2 border-foreground bg-background text-foreground rounded-md p-1.5 -translate-x-0.5 -translate-y-0.5 hover:translate-0 drop-shadow-[4px_4px_0px_#212121] hover:drop-shadow-none transition-all " />
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
}
