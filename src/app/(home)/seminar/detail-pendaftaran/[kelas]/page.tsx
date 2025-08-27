"use server";
import DetailPendaftaranKelasPage from "@/components/home/seminar/registration-detail/kelas";

interface Props {
   params: Promise<{ kelas: string }>;
}
export default async function Page({  }: Props) {
   return <DetailPendaftaranKelasPage />;
}
