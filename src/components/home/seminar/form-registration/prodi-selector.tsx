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
import { KelasTableSchema, ProdiTableSchema } from "@/models/kelas/table";
import { SelectorSkeleton } from "../../selector-skeleton";

interface ProdiSelectorProps {
   disabled?: boolean;
   onProdiChange?: (prodi: ProdiTableSchema | null) => void;
   onKelasChange?: (kelas: KelasTableSchema | null) => void;
   prodiData: ProdiTableSchema[];
}

const ProdiSelector = ({
   disabled,
   onProdiChange,
   onKelasChange,
   prodiData,
}: ProdiSelectorProps) => {
   const [selectedProdi, setSelectedProdi] = useState<ProdiTableSchema | null>(
      null
   );
   const [selectedKelas, setSelectedKelas] = useState<KelasTableSchema | null>(
      null
   );
   const [openProdiDropdown, setOpenProdiDropdown] = useState(false);
   const [openKelasDropdown, setOpenKelasDropdown] = useState(false);

   let availableKelas: KelasTableSchema[];
   if (selectedProdi?.kelas) {
      availableKelas = selectedProdi.kelas;
   }
   // if (kelasData! && kelasData.length > 0) {
   //    // Filter states for selected prodi
   //    availableKelas = kelasData.filter(
   //       (kelas) => kelas.prodi === selectedProdi?.nama
   //    );
   // }

   const handleProdiSelect = (prodi: ProdiTableSchema | null) => {
      setSelectedProdi(prodi);
      setSelectedKelas(null); // Reset state when prodi changes
      onProdiChange?.(prodi);
      onKelasChange?.(null);
   };

   const handleKelasSelect = (state: KelasTableSchema | null) => {
      setSelectedKelas(state);
      onKelasChange?.(state);
   };

   return (
      <div
         className={` grid ${
            availableKelas! && availableKelas.length > 0
               ? "grid-cols-2"
               : "grid-cols-1"
         } gap-4`}
      >
         {/* Prodi Selector */}
         <Popover open={openProdiDropdown} onOpenChange={setOpenProdiDropdown}>
            <PopoverTrigger asChild>
               <Button
                  variant="select"
                  role="combobox"
                  aria-expanded={openProdiDropdown}
                  disabled={disabled}
                  className="w-full justify-between font-poppins"
               >
                  {selectedProdi ? (
                     <div className="flex items-center gap-2">
                        <span>{selectedProdi.nama}</span>
                     </div>
                  ) : (
                     <span>Pilih Program studi...</span>
                  )}
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className={`ml-4 sm:ml-0 p-0 ${!availableKelas! && "w-full"}`}>
               <Command>
                  <CommandInput placeholder="Cari program studi..." />
                  <CommandList>
                     {prodiData ? (
                        <>
                           <CommandEmpty>
                              Program studi tidak ditemukan.
                           </CommandEmpty>
                           <CommandGroup>
                              <ScrollArea className="h-[300px]">
                                 {prodiData.map((prodi) => (
                                    <CommandItem
                                       key={prodi.id}
                                       value={prodi.nama}
                                       onSelect={() => {
                                          handleProdiSelect(prodi);
                                          setOpenProdiDropdown(false);
                                       }}
                                       className="flex cursor-pointer items-center justify-between text-sm"
                                    >
                                       <div className="flex items-center gap-2">
                                          <span>{prodi.nama}</span>
                                       </div>
                                       <Check
                                          className={cn(
                                             "h-4 w-4",
                                             selectedProdi?.id === prodi.id
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

         {/* Kelas Selector - Only shown if selected prodi has states */}
         {availableKelas! && availableKelas!.length > 0 && (
            <Popover
               open={openKelasDropdown}
               onOpenChange={setOpenKelasDropdown}
            >
               <PopoverTrigger asChild>
                  <Button
                     variant="select"
                     role="combobox"
                     aria-expanded={openKelasDropdown}
                     disabled={!selectedProdi}
                     className="w-full justify-between font-poppins"
                  >
                     {selectedKelas ? (
                        <span>{selectedKelas.nama}</span>
                     ) : (
                        <span>Pilih Kelas...</span>
                     )}
                     <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="p-0 mr-4 sm:mr-0">
                  <Command>
                     <CommandInput placeholder="Cari kelas..." />
                     <CommandList>
                        <CommandEmpty>Kelas tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                           <ScrollArea className="h-[300px]">
                              {availableKelas!.map((kelas) => (
                                 <CommandItem
                                    key={kelas.id}
                                    value={kelas.nama}
                                    onSelect={() => {
                                       handleKelasSelect(kelas);
                                       setOpenKelasDropdown(false);
                                    }}
                                    className="flex cursor-pointer items-center justify-between text-sm"
                                 >
                                    <span>{kelas.nama}</span>
                                    <Check
                                       className={cn(
                                          "h-4 w-4",
                                          selectedKelas?.id === kelas.id
                                             ? "opacity-100"
                                             : "opacity-0"
                                       )}
                                    />
                                 </CommandItem>
                              ))}
                              <ScrollBar orientation="vertical" />
                           </ScrollArea>
                        </CommandGroup>
                     </CommandList>
                  </Command>
               </PopoverContent>
            </Popover>
         )}
      </div>
   );
};

export default ProdiSelector;
