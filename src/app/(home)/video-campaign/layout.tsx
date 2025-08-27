import { WhatsappContactButton } from "@/components/home/whatsapp-contact-button";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         {children}
         <WhatsappContactButton
            phoneNumber="6285709251828" // Ganti dengan nomor kontak Anda
            contactName="Kiki"
            message="Halo kak Kiki, saya ingin bertanya tentang lomba video campaign VALTER 2025."
         />
      </div>
   );
}
