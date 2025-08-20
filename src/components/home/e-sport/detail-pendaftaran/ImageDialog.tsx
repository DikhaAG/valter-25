"use client";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ZoomableImage } from "./ZoomableImage";

interface Props {
        buktiPembayaran: string;
        namaTim: string;
}
export function ImageDialog({ buktiPembayaran, namaTim }: Props) {
        return (
                <Dialog>
                        <DialogTrigger asChild>
                                <div className="w-52 h-52 relative cursor-pointer group">
                                        <Image
                                                src={buktiPembayaran}
                                                alt={`Bukti Pembayaran ${namaTim}`}
                                                fill
                                                className="rounded-md object-cover border transition-opacity opacity-0 duration-500"
                                                onLoad={(e) =>
                                                        e.currentTarget.classList.remove(
                                                                "opacity-0"
                                                        )
                                                }
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-has-[img.opacity-0]:opacity-100 opacity-0 bg-gray-100 rounded-md">
                                                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                        </div>
                                </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] overflow-hidden p-4">
                                <DialogTitle className="font-glofium-demo">
                                        Bukti Pembayaran
                                </DialogTitle>
                                <ZoomableImage
                                        src={buktiPembayaran}
                                        alt={`Bukti pembayaran ${namaTim}`}
                                />
                        </DialogContent>
                </Dialog>
        );
}
