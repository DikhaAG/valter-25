/**
 * Komponen klien React untuk menampilkan bukti pembayaran dalam sebuah dialog modal.
 *
 * Komponen ini menyediakan tiga fungsi utama:
 * 1.  Menampilkan gambar sebagai tombol pemicu (trigger).
 * 2.  Menyediakan indikator loading spinner saat gambar sedang dimuat.
 * 3.  Menampilkan dialog yang berisi versi gambar yang dapat di-zoom.
 *
 * @param {object} props
 * @param {string} props.buktiPembayaran - URL gambar bukti pembayaran.
 * @param {string} props.namaTim - Nama tim yang digunakan untuk teks alt gambar.
 */
"use client";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ZoomableImage } from "../../../../../components/home/zoomable-image";

interface Props {
        buktiPembayaran: string;
        namaTim: string;
}
export function ImageDialog({ buktiPembayaran, namaTim }: Props) {
        return (
                <Dialog>
                        {/* Pemicu dialog yang menampilkan gambar dengan efek loading */}
                        <DialogTrigger asChild>
                                <div className="w-52 h-52 relative cursor-pointer group">
                                        {/* Komponen Next.js Image dengan efek transisi opacity */}
                                        <Image
                                                src={buktiPembayaran}
                                                priority
                                                alt={`Bukti Pembayaran ${namaTim}`}
                                                fill
                                                className="rounded-md object-cover border-foreground transition-opacity opacity-0 duration-500"
                                                onLoad={(e) =>
                                                        e.currentTarget.classList.remove(
                                                                "opacity-0"
                                                        )
                                                }
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Loading spinner yang terlihat hanya saat gambar belum dimuat */}
                                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-has-[img.opacity-0]:opacity-100 opacity-0 bg-gray-100 rounded-md">
                                                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                        </div>
                                </div>
                        </DialogTrigger>
                        {/* Konten dialog yang muncul saat trigger diklik */}
                        <DialogContent className="sm:max-w-[500px] overflow-hidden p-4">
                                <DialogTitle className="font-glofium-demo">
                                        Bukti Pembayaran
                                </DialogTitle>
                                <DialogDescription hidden></DialogDescription>
                                {/* Komponen gambar yang bisa di-zoom */}
                                <ZoomableImage
                                        src={buktiPembayaran}
                                        alt={`Bukti pembayaran ${namaTim}`}
                                />
                        </DialogContent>
                </Dialog>
        );
}
