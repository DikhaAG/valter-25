import React from "react";

/**
 * Membungkus karakter simbol dalam sebuah string dengan tag <span>.
 * @param str String input yang mungkin berisi simbol.
 * @param className Nama kelas CSS untuk tag span.
 * @returns Array dari string dan elemen React.
 */
export function wrapSymbols(
   str: string,
   size: string = "text-xl",
   className: string = "font-funky-vibes"
): (string | React.ReactNode)[] {
   // Ekspresi reguler untuk mendeteksi simbol (karakter selain huruf, angka, dan spasi)
   const regex = /([^a-zA-Z0-9\s])/g;

   // Menggunakan split untuk memisahkan string berdasarkan simbol
   const parts = str.split(regex);

   return parts.map((part, index) => {
      // Periksa apakah bagian ini adalah simbol yang cocok dengan regex
      if (regex.test(part) && part.length === 1) {
         return (
            <span key={index} className={`${className} ${size}`}>
               {part}
            </span>
         );
      }
      // Jika bukan simbol, kembalikan string aslinya
      return part;
   });
}
