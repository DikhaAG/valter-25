"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { HeaderSection } from "../../../components/home/header-section";
import { TimelineSection } from "../../../components/home/timeline-section";
import { headerData } from "@/data/home/seminar/header-data";
import { timelineData } from "@/data/home/seminar/timeline-data";
import { Form } from "@/components/home/seminar/form-registration/main";

export default function SeminarPage() {
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
