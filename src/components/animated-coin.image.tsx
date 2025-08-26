// src/components/AnimatedCoinImage.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Pastikan Anda memiliki utilitas cn

interface AnimatedCoinImageProps {
   src: string;
   alt: string;
   width: number;
   height: number;
   className?: string;
   priority?: boolean;
}

export function AnimatedCoinImage({
   src,
   alt,
   width,
   height,
   className,
   priority = false,
}: AnimatedCoinImageProps) {
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      const img = new window.Image();
      img.onload = () => setIsLoaded(true);
      img.src = src;
   }, [src]);

   return (
      <div
         className={cn(
            "perspective-1000",
            className,
            isLoaded ? "animate-coin-flip-once" : "opacity-0"
         )}
         style={isLoaded ? {} : { transform: "scale(0.5)" }}
      >
         <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            onLoadingComplete={() => setIsLoaded(true)}
            className="block backface-hidden"
         />
      </div>
   );
}
