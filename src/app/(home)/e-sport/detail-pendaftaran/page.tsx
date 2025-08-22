"use client";
import { Label } from "@/components/ui/nb/label";
import { Input } from "@/components/ui/nb/input";
import { ImageDialog } from "./_components/image-dialog";
import { UpdateImageDialog } from "./_components/update-image-dialog";
import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { cekKodeUnik } from "@/server/home/e-sport/cek-kode-unik";
import { Button } from "@/components/ui/nb/button";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/nb/badge";
import { FaWhatsapp } from "react-icons/fa";

import { useRouter } from "next/navigation";

import { getTimEsportById } from "@/server/queries/get-tim-esport-by-id";
import { PesertaEsportTableSchemaType } from "@/zod/tables/esport/peserta";
import { DetailPendaftaranSkeleton } from "./_components/Skeleton";
import { TimDisplaySchemaType } from "@/zod/home/e-sport/detail-pendaftaran/tim-display-schema";
import { SalinKode } from "./_components/salin-kode";
import { ExportDataPendaftaran } from "./_components/export-data-pendaftaran";
import Link from "next/link";
import { gcUrl } from "@/data/home/e-sport/gc-url";

export default function DetailPendaftaranPage() {
        const [team, setTeam] = useState<TimDisplaySchemaType | undefined>();
        const router = useRouter();

        useEffect(() => {
                const kodeStored = sessionStorage.getItem("kodeTim");
                if (!kodeStored) {
                        return;
                }
                cekKodeUnik(kodeStored).then((res) => {
                        if (!res.success) {
                                return;
                        }
                        getTimEsportById(kodeStored).then((res) => {
                                if (!res.success) {
                                        return;
                                }
                                setTeam(res.data);
                        });
                });
        }, []);

        return (
                <div className="">
                        <div className="w-full md:max-w-xl md:mx-auto space-y-8 border-none md:border-2 md:border-dashed md:border-foreground/80 md:rounded-md md:shadow-[7px_7px_0px_#00000040]">
                                <div className="p-4 flex justify-end md:justify-start">
                                        <Button onClick={() => router.back()}>
                                                Kembali
                                        </Button>
                                </div>
                                {team ? (
                                        <>
                                                <div className="p-6 flex flex-col gap-y-8 md:gap-y-6">
                                                        <h3 className="text-2xl font-bold mb-10 flex flex-col">
                                                                {team.namaTim}
                                                                <Badge
                                                                        variant={
                                                                                "warning"
                                                                        }
                                                                >
                                                                        <Loader />
                                                                        Menunggu
                                                                        konfirmasi
                                                                </Badge>
                                                                <div className="mt-4">
                                                                        {team.statusPembayaran && (
                                                                                <Button
                                                                                        variant={
                                                                                                "success"
                                                                                        }
                                                                                        className="text-background"
                                                                                >
                                                                                        <Link
                                                                                                href={
                                                                                                        gcUrl
                                                                                                }
                                                                                                passHref={
                                                                                                        true
                                                                                                }
                                                                                        >
                                                                                                Gabung
                                                                                                grup
                                                                                                wa
                                                                                        </Link>
                                                                                        <FaWhatsapp />
                                                                                </Button>
                                                                        )}
                                                                </div>
                                                        </h3>
                                                        <div className="flex flex-col space-y-2 justify-end items-end">
                                                                <SalinKode
                                                                        team={
                                                                                team
                                                                        }
                                                                />
                                                                <ExportDataPendaftaran
                                                                        team={
                                                                                team
                                                                        }
                                                                />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                                                <div className="space-y-2">
                                                                        <Label>
                                                                                Instansi
                                                                        </Label>
                                                                        <Input
                                                                                readOnly
                                                                                value={
                                                                                        team.instansi!
                                                                                }
                                                                        />
                                                                </div>
                                                                <div className="space-y-2">
                                                                        <Label>
                                                                                Nomor
                                                                                Whatsapp
                                                                        </Label>
                                                                        <Input
                                                                                readOnly
                                                                                value={
                                                                                        team.noWa!
                                                                                }
                                                                        />
                                                                </div>
                                                        </div>

                                                        <div className="mt-6 space-y-4">
                                                                <h4 className="font-semibold mb-2">
                                                                        Bukti
                                                                        Pembayaran
                                                                </h4>
                                                                <UpdateImageDialog
                                                                        team={
                                                                                team
                                                                        }
                                                                />
                                                                {team.buktiPembayaran ? (
                                                                        <ImageDialog
                                                                                buktiPembayaran={
                                                                                        team.buktiPembayaran
                                                                                }
                                                                                namaTim={
                                                                                        team.namaTim
                                                                                }
                                                                        />
                                                                ) : (
                                                                        <p className="text-gray-500 font-poppins">
                                                                                Tidak
                                                                                ada
                                                                                bukti
                                                                                pembayaran
                                                                        </p>
                                                                )}
                                                        </div>

                                                        <div className="mt-6">
                                                                <h4 className="font-semibold mb-2">
                                                                        Anggota
                                                                        Tim
                                                                </h4>
                                                                <div className="overflow-x-auto border border-foreground rounded-xl shadow-[7px_7px_0px_#00000040]">
                                                                        <Table className="rounded-t-xl">
                                                                                <TableHeader className="rounded-t-xl">
                                                                                        <TableRow className="bg-foreground hover:bg-foreground/90 text-background rounded-t-xl">
                                                                                                <TableHead className="border text-left text-sm text-background">
                                                                                                        ID
                                                                                                        ML
                                                                                                </TableHead>
                                                                                                <TableHead className="border text-left text-sm text-background">
                                                                                                        Nama
                                                                                                </TableHead>
                                                                                                <TableHead className="border text-left text-sm text-background">
                                                                                                        NPM
                                                                                                </TableHead>
                                                                                        </TableRow>
                                                                                </TableHeader>
                                                                                <TableBody>
                                                                                        {team.peserta
                                                                                                ? (
                                                                                                          team.peserta as Array<PesertaEsportTableSchemaType>
                                                                                                  ).map(
                                                                                                          (
                                                                                                                  p
                                                                                                          ) => (
                                                                                                                  <TableRow
                                                                                                                          key={
                                                                                                                                  p.id
                                                                                                                          }
                                                                                                                  >
                                                                                                                          <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                                                                                                                  {
                                                                                                                                          p.idML
                                                                                                                                  }
                                                                                                                          </TableCell>
                                                                                                                          <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                                                                                                                  {
                                                                                                                                          p.nama
                                                                                                                                  }
                                                                                                                          </TableCell>
                                                                                                                          <TableCell className="border border-gray-300 px-4 py-2 text-sm">
                                                                                                                                  {
                                                                                                                                          p.npm
                                                                                                                                  }
                                                                                                                          </TableCell>
                                                                                                                  </TableRow>
                                                                                                          )
                                                                                                  )
                                                                                                : "tidak ada peserta"}
                                                                                </TableBody>
                                                                        </Table>
                                                                </div>
                                                        </div>
                                                </div>
                                        </>
                                ) : (
                                        <DetailPendaftaranSkeleton />
                                )}
                        </div>
                </div>
        );
}
