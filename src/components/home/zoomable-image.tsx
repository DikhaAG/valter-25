import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MouseEvent, Ref, useRef, useState } from "react";

/**
 * Properti untuk komponen ZoomableImage.
 * @property {string | StaticImport} src - Sumber gambar (URL atau import lokal).
 * @property {string} alt - Teks alternatif untuk gambar, penting untuk aksesibilitas.
 */
interface Props {
        src: string | StaticImport;
        alt: string;
}

/**
 * Komponen React untuk menampilkan gambar yang dapat di-zoom saat kursor berada di atasnya.
 * Fitur zoom mengikuti posisi kursor untuk memberikan pengalaman interaktif.
 *
 * @param {object} props
 * @param {string | StaticImport} props.src - Sumber gambar (URL atau import lokal).
 * @param {string} props.alt - Teks alternatif untuk gambar, penting untuk aksesibilitas.
 */
export const ZoomableImage = ({ src, alt }: Props) => {
        /**
         * State untuk melacak apakah gambar sedang dalam mode di-zoom.
         */
        const [isZoomed, setIsZoomed] = useState(false);

        /**
         * State untuk menyimpan titik asal transformasi zoom (transform-origin).
         */
        const [transformOrigin, setTransformOrigin] = useState("center center");

        /**
         * Ref untuk mengakses elemen DOM dari gambar Next.js.
         */
        const imageRef: Ref<HTMLImageElement | null> | undefined = useRef(null);

        /**
         * Handler untuk event mousemove. Mengubah `transformOrigin` berdasarkan
         * posisi kursor relatif terhadap gambar.
         */
        const handleMouseMove = (
                e: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | undefined
        ) => {
                if (imageRef.current && isZoomed) {
                        const { left, top, width, height } =
                                imageRef.current.getBoundingClientRect();
                        const x = ((e!.clientX - left) / width) * 100;
                        const y = ((e!.clientY - top) / height) * 100;
                        setTransformOrigin(`${x}% ${y}%`);
                }
        };

        /**
         * Handler untuk event mouseleave. Mengatur ulang state zoom
         * dan posisi transform-origin saat kursor keluar dari area gambar.
         */
        const handleMouseLeave = () => {
                setIsZoomed(false);
                setTransformOrigin("center center");
        };

        return (
                <div
                        className="relative overflow-scroll cursor-zoom-in max-h-[500px] md:max-h-[500px]"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                >
                        <Image
                                ref={imageRef}
                                priority
                                src={src}
                                alt={alt}
                                width={1000}
                                height={1000}
                                style={{
                                        transform: isZoomed
                                                ? "scale(2)"
                                                : "scale(1)",
                                        transformOrigin: transformOrigin,
                                        transition: "transform 0.2s ease-out",
                                }}
                                className="w-full h-auto"
                        />
                </div>
        );
};
