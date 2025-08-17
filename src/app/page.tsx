"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 72,
    hours: 8,
    minutes: 18,
    seconds: 45,
  })

  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopHand, setShowTopHand] = useState(false)
  const [showBottomHand, setShowBottomHand] = useState(false)
  const [showAboutSection, setShowAboutSection] = useState(false)
  const [showGuestSection, setShowGuestSection] = useState(false)
  const [showTrailerSection, setShowTrailerSection] = useState(false)

  const aboutSectionRef = useRef<HTMLElement>(null)
  const guestSectionRef = useRef<HTMLElement>(null)
  const trailerSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          }
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          }
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          }
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setIsScrolled(window.scrollY > heroBottom - 100)
      }
    }

    const topHandTimer = setTimeout(() => {
      setShowTopHand(true)
    }, 500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === aboutSectionRef.current) {
              setShowBottomHand(true)
              setShowAboutSection(true)
            }
            if (entry.target === guestSectionRef.current) {
              setShowGuestSection(true)
            }
            if (entry.target === trailerSectionRef.current) {
              setShowTrailerSection(true)
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current)
    }
    if (guestSectionRef.current) {
      observer.observe(guestSectionRef.current)
    }
    if (trailerSectionRef.current) {
      observer.observe(trailerSectionRef.current)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(topHandTimer)
      observer.disconnect()
    }
  }, [])

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const openYouTubeVideo = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-primary/80 backdrop-blur-[3px]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image width={2000} height={2000} src="/images/brand-logo.png" alt="Brand Logo" className="w-12 h-12" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-secondary font-medium">
                Beranda
              </a>
              <a href="#" className="text-white hover:text-secondary font-medium">
                Acara
              </a>
              <a href="#" className="text-white hover:text-secondary font-medium">
                Timeline
              </a>
            </div>

            <div className="w-12"></div>
          </div>
        </div>
      </nav>

      <section
        id="hero-section"
        className="min-h-screen flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: "url(/images/hero-bg.png)",
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
              <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">{timeLeft.days}</div>
              <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">Days</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
              <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">{timeLeft.hours}</div>
              <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
              <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">{timeLeft.minutes}</div>
              <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 sm:min-w-[80px]">
              <div className="text-[10px] sm:text-3xl font-bold text-white font-glofium">{timeLeft.seconds}</div>
              <div className="text-[10px] sm:text-sm font-medium text-white/80 font-poppins">Seconds</div>
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
        className={`min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20 relative transition-all duration-1000 ease-out ${
          showAboutSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div
          className={`absolute -top-0 sm:-top-60 -right-50 sm:-right-60 z-40 w-[287px] sm:w-[550px] h-[252px] sm:h-[802px] transition-all duration-1000 ease-out ${
            showTopHand ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-20"
          }`}
          style={{
            animation: showTopHand ? "fallBounce 1s ease-out" : "none",
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
          className={`absolute -bottom-10 sm:-bottom-0 -left-50 sm:-left-70 z-40 w-[287px] sm:w-[487px] h-[252px] sm:h-[552px] transition-all duration-1000 ease-out ${
            showBottomHand ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-20"
          }`}
          style={{
            animation: showBottomHand ? "throwUpBounce 1s ease-out" : "none",
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
            showAboutSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          }`}
        >
          <h2 className="text-[15px] sm:text-[28px] font-bold mb-5 font-glofium text-start">
            <span className="text-foreground">Apa itu </span>
            <span className="text-secondary">Valter</span>
            <span className="sm:text-[38px] text-secondary font-funky-vibes">?</span>
          </h2>

          <p className="text-foreground text-[10px] sm:text-[19.5px] leading-relaxed mb-10 sm:mb-16 font-poppins max-w-6xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <div className="bg-primary rounded-3xl sm:p-3 relative shadow-2xl sm:drop-shadow-[0px_12px_0px_#00000040]">
            <div className="inline-block bg-secondary text-white px-2 pt-1 sm:pt-1.5 pb-0.5 sm:pb-1 rounded sm:rounded-md text-[5px] sm:text-[10px] font-medium mb-2 sm:mb-6 drop-shadow-[0px_7px_0px_#00000040] sm:drop-shadow-[0px_10px_0px_#00000040]">
              Tema Valter 2025
            </div>
            <h3 className="text-white text-[13px] sm:text-[20px] font-bold font-glofium leading-tight pb-4 sm:pb-0 sm:mb-6">
              Creative synergy
              <span className="font-funky-vibes sm:text-[30px]">: &quot;</span>
              Kreativitas Berdaya bersama Teknologi <span className="font-funky-vibes sm:text-[30px]">&quot;</span>
            </h3>
          </div>
        </div>
      </section>

      <section
        ref={guestSectionRef}
        className={`min-h-screen bg-background flex items-center justify-center px-4 py-20 transition-all duration-1000 ease-out ${
          showGuestSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ease-out ${
            showGuestSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="flex sm:hidden justify-center lg:justify-end">
              <div className="w-full">
                <Image
                  width={2000}
                  height={2000}
                  src="/images/guest-star.png"
                  alt="Kevin Anggara Guest Star Card"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-8">
              <h2 className="text-center sm:text-[28px] font-bold font-glofium text-secondary">Co-Create or Compete</h2>

              <p className="text-foreground text-[12px] sm:text-[15px] leading-relaxed font-poppins">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>

              <button className="w-full bg-secondary hover:bg-secondary/90 text-white pt-2 pb-1 mt-2 rounded-md font-medium font-glofium transition-colors duration-300 text-[10px] sm:text-[12px] hover:cursor-pointer">
                Lihat Selengkapnya
              </button>
            </div>

            <div className="hidden sm:flex justify-center lg:justify-end">
              <div className="w-[530px] sm:-mr-50">
                <Image
                  width={2000}
                  height={2000}
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
          showTrailerSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div
          className={`w-full text-center transition-all duration-1000 delay-200 ease-out ${
            showTrailerSection ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="relative cursor-pointer group w-full" onClick={openYouTubeVideo}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-[360px] sm:h-[480px] bg-foreground/75 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  width={1000}
                  height={1000}
                  src="/images/hero-logo.png"
                  alt="VALTER 2026 Logo"
                  className="w-48 sm:w-72 h-auto"
                />
              </div>

              <div className="absolute top-4 left-4 z-10">
                <h2 className="text-xl sm:text-3xl font-bold font-glofium text-white px-3 py-2">
                  TRAILER VALTER 2025
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
              Click to watch the official VALTER 2026 trailer
            </p>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  )
}
