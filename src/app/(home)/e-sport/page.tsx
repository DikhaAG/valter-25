"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { EsportFormRegsitrasiSection } from "./_sections/form-registrasi-section";
import { HeaderSection } from "../_section/header-section";
import { TimelineSection } from "../_section/timeline-section";
import { homeEsportHeaderData } from "@/data/home/e-sport/header-data";
import { homeEsportTimelineData } from "@/data/home/e-sport/timeline-data";

export default function EsportPage() {
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
                        <HeaderSection
                                data={homeEsportHeaderData}
                                isVisible={isVisible}
                        />

                        {/* Timeline Section */}
                        <TimelineSection
                                data={homeEsportTimelineData}
                                isVisible={isVisible}
                        />

                        {/* Registration Form Section */}
                        <EsportFormRegsitrasiSection isVisible={isVisible} />
                </div>
        );
}
