"use client";
import { DialogHeader } from "@/components/ui/dialog";
import {
        Dialog,
        DialogTrigger,
        DialogContent,
        DialogTitle,
        DialogDescription,
} from "@/components/ui/dialog";
import { updateBuktiPembayaranAction } from "@/server/home/e-sport/detail-pendaftaran/update-bukti-pembayaran-action";
import { Pencil, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/nb/button";
import { toast } from "sonner";
import { ImageUploadField } from "./ImageUploadFile";
import { TimMLDisplaySchema } from "@/zod/tables/timML-display";

// --- KONSTANTA VALIDASI GAMBAR ---
const MAX_FILE_SIZE_KB = 500;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function isValidImageType(file: File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

function isFileSizeValid(file: File) {
        return file.size <= MAX_FILE_SIZE_KB * 1024;
}

// --- KOMPONEN DIALOG UPDATE GAMBAR ---
interface Props {
        team: TimMLDisplaySchema
}
export const UpdateImageDialog = ({ team }: Props) => {
        const [file, setFile] = useState<File | null>(null);
        const [isPending, startTransition] = useTransition();
        const [open, setOpen] = useState(false);
        const router = useRouter();

        const handleUpdate = async () => {
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
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("namaTim", team.namaTim);

                        const res = await updateBuktiPembayaranAction({file: file, namaTim: team.namaTim});

                        if (res.error) {
                                toast.error(res.error);
                        } else {
                                toast.success("Gambar berhasil diperbarui!");
                                router.refresh();
                                setOpen(false);
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
                                >       <span className="text-xs">Ubah bukti pembayaran</span>
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
