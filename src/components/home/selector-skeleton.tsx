import { Skeleton } from "@/components/ui/skeleton";

export function SelectorSkeleton() {
   return (
      <div className="w-full flex flex-col space-y-2 p-2">
         {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
               key={i}
               className={`${
                  i === 0
                     ? "w-full h-8"
                     : `w-[${100 - (i + 1) * 20}%] h-${8 - (i + 1)}`
               } bg-foreground/20`}
            />
         ))}
      </div>
   );
}
