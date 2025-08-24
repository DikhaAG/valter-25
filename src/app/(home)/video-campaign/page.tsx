"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { VideoCampaignForm } from "./_components/form/main";
import { HeaderSection } from "../_sections/header-section";
import { TimelineSection } from "../_sections/timeline-section";
import { headerData } from "@/data/home/video-campaign/header-data";
import { timelineData } from "@/data/home/video-campaign/timeline-data";

export default function VideoCampaignPage() {
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
         <HeaderSection data={headerData} isVisible={isVisible} />

         {/* Timeline Section */}
         <TimelineSection data={timelineData} isVisible={isVisible} />

         {/* Registration Form Section */}
         <VideoCampaignForm isVisible={isVisible} />
      </div>
   );
}
