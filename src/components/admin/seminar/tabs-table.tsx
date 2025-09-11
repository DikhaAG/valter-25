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
  getTotalPendaftaranKelasSeminar,
  getTotalPesertaSeminarIndividu,
} from "@/server/services/admin/getTotalPeserta";
import { useEffect, useState } from "react";
import { SeminarPendaftaranKelasDataTable } from "./data-table/pendaftaran-kelas/data-table";
import { PesertaIndividuDataTable } from "./data-table/peserta-individu/data-table";

export function SeminarTabsTable() {
  const [totalPendaftaranKelas, setTotalPendaftaranKelas] = useState<
    number | undefined
  >();
  const [totalPeserta, setTotalPeserta] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState<string>("kelas");

  function tabsValueHandleOnChange(value: string) {
    setActiveTab(value);
  }

  useEffect(() => {
    getTotalPendaftaranKelasSeminar().then((res) =>
      res.success
        ? setTotalPendaftaranKelas(res.data!)
        : setTotalPendaftaranKelas(0),
    );
    getTotalPesertaSeminarIndividu().then((res) =>
      res.success ? setTotalPeserta(res.data!) : setTotalPeserta(0),
    );
  }, []);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={tabsValueHandleOnChange}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select
          defaultValue={activeTab}
          onValueChange={tabsValueHandleOnChange}
          value={activeTab}
        >
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="peserta">Peserta</SelectItem>
            <SelectItem value="kelas">Kelas</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="peserta">
            Peserta <Badge variant="secondary">{totalPeserta ?? 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="kelas">
            Kelas{" "}
            <Badge variant="secondary">{totalPendaftaranKelas ?? 0}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="kelas"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <SeminarPendaftaranKelasDataTable />
      </TabsContent>
      <TabsContent
        value="peserta"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <PesertaIndividuDataTable />
      </TabsContent>
    </Tabs>
  );
}
