"use client";
import { Button } from "@/components/ui/nb/button";
import { wrapSymbols } from "@/utils/wrapSymbols";
/**
 * v0 by Vercel.
 * @see https://v0.app/t/FhHJTdJDd5T
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useRouter } from "next/navigation";

export default function Component() {
        const router = useRouter();
        return (
                <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <div className="w-full space-y-6 text-center">
                                <div className="space-y-3">
                                        <h1 className="font-glofium-demo text-3xl font-bold tracking-tighter sm:text-5xl animate-bounce">
                                                Oopss{wrapSymbols(". . .", "text-3xl")} 404 {wrapSymbols("!", "text-5xl md:text-8xl")} 😭
                                        </h1>
                                        <p className="text-gray-500">
                                                Sepertinya kamu mengunjungi
                                                halaman yang tidak tersedia. 😂
                                        </p>
                                </div>
                                <Button
                                        variant={"gosong"}
                                        onClick={() => router.back()}
                                >
                                        Kembali ke halaman sebelumnya
                                </Button>
                        </div>
                </div>
        );
}
