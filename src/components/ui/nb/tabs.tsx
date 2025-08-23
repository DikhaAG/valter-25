"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
   return (
      <TabsPrimitive.Root
         data-slot="tabs"
         className={cn("flex flex-col gap-2", className)}
         {...props}
      />
   );
}

function TabsList({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
   return (
      <TabsPrimitive.List
         data-slot="tabs-list"
         className={cn(
            "bg-muted text-muted-foreground inline-flex h-10 lg:h-12 w-fit items-center justify-center rounded-lg p-[4px] lg:p-[6px]",
            "transition-all gap-1.5 lg:gap-2 border-foreground border-2 bg-orange-50 drop-shadow-[5px_5px_0px_#00000040]",
            className
         )}
         {...props}
      />
   );
}

function TabsTrigger({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
   return (
      <TabsPrimitive.Trigger
         data-slot="tabs-trigger"
         className={cn(
            "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            "text-xs cursor-pointer border-primary bg-stone-300 data-[state=active]:bg-foreground text-foreground data-[state=active]:text-background transition-all -translate-x-0.5 -translate-y-0.5 hover:translate-0 data-[state=active]:translate-0 drop-shadow-[3px_3px_0px_#00000040] lg:drop-shadow-[5px_5px_0px_#00000040] hover:drop-shadow-none data-[state=active]:drop-shadow-none",
            className
         )}
         {...props}
      />
   );
}

function TabsContent({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
   return (
      <TabsPrimitive.Content
         data-slot="tabs-content"
         className={cn("flex-1 outline-none", className)}
         {...props}
      />
   );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
