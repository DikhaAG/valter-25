// components/ImageDialog.tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Image } from 'lucide-react';

interface ImageDialogProps {
  imageUrl: string;
  altText: string;
}

export function BuktiPembayaranImageDialog({ imageUrl, altText }: ImageDialogProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Bukti_pembayaran_seminar_${altText}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Gagal mengunduh gambar:', error);
      // Opsional: Tampilkan notifikasi error kepada pengguna
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className='w-full'>
<Image />
          Lihat Bukti Pembayaran
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 md:max-w-xl lg:max-w-4xl xl:max-w-6xl">
        <PhotoProvider
          speed={() => 800}
          maskOpacity={0.7}

        >
          <PhotoView
            src={imageUrl}>
            <div className="flex justify-center items-center h-full w-full">
              {/* Gambar yang ditampilkan di dalam dialog */}
              <img
                src={imageUrl}
                alt={altText}
                className="w-auto h-auto object-contain cursor-zoom-in"
              />
            </div>
          </PhotoView>
        </PhotoProvider>
        <DialogHeader className=" top-0 right-0 p-4">
          <DialogTitle className="sr-only">Gambar</DialogTitle>
          <DialogDescription className="sr-only">
            Klik gambar untuk memperbesar atau memperkecil.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleDownload} >Unduh</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
