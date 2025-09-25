
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

// Interface untuk props komponen
interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string; // Path ke file video lokal (misal: "/videos/trailer.mp4")
}

// Komponen Dialog Khusus untuk Video Lokal
export const TrailerDialog = ({ isOpen, onClose, videoSrc }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 border-none bg-transparent">
        <DialogTitle hidden ></DialogTitle>
        {/*
          Container ini memastikan video tetap responsif (rasio aspek 16:9)
          dengan menggunakan CSS Padding-Top Hack.
        */}
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' /* Rasio 16:9 */ }}>
          {videoSrc && (
            <video
              className="absolute top-0 left-0 w-full h-full"
              controls // Tampilkan kontrol pemutar (play, pause, volume, dll.)
              autoPlay // Otomatis putar saat dialog terbuka
              // Key ini penting: saat dialog ditutup, React menghapus dan membuat
              // ulang elemen <video> agar pemutaran berhenti.
              key={isOpen ? "open" : "closed"}
            >
              <source src={videoSrc} type="video/mp4" />
              <p className="text-white">Browser Anda tidak mendukung tag video.</p>
            </video>
          )}
        </div>

        {/* Hapus atau sembunyikan header default Shadcn untuk tampilan bersih */}
        <div className="hidden"></div>
      </DialogContent>
    </Dialog>
  );
};
