"use client";
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/nb/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import {
        FormField,
        FormItem,
        FormLabel,
        FormControl,
        FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { UploadBuktiPembayaranField } from "@/app/(home)/e-sport/_sections/_components/upload-bukti-pembayaran-field";
import { v4 as uuidv4 } from "uuid";
import { submitFormAction } from "@/server/home/e-sport/submit-form-action";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/nb/checkbox";
import { Label } from "@/components/ui/nb/label";
import { cekKetersediaanNamaTim } from "@/server/home/e-sport/cek-ketersediaan-nama-tim";
import { emotError } from "@/data/emot-response";
import { cekKetersediaanPeserta } from "@/server/home/e-sport/cek-ketersediaan-peserta";
import { cekKetersediaanNoWa } from "@/server/home/e-sport/cek-ketersediaan-no-wa";
import { isNumeric } from "@/utils/home/is-numeric";
import { wrapSymbols } from "@/utils/wrap-symbols";
import {
        formPendaftaranTimSchema,
        FormPendaftaranTimSchemaType,
} from "@/zod/home/e-sport/form-pendaftaran-tim-schema";
import { Spinner } from "@/components/ui/nb/Spinner";

export function FormPendaftaran() {
        const [termsChecked, setTermsChecked] = useState<boolean>(false);
        const [loading, setLoading] = useState(false);
        const router = useRouter();
        const form = useForm<FormPendaftaranTimSchemaType>({
                resolver: zodResolver(formPendaftaranTimSchema),
                defaultValues: {
                        namaTim: "",
                        instansi: "",
                        noWa: "",
                        peserta: [
                                { id: uuidv4(), idML: "", nama: "", npm: "" },
                        ], // Baris pertama secara default
                },
                mode: "onBlur",
        });

        const { fields, append, remove } = useFieldArray({
                control: form.control,
                name: "peserta",
        });

        async function onSubmit(data: FormPendaftaranTimSchemaType) {
                setLoading(true);
                //cek apakah nomor whatsapp merupakan number
                if (!isNumeric(data.noWa)) {
                        form.setError("noWa", {
                                message: "Nomor Whatsapp tidak valid!.",
                        });
                        CustomToast({
                                variant: "error",
                                message: `Nomor Whatsapp tidak valid!. ${emotError}`,
                        });
                        setLoading(false);
                        return;
                }

                // cek apakah no wa telah terdaftar
                const cekNoWa = await cekKetersediaanNoWa(data.noWa);
                if (!cekNoWa.success) {
                        if (cekNoWa.statusCode === 500) {
                                CustomToast({
                                        variant: "error",
                                        message: `${cekNoWa.message} ${emotError}`,
                                });
                                setLoading(false);
                                return;
                        }
                        CustomToast({
                                variant: "error",
                                message: `${cekNoWa.message} ${emotError}`,
                        });
                        setLoading(false);
                        return;
                }
                // cek jika bukti pembayaran sudah dipload
                if (!data.buktiPembayaran) {
                        form.setError("buktiPembayaran", {
                                message: "Bukti pembayaran belum diupload!.",
                        });
                        setLoading(false);
                        return;
                }
                // cek jika jumlah anggota sudah mencapai 5
                if (data.peserta.length < 5) {
                        CustomToast({
                                variant: "error",
                                message: "Permain harus berjumlah 5 orang.",
                        });
                        setLoading(false);
                        return;
                }
                // cek apakah nama tim telah terdaftar
                const cekNamaTim = await cekKetersediaanNamaTim(data.namaTim);
                if (!cekNamaTim.success) {
                        if (cekNamaTim.statusCode === 500) {
                                CustomToast({
                                        variant: "error",
                                        message: `${cekNamaTim.message} ${emotError}`,
                                });
                                setLoading(false);
                                return;
                        }
                        CustomToast({
                                variant: "error",
                                message: `${cekNamaTim.message} ${emotError}`,
                        });
                        setLoading(false);
                        return;
                }

                //cek apakah id ml atau npm pemain telah terdaftar
                // dan cek apakah npm pemain hanya mengandung angka
                const cekPemain = await cekKetersediaanPeserta(data.peserta);
                if (!cekPemain.success) {
                        if (cekPemain.statusCode === 500) {
                                CustomToast({
                                        variant: "error",
                                        message: `${cekPemain.message} ${emotError}`,
                                });
                                setLoading(false);
                                return;
                        }
                        CustomToast({
                                variant: "warning",
                                message: `${cekPemain.message} ${emotError}`,
                        });
                        setLoading(false);
                        return;
                }

                const res = await submitFormAction(data);
                if (!res.success) {
                        CustomToast({
                                variant: "error",
                                message: `${res.message} 😂💀`,
                        });
                        setLoading(false);
                        return;
                } else {
                        CustomToast({
                                variant: "success",
                                message: `Berhasil melakukan pendaftaran 😂. Tunggu admin untuk konfirmasi 😘`,
                        });
                        form.reset();
                        sessionStorage.setItem("kodeTim", res.data!);
                        router.push("/e-sport/detail-pendaftaran");
                        router.refresh();
                }
                // Di sini Anda bisa melakukan insert ke database menggunakan Drizzle ORM
                // Contoh:
                // await db.insert(yourTable).values(data.items);
        }
        return (
                <FormProvider {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                        >
                                <div>
                                        <FormField
                                                control={form.control}
                                                name={`namaTim`}
                                                render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                                <FormLabel>
                                                                        Nama Tim
                                                                </FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                placeholder="ex: Aruna Agnivesha."
                                                                                {...field}
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                        <div className="">
                                                <FormField
                                                        control={form.control}
                                                        name={`noWa`}
                                                        render={({ field }) => (
                                                                <FormItem className="flex-1">
                                                                        <FormLabel className="text-xs">
                                                                                Nomor
                                                                                Whatsapp
                                                                                Aktif
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                                <Input
                                                                                        className="text-xs"
                                                                                        placeholder="ex: 0869..."
                                                                                        {...field}
                                                                                />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                </FormItem>
                                                        )}
                                                />
                                        </div>
                                        <div className="pt-4 md:pt-0">
                                                <FormField
                                                        control={form.control}
                                                        name={`instansi`}
                                                        render={({ field }) => (
                                                                <FormItem className="flex-1">
                                                                        <FormLabel className="text-xs">
                                                                                Asal
                                                                                Instansi
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                                <Input
                                                                                        className="text-xs"
                                                                                        placeholder="ex: Politeknik Negeri Sriwijaya"
                                                                                        {...field}
                                                                                />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                </FormItem>
                                                        )}
                                                />
                                        </div>
                                </div>

                                <div>
                                        <FormField
                                                control={form.control}
                                                name={`buktiPembayaran`}
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel className="mb-2">
                                                                        Bukti
                                                                        Pembayaran
                                                                </FormLabel>
                                                                <FormControl>
                                                                        <UploadBuktiPembayaranField
                                                                                field={
                                                                                        field
                                                                                }
                                                                                form={
                                                                                        form
                                                                                }
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                </div>
                                <h2>Daftar Peserta</h2>
                                {fields.map((field, index) => (
                                        <div
                                                key={field.id}
                                                className="grid md:grid-cols-6 gap-6"
                                        >
                                                <div className="">
                                                        {wrapSymbols("#")}
                                                        {index + 1}
                                                </div>
                                                <div>
                                                        <FormField
                                                                control={
                                                                        form.control
                                                                }
                                                                name={`peserta.${index}.idML`}
                                                                render={({
                                                                        field,
                                                                }) => (
                                                                        <FormItem className="flex-1">
                                                                                <FormLabel>
                                                                                        ID
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="ex: 6969"
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                </div>
                                                <div>
                                                        <FormField
                                                                control={
                                                                        form.control
                                                                }
                                                                name={`peserta.${index}.npm`}
                                                                render={({
                                                                        field,
                                                                }) => (
                                                                        <FormItem className="flex-1">
                                                                                <FormLabel>
                                                                                        NPM
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="ex: 0624..."
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                </div>
                                                <div>
                                                        <FormField
                                                                control={
                                                                        form.control
                                                                }
                                                                name={`peserta.${index}.nama`}
                                                                render={({
                                                                        field,
                                                                }) => (
                                                                        <FormItem className="flex-1">
                                                                                <FormLabel>
                                                                                        Nama
                                                                                </FormLabel>
                                                                                <FormControl>
                                                                                        <Input
                                                                                                placeholder="ex: Timothy R."
                                                                                                {...field}
                                                                                        />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}
                                                        />
                                                </div>
                                                <div className=" mt-6.5 flex">
                                                        <Button
                                                                type="button"
                                                                size={"icon"}
                                                                variant={
                                                                        "destructive"
                                                                }
                                                                onClick={() =>
                                                                        remove(
                                                                                index
                                                                        )
                                                                }
                                                                disabled={
                                                                        form.getValues(
                                                                                "peserta"
                                                                        )
                                                                                .length ===
                                                                        1
                                                                }
                                                        >
                                                                <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                </div>
                                        </div>
                                ))}
                                <div className="flex justify-end">
                                        <Button
                                                type="button"
                                                onClick={() =>
                                                        append({
                                                                idML: "",
                                                                nama: "",
                                                                npm: "",
                                                        })
                                                }
                                                disabled={
                                                        form.getValues(
                                                                "peserta"
                                                        ).length === 5
                                                }
                                                variant="gosong"
                                                className="text-center items-center"
                                        >
                                                <Plus className="size-5 font-bold" />{" "}
                                                <span className="flex">
                                                        Tambah peserta
                                                </span>
                                        </Button>
                                </div>
                                <div className="flex text-center items-center gap-x-2">
                                        <Checkbox
                                                id="terms"
                                                checked={termsChecked}
                                                onCheckedChange={() =>
                                                        setTermsChecked(
                                                                !termsChecked
                                                        )
                                                }
                                        />
                                        <Label
                                                className="text-xs  mt-2 font-poppins cursor-pointer"
                                                htmlFor="terms"
                                        >
                                                *) Saya menyatakan bahwa data
                                                yang saya berikan adalah benar
                                                dan bersedia memenuhi seluruh
                                                ketentuan Pendaftaran VALTER
                                                2025.
                                        </Label>
                                </div>
                                <FormField
                                        name="npmatauidsama"
                                        render={({}) => (
                                                <FormItem>
                                                        <FormMessage className="p-4 bg-red-200 border-4 rounded-lg font-semibold border-foreground shadow-[7px_7px_0px_#00000040]" />
                                                </FormItem>
                                        )}
                                />

                                <Button
                                        type="submit"
                                        variant={"secondary"}
                                        className="w-full max-w-lg flex justify-self-center"
                                        disabled={
                                                form.formState.isLoading ||
                                                form.formState.isDirty ===
                                                        false ||
                                                termsChecked === false ||
                                                loading
                                        }
                                >
                                        {loading ? <Spinner /> : "Submit"}
                                </Button>
                        </form>
                </FormProvider>
        );
}
