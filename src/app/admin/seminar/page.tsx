"use server";

import { getSeminarIncome } from "@/server/services/admin/getIncome";
import {
  getTotalPesertaSeminarBelumTerkonfirmasi,
  getTotalPesertaSeminarTerkonfirmasi,
} from "@/server/services/admin/getTotalPeserta";
import { getAllClassRegistration } from "@/server/actions/queries/seminar";
import { SectionCards } from "@/components/admin/section-cards.tsx";
import { SeminarTabsTable } from "@/components/admin/seminar/tabs-table";
export default async function Page() {
  const countIncome = await getSeminarIncome();
  const countTotalSemuaPendaftarTerkonfirmasi =
    await getTotalPesertaSeminarTerkonfirmasi();
  const countTotalSemuaPendaftarBelumTerkonfirmasi =
    await getTotalPesertaSeminarBelumTerkonfirmasi();
  const countTotalSemuaPendaftar =
    (countTotalSemuaPendaftarTerkonfirmasi.data ?? 0) +
    (countTotalSemuaPendaftarBelumTerkonfirmasi.data ?? 0);

  const classRegistions = await getAllClassRegistration();
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="font-extrabold text-2xl mx-4 md:mx-6">Seminar</div>
      <SectionCards
        income={countIncome.data ?? 0}
        totalPendaftar={countTotalSemuaPendaftar}
        totalPendaftarTerkonfirmasi={
          countTotalSemuaPendaftarTerkonfirmasi.data ?? 0
        }
        totalPendaftarBelumTerkonfirmasi={
          countTotalSemuaPendaftarBelumTerkonfirmasi.data ?? 0
        }
      />
      <SeminarTabsTable dataPendaftaranKelas={classRegistions.data!} />
    </div>
  );
}
