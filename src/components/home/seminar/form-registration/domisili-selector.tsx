import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/nb/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
   Command,
   CommandList,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/nb/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/nb/popover";
import { cn } from "@/lib/utils";
import { SelectorSkeleton } from "../../selector-skeleton";
import { KABUPATEN_KOTA_SUMSEL_TYPE } from "@/data/kabupaten-kote-sumsel";
import { kotaEnum } from "@/models/enums";

interface DomisiliSelectorProps {
   disabled?: boolean;
   onDomisiliChange?: (domisili: kotaEnum | null) => void;
   domisiliData: KABUPATEN_KOTA_SUMSEL_TYPE;
}

const DomisiliSelector = ({
   disabled,
   onDomisiliChange,
   domisiliData,
}: DomisiliSelectorProps) => {
   const [selectedDomisili, setSelectedDomisili] = useState<kotaEnum | null>(
      null
   );
   const [opendomisiliDropdown, setOpendomisiliDropdown] = useState(false);

   const handleDomisiliSelect = (domisili: kotaEnum | null) => {
      setSelectedDomisili(domisili);
      onDomisiliChange?.(domisili);
   };

   return (
      <div className={` grid grid-cols-1 gap-4`}>
         {/* domisili Selector */}
         <Popover
            open={opendomisiliDropdown}
            onOpenChange={setOpendomisiliDropdown}
         >
            <PopoverTrigger asChild>
               <Button
                  variant="select"
                  role="combobox"
                  aria-expanded={opendomisiliDropdown}
                  disabled={disabled}
                  className="w-full justify-between font-poppins"
               >
                  {selectedDomisili ? (
                     <div className="flex items-center gap-2">
                        <span>{selectedDomisili}</span>
                     </div>
                  ) : (
                     <span>Pilih Domisili...</span>
                  )}
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className={`ml-4 sm:ml-0 p-0 w-full"}`}>
               <Command>
                  <CommandInput placeholder="Cari kota/kabupaten..."  />
                  <CommandList>
                     {domisiliData ? (
                        <>
                           <CommandEmpty>
                              Kota/kabupaten tidak ditemukan.
                           </CommandEmpty>
                           <CommandGroup>
                              <ScrollArea className="h-[300px]">
                                 {domisiliData.map((domisili) => (
                                    <CommandItem
                                       key={domisili}
                                       value={domisili}
                                       onSelect={() => {
                                          handleDomisiliSelect(domisili);
                                          setOpendomisiliDropdown(false);
                                       }}
                                       className="flex cursor-pointer items-center justify-between text-sm"
                                    >
                                       <div className="flex items-center gap-2">
                                          <span>{domisili}</span>
                                       </div>
                                       <Check
                                          className={cn(
                                             "h-4 w-4",
                                             selectedDomisili === domisili
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                    </CommandItem>
                                 ))}
                                 <ScrollBar orientation="vertical" />
                              </ScrollArea>
                           </CommandGroup>
                        </>
                     ) : (
                        <SelectorSkeleton />
                     )}
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   );
};

export default DomisiliSelector;
