import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";

export function BuktiPembayaranDialog() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
         </DialogTrigger>
         <DialogContent className="">
            <DialogHeader>
               <DialogTitle>Edit profile</DialogTitle>
               <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
               </DialogDescription>
            </DialogHeader>

            <DialogFooter>
               <Button type="submit">Unduh</Button>
               <DialogClose asChild>
                  <Button variant="outline">Tutup</Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
