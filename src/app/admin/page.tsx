"use server"

import { getAllIncome } from "@/server/services/admin/getIncome"
import { getTotalSemuaPendaftar, getTotalSemuaPendaftarBelumTerkonfirmasi, getTotalSemuaPendaftarTerkonfirmasi } from "@/server/services/admin/getTotalPeserta"
import { getAnalyticsChartData } from "@/server/services/admin/getAnalyticsChartData"
import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive"
import { SectionCards } from "@/components/admin/section-cards"
export default async function Page() {
  const countIncome = await getAllIncome()
  const countTotalSemuaPendaftar = await getTotalSemuaPendaftar()
  const countTotalSemuaPendaftarTerkonfirmasi = await getTotalSemuaPendaftarTerkonfirmasi()
  const countTotalSemuaPendaftarBelumTerkonfirmasi = await getTotalSemuaPendaftarBelumTerkonfirmasi()
  const analyticsChartData = await getAnalyticsChartData()
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards income={countIncome.data ?? 0} totalPendaftar={countTotalSemuaPendaftar.data ?? 0} totalPendaftarTerkonfirmasi={countTotalSemuaPendaftarTerkonfirmasi.data ?? 0} totalPendaftarBelumTerkonfirmasi={countTotalSemuaPendaftarBelumTerkonfirmasi.data ?? 0} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive chartData={analyticsChartData} />
      </div>
    </div>
  )
}
