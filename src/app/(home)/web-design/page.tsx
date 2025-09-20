"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { HeaderSection } from "../../../components/home/header-section";
import { TimelineSection } from "../../../components/home/timeline-section";
import { headerData } from "@/data/home/web-design/header-data";
import { timelineData } from "@/data/home/web-design/timeline-data";
import { Form } from "@/components/home/web-design/form-registration/main";

export default function WebDesignPage() {
   const [isVisible, setIsVisible] = useState(false);

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
