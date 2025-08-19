'use client';

import { useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { read, utils } from 'xlsx';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';

// Anda mungkin perlu menyesuaikan path ini
// import { db } from '@/db';
// import { users } from '@/db/schema';

// Definisikan tipe data untuk satu baris data dari Excel
type ExcelRow = {
  npm: string;
  nama: string;
};

// Definisikan skema Zod untuk validasi form
const formSchema = z.object({
  namaKelas: z.string().min(1, 'Nama kelas tidak boleh kosong'),
  nominalBayar: z.number({error: (error) => `eror ${typeof error.input}`}).min(60000),
  excelFile: z.instanceof(File).refine((file) => file.name.endsWith('.xlsx'), {
    message: 'File harus berformat .xlsx',
  }),
  rows: z.array(
    z.object({
      npm: z.string({error:(e)=> `${typeof e.input}`}).min(1, 'NPM tidak boleh kosong').transform(val => String(val)),
      nama: z.string().min(1, 'Nama tidak boleh kosong'),
    })
  ),
});

// Inferensi tipe data dari skema Zod
type FormValues = z.infer<typeof formSchema>;

export function ExcelForm() {
  const [fileError, setFileError] = useState('');
  const [columnsError, setColumnsError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaKelas: '',
      nominalBayar: 0,
      excelFile: undefined,
      rows: [],
    },
  });

  const { control } = form;
  const { fields, replace } = useFieldArray({
    control,
    name: 'rows',
  });

  const watchedRows = useWatch({ control, name: 'rows' });
  const watchedNominalBayar = useWatch({ control, name: 'nominalBayar' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileError('Pilih file terlebih dahulu.');
      return;
    }
    setFileError('');
    setColumnsError('');
    form.setValue('excelFile', file, { shouldValidate: true });
  };

  const handleProcessFile = async () => {
    const file = form.getValues('excelFile');
    if (!file) {
      setFileError('Pilih file terlebih dahulu.');
      return;
    }
    setFileError('');
    setColumnsError('');

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(sheet) as ExcelRow[];

      if (json.length > 0) {
          console.log(json)
        const firstRow = json[0];
        const requiredColumns = ['npm', 'nama'];
        const existingColumns = Object.keys(firstRow);

        const missingColumns = requiredColumns.filter(
          (col) => !existingColumns.includes(col)
        );

        if (missingColumns.length > 0) {
          setColumnsError(
            `File Excel tidak memiliki kolom yang diperlukan: ${missingColumns.join(
              ', '
            )}`
          );
          form.resetField('rows');
          return;
        }

        // Validasi keunikan NPM
        const npmValues = json.map((row) => row.npm);
        const uniqueNpm = new Set(npmValues);

        if (uniqueNpm.size !== npmValues.length) {
          setColumnsError('Tidak boleh terdapat lebih dari satu mahasiswa yang sama');
          form.resetField('rows');
          return;
        }

        replace(json);
      } else {
        setColumnsError('File Excel tidak berisi data.');
        form.resetField('rows');
      }
    } catch (error) {
      console.error('Gagal memproses file:', error);
      setFileError('Gagal membaca file. Pastikan formatnya benar.');
      form.resetField('rows');
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Validasi nominal bayar terhadap jumlah baris data
    const totalPeserta = data.rows.length;
    const nominalPerPeserta = data.nominalBayar / totalPeserta;
    const biayaPendaftaran = 60000;

    if (nominalPerPeserta === biayaPendaftaran) {
      toast.success('Validasi Berhasil', {
        description: 'Jumlah peserta sesuai dengan nominal yang diberikan.',
      });
      console.log('Data yang siap diproses ke database:', data);
      
      // Bagian untuk insert ke database menggunakan Drizzle (saat ini di-komentar)
      // try {
      //   const usersToInsert: NewUser[] = data.rows.map((row) => ({
      //     npm: row.npm,
      //     nama: row.nama,
      //   }));
      //   const result = await db.insert(users).values(usersToInsert).returning();
      //   console.log('Data berhasil di-insert:', result);
      //   toast('Berhasil!', { description: 'Data berhasil disimpan ke database.' });
      // } catch (error) {
      //   console.error('Gagal menyimpan data:', error);
      //   toast('Gagal!', { description: 'Gagal menyimpan data. Cek konsol untuk detailnya.' });
      // }
      
    } else if (nominalPerPeserta < biayaPendaftaran) {
      toast.error('Pembayaran Gagal', {
        description: 'Jumlah peserta yang daftar tidak sesuai dengan total nominal yang diberikan.',
      });
    } else if (nominalPerPeserta > biayaPendaftaran) {
      toast.error('Pembayaran Gagal', {
        description: 'Jumlah peserta kurang dari nominal yang diberikan.',
      });
    } else {
      toast.error('Pembayaran Gagal', {
        description: 'Terjadi kesalahan dalam perhitungan. Periksa kembali nominal dan data excel.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="namaKelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kelas</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contoh: 2cm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nominalBayar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nominal Bayar</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Contoh: 120000"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormDescription>
                Masukkan nominal total pembayaran.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excelFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Excel</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                Unggah file Excel (.xlsx) yang berisi data mahasiswa.
              </FormDescription>
              {fileError && (
                <p className="text-sm font-medium text-destructive">{fileError}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
<Label htmlFor="">bukti pembayaran</Label>
<Input type="file" />
        <Button type="button" onClick={handleProcessFile} className="w-full">
          Tampilkan Data
        </Button>
        {columnsError && (
          <p className="text-sm font-medium text-destructive">{columnsError}</p>
        )}
        {fields.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Daftar Mahasiswa</h3>
            <div className="space-y-4">
              {watchedRows.map((row, index) => (
                <div key={index} className="border p-4 rounded-md bg-muted">
                  <p className="font-bold mb-2">{index + 1}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(row as ExcelRow).map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`rows.${index}.${key as keyof ExcelRow}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{key}</FormLabel>
                            <FormControl>
                              <Input {...field} value={String(field.value)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {fields.length > 0 && (
          <Button type="submit" className="w-full mt-8">
            Kirim Data
          </Button>
        )}
      </form>
    </Form>
  );
}