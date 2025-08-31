"use server";

import { ExportSemuaDataPesertaPelatihanButton } from "@/components/admin/pelatihan/export-semua-data-peserta-pelatihan-button";
import { PelatihanSectionCards } from "@/components/admin/pelatihan/pelatihan-section-cards";
import { PelatihanTabsTable } from "@/components/admin/pelatihan/tabs-table";
export default async function Page() {
   return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         <div className="font-extrabold text-2xl mx-4 md:mx-6">Pelatihan</div>
         <div className="mx-4 md:mx-6">
            <ExportSemuaDataPesertaPelatihanButton />
         </div>
         <PelatihanSectionCards />
         <PelatihanTabsTable />
      </div>
   );
}
