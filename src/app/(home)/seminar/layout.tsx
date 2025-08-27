import { WhatsappContactButton } from "@/components/home/whatsapp-contact-button";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         {children}
         <WhatsappContactButton
            phoneNumber="6289520409992" // Ganti dengan nomor kontak Anda
            contactName="Cia"
            message="Halo kak Cia, saya ingin bertanya tentang seminar VALTER 2025."
         />
      </div>
   );
}
