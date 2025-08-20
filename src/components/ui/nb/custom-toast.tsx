import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

interface Props {
        variant?: "success" | "warning" | "error" | "default";
        message: string;
}
export function CustomToast({ variant = "default", message }: Props) {
        toast.custom(() => (
                <div
                        className={`${
                                variant === "default" && "bg-background"
                        } ${variant === "success" && "bg-green-400"} ${
                                variant === "error" && "bg-red-400"
                        } ${variant === "warning" && "bg-yellow-100"} 
                        flex flex-row items-center gap-4 border-4 border-foreground rounded-md shadow-[7px_7px_0px_#00000040] p-4 `}
                >
                        {variant === "warning" && <TriangleAlert />}
                        {variant === "error" && <CircleX />}
                        {variant === "success" && <CircleCheck />}
                        {message}
                </div>
        ));
}
