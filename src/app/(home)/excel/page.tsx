import { ExcelForm } from '@/components/excel-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Excel() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Unggah Data Kelas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExcelForm />
        </CardContent>
      </Card>
    </main>
  );
}