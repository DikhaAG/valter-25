import { WhatsappContactButton } from "@/components/home/whatsapp-contact-button";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         {children}
         <WhatsappContactButton
            phoneNumber="6282177761829" // Ganti dengan nomor kontak Anda
            contactName="Faita"
            message="Halo kak Faita, saya ingin bertanya tentang pelatihan VALTER 2025."
         />
      </div>
   );
}
