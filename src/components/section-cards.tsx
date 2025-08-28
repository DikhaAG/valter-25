import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatIDRCurrency } from "@/utils/formatIDRCurrency"
interface Props {
  income: number
  totalPendaftar: number,
  totalPendaftarTerkonfirmasi: number,
  totalPendaftarBelumTerkonfirmasi: number
}
export function SectionCards({ income, totalPendaftar, totalPendaftarTerkonfirmasi, totalPendaftarBelumTerkonfirmasi }: Props) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total HTM Masuk</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatIDRCurrency(income)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pendaftar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalPendaftar}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Badge variant="outline" className="text-background bg-green-500">
            Terkonfirmasi
            <span className="font-extrabold">
              {totalPendaftarTerkonfirmasi}
            </span>
          </Badge>
          <Badge variant="outline" className="text-background bg-yellow-500">
            Belum Terkonfirmasi
            <span className=" font-extrabold">
              {totalPendaftarBelumTerkonfirmasi}
            </span>
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
