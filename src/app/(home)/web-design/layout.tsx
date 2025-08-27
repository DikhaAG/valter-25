import { WhatsappContactButton } from "@/components/home/whatsapp-contact-button";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         {children}
         <WhatsappContactButton
            phoneNumber="628978737184" // Ganti dengan nomor kontak Anda
            contactName="Afi"
            message="Halo kak Afi, saya ingin bertanya tentang lomba web design VALTER 2025."
         />
      </div>
   );
}
