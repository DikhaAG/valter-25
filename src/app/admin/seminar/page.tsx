"use server";

import { getAllClassRegistration, getPesertaIndividuSeminar } from "@/server/actions/queries/seminar";
import { SeminarTabsTable } from "@/components/admin/seminar/tabs-table";
import { ExportSemuaDataPesertaSeminarButton } from "@/components/admin/seminar/export-semua-data-peserta-seminar-button";
import { SeminarSectionCards } from "@/components/admin/seminar/seminar-section-cards";
export default async function Page() {
  const classRegistions = await getAllClassRegistration();
  const peserta = await getPesertaIndividuSeminar();
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="font-extrabold text-2xl mx-4 md:mx-6">Seminar</div>
      <div className="mx-4 md:mx-6"><ExportSemuaDataPesertaSeminarButton /></div>
      <SeminarSectionCards/>
      <SeminarTabsTable dataPendaftaranKelas={classRegistions.data ?? []} dataPeserta={peserta.data ?? []} />
    </div>
  );
}
