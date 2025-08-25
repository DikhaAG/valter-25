"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { HeaderSection } from "../../../components/home/header-section";
import { TimelineSection } from "../../../components/home/timeline-section";
import { headerData } from "@/data/home/e-sport/header-data";
import { timelineData } from "@/data/home/e-sport/timeline-data";
import { Form } from "@/components/home/esport/form-registration/main";

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
         <HeaderSection data={headerData} isVisible={isVisible} />

         {/* Timeline Section */}
         <TimelineSection data={timelineData} isVisible={isVisible} />

         {/* Registration Form Section */}
         <Form isVisible={isVisible} />
      </div>
   );
}
