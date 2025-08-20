import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MouseEvent, Ref, useRef, useState } from "react";

interface Props {
        src: string | StaticImport;
        alt: string;
}
// Komponen untuk gambar yang bisa di-zoom
export const ZoomableImage = ({ src, alt }: Props) => {
        const [isZoomed, setIsZoomed] = useState(false);
        const [transformOrigin, setTransformOrigin] = useState("center center");
        const imageRef: Ref<HTMLImageElement | null> | undefined = useRef(null);

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

        const handleMouseLeave = () => {
                setIsZoomed(false);
                setTransformOrigin("center center");
        };

        return (
                <div
                        className="relative overflow-hidden cursor-zoom-in"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                >
                        <Image
                                ref={imageRef}
                                priority
                                src={src}
                                alt={alt}
                                width={800}
                                height={800}
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
