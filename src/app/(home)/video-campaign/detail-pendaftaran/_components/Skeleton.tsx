import { Label } from "@/components/ui/nb/label";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailPendaftaranSkeleton() {
   return (
      <div className="p-6 flex flex-col gap-y-8 md:gap-y-6">
         <h3 className="text-2xl font-bold mb-10 flex flex-col space-y-2">
            <Skeleton className="w-40 h-8 bg-foreground/20" />
            <Skeleton className="w-60 h-4 bg-foreground/20" />
         </h3>
         <div className="flex justify-end items-end">
            <Skeleton className="w-30 h-8 bg-foreground/20" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
               <Label>
                  <Skeleton className="w-20 h-6 bg-foreground/20" />
               </Label>
               <Skeleton className="w-full h-8 bg-foreground/20" />
            </div>
            <div className="space-y-2">
               <Label>
                  <Skeleton className="w-20 h-6 bg-foreground/20" />
               </Label>
               <Skeleton className="w-full h-8 bg-foreground/20" />
            </div>
         </div>

         <div className="mt-6 space-y-4">
            <h4 className="font-semibold mb-2">
               <Skeleton className="w-50 h-6 bg-foreground/20" />
            </h4>
            <Skeleton className="w-60 h-8 bg-foreground/20" />
         </div>

         <div className="mt-6">
            <h4 className="font-semibold mb-2">
               <Skeleton className="w-full h-50 bg-foreground/20" />
            </h4>

            <div className="overflow-x-auto mt-10 space-y-4">
               <Skeleton className="w-50 h-6 bg-foreground/20" />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
                  <Skeleton className="w-full h-6 bg-foreground/20" />
                  <Skeleton className="w-full h-6 bg-foreground/20" />
                  <Skeleton className="w-full h-6 bg-foreground/20" />
               </div>
            </div>
         </div>
      </div>
   );
}
