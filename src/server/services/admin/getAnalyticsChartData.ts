import { db } from '@/lib/drizzle';
import { timEsportTable } from '@/server/db/schemas/esport-schema';
import { pesertaPelatihanTable } from '@/server/db/schemas/pelatihan';
import { pesertaSeminarTable } from '@/server/db/schemas/seminar-schema';
import { timVideoCampaignTable } from '@/server/db/schemas/video-campaign-schema';
import { timWebDesignTable } from '@/server/db/schemas/web-design-schema';
import { sql, asc } from 'drizzle-orm';

export interface AnalyticsChartData {
    date: string;
    pelatihan: number;
    seminar: number;
    esport: number;
    videoCampaign: number;
    webDesign: number;
}
// Definisikan tipe baru untuk kunci yang berisi nilai numerik
type CountKeys = Exclude<keyof AnalyticsChartData, 'date'>;

/**
 * Mengambil data jumlah pendaftaran dari berbagai tabel per hari untuk data chart.
 * Mengembalikan array objek dengan format {date, pelatihan, seminar, esport, videoCampaign, webDesign}.
 * @returns {Promise<AnalyticsChartData[]>} Data chart yang diformat.
 */
export async function getAnalyticsChartData(): Promise<AnalyticsChartData[]> {
    try {
        // Sub-query untuk Pelatihan (menggabungkan individu dan kelas)
        const pelatihanData = await db
            .select({
                date: sql<string>`DATE(${pesertaPelatihanTable.createdat})`,
                count: sql<number>`CAST(COUNT(*) AS INT)`,
            })
            .from(pesertaPelatihanTable)
            .groupBy(sql`DATE(${pesertaPelatihanTable.createdat})`);

        // Sub-query untuk Seminar (menggabungkan individu dan kelas)
        const seminarData = await db
            .select({
                date: sql<string>`DATE(${pesertaSeminarTable.createdat})`,
                count: sql<number>`CAST(COUNT(*) AS INT)`,
            })
            .from(pesertaSeminarTable)
            .groupBy(sql`DATE(${pesertaSeminarTable.createdat})`);

        // Sub-query untuk Esport
        const esportData = await db
            .select({
                date: sql<string>`DATE(${timEsportTable.createdat})`,
                count: sql<number>`CAST(COUNT(*) AS INT)`,
            })
            .from(timEsportTable)
            .groupBy(sql`DATE(${timEsportTable.createdat})`);

        // Sub-query untuk Video Campaign
        const videoCampaignData = await db
            .select({
                date: sql<string>`DATE(${timVideoCampaignTable.createdat})`,
                count: sql<number>`CAST(COUNT(*) AS INT)`,
            })
            .from(timVideoCampaignTable)
            .groupBy(sql`DATE(${timVideoCampaignTable.createdat})`);

        // Sub-query untuk Web Design
        const webDesignData = await db
            .select({
                date: sql<string>`DATE(${timWebDesignTable.createdat})`,
                count: sql<number>`CAST(COUNT(*) AS INT)`,
            })
            .from(timWebDesignTable)
            .groupBy(sql`DATE(${timWebDesignTable.createdat})`);

        // Gabungkan semua hasil ke dalam satu map untuk pemrosesan yang efisien
        const combinedData = new Map<string, AnalyticsChartData>();

        const processData = (data: { date: string, count: number }[], key: CountKeys) => {
            data.forEach(item => {
                if (!combinedData.has(item.date)) {
                    combinedData.set(item.date, {
                        date: item.date,
                        pelatihan: 0,
                        seminar: 0,
                        esport: 0,
                        videoCampaign: 0,
                        webDesign: 0,
                    });
                }
                const entry = combinedData.get(item.date);
                if (entry) {
                    entry[key] = item.count;
                }
            });
        };

        processData(pelatihanData, 'pelatihan');
        processData(seminarData, 'seminar');
        processData(esportData, 'esport');
        processData(videoCampaignData, 'videoCampaign');
        processData(webDesignData, 'webDesign');

        // Konversi Map ke array dan urutkan berdasarkan tanggal
        const result = Array.from(combinedData.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return result;
    } catch (error) {
        console.error("Gagal mengambil data analitik:", error);
        return [];
    }
}
