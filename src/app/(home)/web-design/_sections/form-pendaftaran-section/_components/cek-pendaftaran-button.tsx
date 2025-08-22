/**
 * Komponen klien React untuk memicu dialog pengecekan status pendaftaran.
 *
 * Komponen ini mengelola alur kerja berikut:
 * 1.  Menampilkan tombol yang, ketika diklik, akan membuka sebuah dialog.
 * 2.  Di dalam dialog, pengguna dapat memasukkan kode unik tim.
 * 3.  Melakukan validasi format kode unik secara lokal.
 * 4.  Memanggil Server Action `cekKodeUnik` untuk memverifikasi kode di database.
 * 5.  Menggunakan `CustomToast` untuk memberikan umpan balik (feedback) yang jelas
 * kepada pengguna mengenai keberhasilan atau kegagalan pengecekan.
 * 6.  Jika kode valid, menyimpan kode ke `sessionStorage` dan mengarahkan pengguna ke halaman detail.
 */
"use client";
import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
} from "@/components/ui/nb/dialog";
import { Input } from "@/components/ui/nb/input";
import { Label } from "@/components/ui/nb/label";
import { emotError } from "@/data/emot-response";
import { cekKodeUnik } from "@/server/home/web-design/cek-kode-unik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validate } from "uuid";

export function CekPendaftaranButton() {
        /**
         * State untuk menyimpan kode unik yang dimasukkan oleh pengguna.
         */
        const [kode, setKode] = useState<string>();

        /**
         * State untuk melacak status proses pengiriman (submit) form.
         * Digunakan untuk mengelola status loading pada tombol.
         */
        const [onSubmit, setOnSubmit] = useState<boolean>(false);

        /**
         * Hook useRouter dari Next.js untuk melakukan navigasi halaman.
         */
        const router = useRouter();

        /**
         * Fungsi yang dipanggil saat pengguna menekan tombol "Cek Status".
         * Fungsi ini melakukan validasi kode, memanggil Server Action,
         * dan menangani respons dari server.
         */
        async function handleSubmit() {
                if (!validate(kode)) {
                        CustomToast({
                                variant: "error",
                                message: `Kode yang dimasukan tidak valid! ${emotError}`,
                        });
                        return;
                }
                setOnSubmit(true);

                const cekKodeRes = await cekKodeUnik(kode!);

                if (!cekKodeRes.success) {
                        setOnSubmit(false);
                        CustomToast({
                                variant: "error",
                                message: `${cekKodeRes.message} ${emotError}`,
                        });
                        return;
                }

                setOnSubmit(true);
                sessionStorage.setItem("kodeTim", kode!);
                router.push("/web-design/detail-pendaftaran");
        }

        return (
                <Dialog>
                        <form>
                                <DialogTrigger asChild>
                                        <Button
                                                variant="outline"
                                                className="flex w-full max-w-lg  justify-self-center gap-0"
                                        >
                                                Cek status pendaftaran
                                        </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                                <DialogTitle className="font-glofium-demo">
                                                        Cek Status Pendaftaran
                                                </DialogTitle>
                                                <DialogDescription>
                                                        Masukan kode unik tim
                                                        kamu untuk melihat
                                                        status apakah pembayaran
                                                        telah berhasil
                                                        dikonfirmasi
                                                </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                        <Label htmlFor="name-1">
                                                                Masukan Kode
                                                                Unik
                                                        </Label>
                                                        <Input
                                                                id="team-name"
                                                                name="team-name"
                                                                placeholder="ex: d2013-d213a-2313"
                                                                value={
                                                                        kode
                                                                                ? kode
                                                                                : ""
                                                                }
                                                                onChange={(e) =>
                                                                        setKode(
                                                                                e
                                                                                        .target
                                                                                        .value
                                                                        )
                                                                }
                                                        />
                                                </div>
                                        </div>
                                        <DialogFooter>
                                                <DialogClose asChild>
                                                        <Button variant="outline">
                                                                Tutup
                                                        </Button>
                                                </DialogClose>
                                                <Button
                                                        type="submit"
                                                        variant={"secondary"}
                                                        onClick={handleSubmit}
                                                        disabled={
                                                                onSubmit ||
                                                                !kode
                                                        }
                                                >
                                                        Cek Status
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </form>
                </Dialog>
        );
}
