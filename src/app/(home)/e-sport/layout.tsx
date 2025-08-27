import { WhatsappContactButton } from "@/components/home/whatsapp-contact-button";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         {children}
         <WhatsappContactButton
            phoneNumber="6289620156526" // Ganti dengan nomor kontak Anda
            contactName="Rama"
            message="Halo kak Rama, saya ingin bertanya tentang e-sport VALTER 2025."
         />
      </div>
   );
}
