import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
        Tooltip,
        TooltipContent,
        TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "@/utils/home/detal-pendaftaran/copy-to-clipboard";
import { Clipboard } from "lucide-react";

interface Props {
        kode: string;
}
export function SalinKode({ kode }: Props) {
        return (
                <Tooltip>
                        <TooltipTrigger asChild>
                                <Button
                                        variant={"gosong"}
                                        onClick={() => {
                                                copyToClipboard(kode);
                                                CustomToast({
                                                        variant: "default",
                                                        message: `Kode berhasil disalin. 😎`,
                                                });
                                        }}
                                        className="text-xs"
                                >
                                        salin kode
                                        <Clipboard />
                                </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                                <p>Salin kode tim kamu</p>
                        </TooltipContent>
                </Tooltip>
        );
}
