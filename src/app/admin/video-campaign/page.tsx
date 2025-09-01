"use server";


import { VideoCampaignSectionCards } from "@/components/admin/video-campaign/video-campaign-section-cards";
import { VideoCampaignTabsTable } from "@/components/admin/video-campaign/tabs-table";
import { ExportSemuaDataPesertaVideoCampaignButton } from "@/components/admin/video-campaign/export-semua-data-peserta-video-campaign-button";
export default async function Page() {
   return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         <div className="font-extrabold text-2xl mx-4 md:mx-6">Video Campaign</div>
         <div className="mx-4 md:mx-6">
            <ExportSemuaDataPesertaVideoCampaignButton />
         </div>
         <VideoCampaignSectionCards />
         <VideoCampaignTabsTable />
      </div>
   );
}
