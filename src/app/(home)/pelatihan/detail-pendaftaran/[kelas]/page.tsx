"use server";
import DetailPendaftaranKelasPage from "@/components/home/pelatihan/registration-detail/kelas";

interface Props {
   params: Promise<{ kelas: string }>;
}
export default async function Page({ params }: Props) {
   return <DetailPendaftaranKelasPage />;
}
