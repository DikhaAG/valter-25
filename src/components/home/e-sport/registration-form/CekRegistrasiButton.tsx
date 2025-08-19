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
export function CekRegistrasiButton() {
        return (
                <Dialog>
                        <form>
                                <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full gap-0">
                                                Sudah daftar<span className="font-funky-vibes text-2xl mr-2">?</span> klik disini
                                        </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                                <DialogTitle>
                                                        Cek Status Pendaftaran
                                                </DialogTitle>
                                                <DialogDescription>
                                                        Masukan nama team kamu untuk melihat status apakah pembayaran telah berhasil dikonfirmasi
                                                </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                        <Label htmlFor="name-1">
                                                                Nama team kamu
                                                        </Label>
                                                        <Input
                                                                id="name-1"
                                                                name="team-name"
                                                            placeholder="ex: Tim Aruna"
                                                        />
                                                </div>
                                        </div>
                                        <DialogFooter>
                                                <DialogClose asChild>
                                                        <Button variant="outline">
                                                                Tutup
                                                        </Button>
                                                </DialogClose>
                                                <Button type="submit" variant={"secondary"}>
                                                        Cek Status
                                                </Button>
                                        </DialogFooter>
                                </DialogContent>
                        </form>
                </Dialog>
        );
}
