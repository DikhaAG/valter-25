"use client";

import { useState, useEffect } from "react";
import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/nb/button";
import {
        Tooltip,
        TooltipContent,
        TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "../../../../utils/copyToClipboard";
import { Clipboard } from "lucide-react";
import {
        AlertDialog,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogHeader,
        AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CustomToast } from "@/components/ui/nb/custom-toast";

export function AlertModal({ kode }: { kode: string }) {
        const [showModal, setShowModal] = useState(false);

        useEffect(() => {
                setShowModal(true);
        }, []); // [] memastikan efek hanya berjalan sekali saat mount

        return (
                <AlertDialog open={showModal} onOpenChange={setShowModal}>
                        <AlertDialogContent className="">
                                <AlertDialogHeader>
                                        <AlertDialogTitle>
                                                Sebentar!.. 🤚
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                                Pastikan anda menyimpan kode
                                                unik tim anda.
                                        </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="flex justify-end space-x-4">
                                        <Tooltip>
                                                <TooltipTrigger asChild>
                                                        <Button
                                                                variant={
                                                                        "gosong"
                                                                }
                                                                onClick={() => {
                                                                        copyToClipboard(
                                                                                kode
                                                                        );
                                                                        CustomToast(
                                                                                {
                                                                                        variant: "default",
                                                                                        message: `Kode berhasil disalin 😎`,
                                                                                }
                                                                        );
                                                                }}
                                                        >
                                                                salin kode
                                                                <Clipboard />
                                                        </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                        <p>
                                                                Salin kode tim
                                                                kamu
                                                        </p>
                                                </TooltipContent>
                                        </Tooltip>
                                        <Button
                                                onClick={() =>
                                                        setShowModal(false)
                                                }
                                        >
                                                Tutup
                                        </Button>
                                </div>
                        </AlertDialogContent>
                </AlertDialog>
        );
}
