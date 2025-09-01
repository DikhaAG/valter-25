"use server";

import { ExportSemuaDataPesertaEsportButton } from "@/components/admin/esport/export-semua-data-peserta-esport-button";
import { EsportSectionCards } from "@/components/admin/esport/esport-section-cards";
import { EsportTabsTable } from "@/components/admin/esport/tabs-table";
export default async function Page() {
   return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         <div className="font-extrabold text-2xl mx-4 md:mx-6">E-sport</div>
         <div className="mx-4 md:mx-6">
            <ExportSemuaDataPesertaEsportButton />
         </div>
         <EsportSectionCards />
         <EsportTabsTable />
      </div>
   );
}
