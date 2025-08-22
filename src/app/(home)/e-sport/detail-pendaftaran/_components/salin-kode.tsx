import { Button } from "@/components/ui/nb/button";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import {
        Tooltip,
        TooltipContent,
        TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { TimDisplaySchemaType } from "@/zod/home/e-sport/detail-pendaftaran/tim-display-schema";
import { Clipboard } from "lucide-react";

interface Props {
        team: TimDisplaySchemaType;
}
export function SalinKode({ team }: Props) {
        return (
                <Tooltip>
                        <TooltipTrigger asChild>
                                <Button
                                        variant={"gosong"}
                                        onClick={() => {
                                                copyToClipboard(team.id);
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
