"use server";



import { ExportSemuaDataPesertaWebDesignButton } from "@/components/admin/web-design/export-semua-data-peserta-web-design-button";
import { WebDesignTabsTable } from "@/components/admin/web-design/tabs-table";
import { WebDesignSectionCards } from "@/components/admin/web-design/web-design-section-cards";

export default async function Page() {
   return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         <div className="font-extrabold text-2xl mx-4 md:mx-6">Web Design</div>
         <div className="mx-4 md:mx-6">
            <ExportSemuaDataPesertaWebDesignButton />
         </div>
         <WebDesignSectionCards />
         <WebDesignTabsTable />
      </div>
   );
}
