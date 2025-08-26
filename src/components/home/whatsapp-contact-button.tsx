// components/whatsapp-contact-button.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsappContactButtonProps {
   phoneNumber: string;
   contactName: string;
   message?: string;
   className?: string;
}

export function WhatsappContactButton({
   phoneNumber,
   contactName,
   message = "Halo, saya ingin bertanya lebih lanjut tentang VALTER 2025.",
   className,
}: WhatsappContactButtonProps) {
   const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
   )}`;

   return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
         <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
               className="
               cursor-pointer
            flex items-center gap-2 
            bg-green-500 hover:bg-green-600 text-white 
            rounded-full shadow-lg hover:shadow-xl
            px-6 py-3 md:px-7 md:py-3.5 
            text-sm md:text-md font-semibold 
            transition-all duration-300 ease-in-out 
            hover:scale-105 
            group
          "
            >
               <FaWhatsapp className="h-8 w-8 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />

               <span className="hidden sm:inline">Hubungi {contactName}</span>
               <span className="sm:hidden">Chat Kami</span>
            </Button>
         </a>
      </div>
   );
}
