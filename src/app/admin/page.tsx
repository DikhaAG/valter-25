"use client";
import {
   AnalyticsChartData,
   getAnalyticsChartData,
} from "@/server/services/admin/getAnalyticsChartData";
import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { SectionCards } from "@/components/admin/section-cards";
import { useEffect, useState } from "react";
export default function Page() {
   const [analyticsChartData, setAnalyticsChartData] = useState<
      AnalyticsChartData[] | undefined
   >();
   useEffect(() => {
      getAnalyticsChartData().then((res) => {
         setAnalyticsChartData(res);
      });
   }, []);
   return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         <SectionCards />
         <div className="px-4 lg:px-6">
            <ChartAreaInteractive
               chartData={analyticsChartData ? analyticsChartData : []}
            />
         </div>
      </div>
   );
}
