"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   getTotalTimWebDesign
} from "@/server/services/admin/getTotalPeserta";
import { useEffect, useState } from "react";
import { WebDesignTimDataTable } from "./data-table";

export function WebDesignTabsTable() {
   const [totalTim, setTotalTim] = useState<number | undefined>();
   useEffect(() => {
      getTotalTimWebDesign().then((res) =>
         res.success
            ? setTotalTim(res.data!)
            : setTotalTim(0)
      );
   }, []);
   return (
      <Tabs
         defaultValue="tim"
         className="w-full flex-col justify-start gap-6"
      >
         <div className="flex items-center justify-between px-4 lg:px-6">
            <Label htmlFor="view-selector" className="sr-only">
               View
            </Label>
            <Select defaultValue="outline">
               <SelectTrigger
                  className="flex w-fit @4xl/main:hidden"
                  size="sm"
                  id="view-selector"
               >
                  <SelectValue placeholder="Select a view" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="tim">Tim</SelectItem>
               </SelectContent>
            </Select>
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
               <TabsTrigger value="tim">
                  Tim <Badge variant="secondary">{totalTim ?? 0}</Badge>
               </TabsTrigger>
            </TabsList>
         </div>
         <TabsContent
            value="tim"
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
         >
            <WebDesignTimDataTable />
         </TabsContent>
      </Tabs>
   );
}
