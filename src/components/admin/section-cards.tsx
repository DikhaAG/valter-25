"use client";
import { Badge } from "@/components/ui/badge";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { getAllIncome } from "@/server/services/admin/getIncome";
import {
   getTotalSemuaPendaftarBelumTerkonfirmasi,
   getTotalSemuaPendaftarTerkonfirmasi,
} from "@/server/services/admin/getTotalPeserta";
import { formatIDRCurrency } from "@/utils/formatIDRCurrency";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/nb/Spinner";

export function SectionCards() {
   const [income, setIncome] = useState<number | undefined>();

   const [totalPendaftarTerkonfirmasi, setTotalPendaftarTerkonfirmasi] =
      useState<number | undefined>();

   const [
      totalPendaftarBelumTerkonfirmasi,
      setTotalPendaftarBelumTerkonfirmasi,
   ] = useState<number | undefined>();

   useEffect(() => {
      getAllIncome().then((res) => {
         if (res.success && res.data) {
            setIncome(res.data);
         }
      });

      getTotalSemuaPendaftarTerkonfirmasi().then((res) => {
         if (res.success && res.data) {
            setTotalPendaftarTerkonfirmasi(res.data);
         }
      });

      getTotalSemuaPendaftarBelumTerkonfirmasi().then((res) => {
         if (res.success && res.data) {
            setTotalPendaftarBelumTerkonfirmasi(res.data);
         }
      });
   }, []);

   return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
         <Card className="@container/card">
            <CardHeader>
               <CardDescription>Total HTM Masuk</CardDescription>
               <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {income ? formatIDRCurrency(income) : <Spinner />}
               </CardTitle>
            </CardHeader>
         </Card>
         <Card className="@container/card">
            <CardHeader>
               <CardDescription>Total Pendaftar</CardDescription>
               <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {totalPendaftarTerkonfirmasi &&
                  totalPendaftarBelumTerkonfirmasi ? (
                     totalPendaftarTerkonfirmasi +
                     totalPendaftarBelumTerkonfirmasi
                  ) : (
                     <Spinner />
                  )}
               </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
               <Badge
                  variant="outline"
                  className="text-background bg-green-500"
               >
                  Terkonfirmasi
                  <span className="font-extrabold">
                     {totalPendaftarTerkonfirmasi ? (
                        totalPendaftarTerkonfirmasi
                     ) : (
                        <Spinner />
                     )}
                  </span>
               </Badge>
               <Badge
                  variant="outline"
                  className="text-background bg-yellow-500"
               >
                  Belum Terkonfirmasi
                  <span className=" font-extrabold">
                     {totalPendaftarBelumTerkonfirmasi ? (
                        totalPendaftarBelumTerkonfirmasi
                     ) : (
                        <Spinner />
                     )}
                  </span>
               </Badge>
            </CardFooter>
         </Card>
      </div>
   );
}
