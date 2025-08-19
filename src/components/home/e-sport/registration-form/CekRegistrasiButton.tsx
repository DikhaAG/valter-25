import { Button } from "@/components/ui/nb/button";
import {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
} from "@/components/ui/nb/dialog";
import { Input } from "@/components/ui/nb/input";
import { Label } from "@/components/ui/nb/label";
import { toast } from "sonner";
export function CekRegistrasiButton() {
        function handleSubmit() {
                toast.custom(() => (
                        <div className="border-4 border-foreground bg-background rounded-md shadow-[7px_7px_0px_#00000040] p-2 text-xs">
                                Maaf sepertinya tim kamu belum daftar   :(
                        </div>
                ));
        }
        return (
                <Dialog>
                        <form>
                                <DialogTrigger asChild>
                                        <Button
                                                variant="outline"
                                                className="w-full gap-0"
                                        >
                                                Sudah daftar
                                                <span className="font-funky-vibes text-2xl mr-2">
                                                        ?
                                                </span>{" "}
                                                klik disini
                                        </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                                <DialogTitle>
                                                        Cek Status Pendaftaran
                                                </DialogTitle>
                                                <DialogDescription>
                                                        Masukan nama team kamu
                                                        untuk melihat status
                                                        apakah pembayaran telah
                                                        berhasil dikonfirmasi
                                                </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                        <Label htmlFor="name-1">
                                                                Nama team kamu
                                                        </Label>
                                                        <Input
                                                                id="team-name"
                                                                name="team-name"
                                                                placeholder="ex: Tim Mulmeds"
                                                        />
                                                </div>
                                        </div>
                                        <DialogFooter>
                                                <DialogClose asChild>
                                                        <Button variant="outline">
                                                                Tutup
                                                        </Button>
                                                </DialogClose>
                                                <Button
                                                        type="submit"
                                                        variant={"secondary"}
                                                        onClick={handleSubmit}
                                                >
                                                        Cek Status
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </form>
                </Dialog>
        );
}
