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
import { emotError } from "@/emot-response";
import { cekKodeUnik } from "@/server/home/e-sport/cek-kode-unik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validate } from "uuid";
export function CekRegistrasiButton() {
        const [kode, setKode] = useState<string>();
        const [onSubmit, setOnSubmit] = useState<boolean>(false);
        const router = useRouter();
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
                router.push("/e-sport/detail-pendaftaran");
                // toast.promise(async () => await cekKodeUnik(kode!), {
                //         loading: "Sedang mengecek kode... 😎",
                //         success: (res) => {
                //                 if (!res.success) {
                //                         throw new Error(res.message);
                //                 }
                //                 return res.message;
                //         },
                //         error: (err) => {
                //                 return `${err} ${emotError}`;
                //         },
                //         finally: () => {
                //                 setOnSubmit(false);
                //                 sessionStorage.setItem("kodeTim", kode!);
                //                 router.push("/e-sport/detail-pendaftaran");
                //         },
                // });
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
