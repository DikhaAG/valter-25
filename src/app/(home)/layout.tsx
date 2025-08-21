"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HomeNavSection } from "./_sections/nav-section";
import { HomeFooterSection } from "./_sections/footer-section";
interface Props {
        children: React.ReactNode;
}
export type TimeLeft = {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
};
export default function HomeLayout({ children }: Props) {
        const [timeLeft, setTimeLeft] = useState<TimeLeft>({
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
        }, []);
        const pathname = usePathname();
        if (pathname === "/") {
                return <div className="font-glofium-demo">{children}</div>;
        }
        return (
                <div className="min-h-screen bg-background relative overflow-x-hidden font-glofium-demo text-foreground">
                        <HomeNavSection timeLeft={timeLeft} />
                        <div className="mt-30 mb-80">{children}</div>
                        {/* FOOTER */}
                        <HomeFooterSection />
                </div>
        );
}
