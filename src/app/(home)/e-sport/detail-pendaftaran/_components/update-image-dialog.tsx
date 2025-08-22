/**
 * Komponen klien React untuk menampilkan dialog modal yang memungkinkan
 * pengguna untuk memperbarui bukti pembayaran untuk sebuah tim.
 *
 * Komponen ini mengelola state lokal untuk file yang dipilih, status dialog,
 * dan status loading dari Server Action. Validasi file dasar dilakukan
 * di sisi klien sebelum pengunggahan.
 *
 * @param {object} props
 * @param {TimEsportDisplaySchemaType} props.team - Objek data tim yang akan diperbarui bukti pembayarannya.
 */
"use client";
import { DialogHeader } from "@/components/ui/dialog";
import {
        Dialog,
        DialogTrigger,
        DialogContent,
        DialogTitle,
        DialogDescription,
} from "@/components/ui/dialog";
import { updateBuktiPembayaranEsport } from "@/server/home/e-sport/detail-pendaftaran/update-bukti-pembayaran";
import { Pencil, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/nb/button";
import { toast } from "sonner";
import { ImageUploadField } from "./image-upload-file";
import {
        isValidImageType,
        isFileSizeValid,
} from "@/utils/image-upload-requirements";
import { TimDisplaySchemaType } from "@/zod/home/e-sport/detail-pendaftaran/tim-display-schema";

// --- KOMPONEN DIALOG UPDATE GAMBAR ---
interface Props {
        team: TimDisplaySchemaType;
}
export const UpdateImageDialog = ({ team }: Props) => {
        /**
         * State untuk menyimpan objek file yang dipilih oleh pengguna.
         * @default null
         */
        const [file, setFile] = useState<File | null>(null);

        /**
         * Hook useTransition untuk mengelola status pending saat memanggil Server Action.
         * @returns {boolean} `isPending` - Menunjukkan apakah transisi sedang berlangsung.
         * @returns {Function} `startTransition` - Fungsi untuk memulai transisi.
         */
        const [isPending, startTransition] = useTransition();

        /**
         * State untuk mengontrol visibilitas (buka/tutup) dialog.
         * @default false
         */
        const [open, setOpen] = useState(false);

        /**
         * Hook useRouter untuk navigasi dan refresh halaman.
         */
        const router = useRouter();

        /**
         * Fungsi handler untuk memulai proses pembaruan.
         * Melakukan validasi file, memulai transisi, memanggil Server Action,
         * dan memberikan umpan balik (feedback) kepada pengguna.
         */
        const handleUpdate = async () => {
                // Validasi file di sisi klien
                if (!file) {
                        toast.error("Pilih file gambar terlebih dahulu.");
                        return;
                }

                if (!isValidImageType(file) || !isFileSizeValid(file)) {
                        toast.error(
                                "File tidak valid. Pastikan JPG/JPEG/PNG dan maks 500KB."
                        );
                        return;
                }

                startTransition(async () => {
                        // Memanggil Server Action untuk mengunggah dan memperbarui data
                        const res = await updateBuktiPembayaranEsport({
                                file: file,
                                namaTim: team.namaTim,
                        });

                        // Menangani respons dari Server Action
                        if (res.error) {
                                toast.error(res.error);
                        } else {
                                toast.success("Gambar berhasil diperbarui!");
                                router.refresh(); // Memperbarui halaman untuk menampilkan perubahan
                                setOpen(false); // Menutup dialog
                        }
                });
        };

        return (
                <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                                <Button
                                        size="sm"
                                        variant="gosong"
                                        className="text-center items-center py-1"
                                >
                                        {" "}
                                        <span className="text-xs">
                                                Ubah bukti pembayaran
                                        </span>
                                        <Pencil className="h-4 w-4" />
                                </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                        <DialogTitle>
                                                Ubah Bukti Pembayaran
                                        </DialogTitle>
                                        <DialogDescription>
                                                Pilih gambar baru untuk bukti
                                                pembayaran {team.namaTim}.
                                        </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                        <ImageUploadField
                                                onFileChange={setFile}
                                        />
                                        {file && (
                                                <div className="text-sm mt-2">
                                                        File terpilih:{" "}
                                                        <span className="font-semibold">
                                                                {file.name}
                                                        </span>
                                                </div>
                                        )}
                                </div>
                                <div className="flex justify-end">
                                        <Button
                                                onClick={handleUpdate}
                                                disabled={isPending || !file}
                                        >
                                                {isPending && (
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                )}
                                                Perbarui
                                        </Button>
                                </div>
                        </DialogContent>
                </Dialog>
        );
};
