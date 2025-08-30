
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SeminarKelasDataTable } from "./kelas-data-table";
import { ClassRegistrationTable } from "@/models/seminar/table";
interface Props {
  dataPendaftaranKelas: ClassRegistrationTable[]
}
export function SeminarTabsTable({ dataPendaftaranKelas, }: Props) {
  return (
    <Tabs
      defaultValue="kelas"
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
            <SelectItem value="kelas">Kelas</SelectItem>
            <SelectItem value="peserta">
              Peserta
            </SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="kelas">Kelas</TabsTrigger>
          <TabsTrigger value="peserta">
            Peserta <Badge variant="secondary">3</Badge>
          </TabsTrigger>
        </TabsList>
        
      </div>
      <TabsContent
        value="kelas"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <SeminarKelasDataTable data={dataPendaftaranKelas} />
      </TabsContent>
      <TabsContent
        value="peserta"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}
