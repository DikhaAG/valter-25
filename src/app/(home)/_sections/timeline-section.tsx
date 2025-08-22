import { TimelineDataType } from "@/types/home/acara/timeline-data-type";
import { wrapSymbols } from "@/utils/wrap-symbols";

interface Props {
   isVisible: boolean;
   data: TimelineDataType[];
}
export function TimelineSection({ isVisible, data }: Props) {
   return (
      <section
         id="timeline-section"
         className={`min-h-screen flex justify-center py-8 px-4 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
         }`}
      >
         <div className="max-w-4xl m-auto">
            <h2 className="text-xl font-bold text-secondary text-center mb-6">
               Timeline
            </h2>
            <div
               className={`grid grid-cols-1 ${
                  data.length === 1 && "md:grid-cols-1"
               } ${data.length === 2 && "md:grid-cols-2"} ${
                  data.length >= 3 && "md:grid-cols-3"
               } gap-4`}
            >
               {data.map((t, i) => (
                  <div
                     key={i}
                     className=" p-4 rounded-lg border-2 border-foreground shadow-[7px_7px_0px_#00000040] text-center"
                  >
                     <h3 className="font-semibold mb-2">
                        {wrapSymbols(t.nama)}
                        {wrapSymbols(":")}
                     </h3>
                     <p className="text-sm font-poppins">{t.tanggal}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
