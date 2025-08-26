"use client";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "../ui/nb/button";
import { useRouter } from "next/navigation";

export function BackButton() {
   const router = useRouter();

   return (
      <Button
         onClick={() => router.back()}
         className="h-15 rounded-2xl border-8 border-background"
      >
         <MdArrowBackIosNew style={{ width: "40px", height: "30px" }} />
      </Button>
   );
}
