import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

interface Props {
        variant?: "success" | "warning" | "error" | "default";
        message: string;
}
export function CustomToast({ variant = "default", message }: Props) {
        toast.custom(() => (
                <div className="relative border-5 border-foreground rounded-xl shadow-[7px_7px_0px_#00000040] ">
                        <div
                                className={`${
                                        variant === "default" && "bg-background"
                                } ${variant === "success" && "bg-green-100"} ${
                                        variant === "error" && "bg-red-300"
                                } ${variant === "warning" && "bg-yellow-100"} 
                        flex flex-row items-center gap-4 border-5 border-foreground rounded-xl shadow-[7px_7px_0px_#00000040] py-2 px-4 md:px-6`}
                        >
                                {variant === "warning" && <TriangleAlert />}
                                {variant === "error" && <CircleX />}
                                {variant === "success" && <CircleCheck />}
                                <div className="pl-2 md:pl-4">
                                        <div className="">
                                                <h2 className="font-bold">
                                                        {variant ===
                                                                "warning" &&
                                                                "Tunggu sebentar!"}
                                                        {variant === "error" &&
                                                                "Oopss!..."}
                                                        {variant ===
                                                                "success" &&
                                                                "Kerja bagus!"}
                                                </h2>
                                        </div>
                                        <div className="">{message}</div>
                                </div>
                        </div>
                        <div
                                className={`
                                                absolute 
                                               w-15
                                               h-5
                                                bottom-1
                                                right-2
                                                bg-foreground
                                                skew-x-30
                                                skew-y-25
                                                -z-10
                                        `}
                        ></div>
                </div>
        ));
}
