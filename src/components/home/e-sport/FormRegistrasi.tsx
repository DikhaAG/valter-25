"use client";
import { Button } from "@/components/ui/nb/button";
import { Input } from "@/components/ui/nb/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/nb/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import {
        registrasiFormSchema,
        RegistrasiFormSchema,
} from "@/zod/home/e-sport/registrasi-form-schema";
import {
        FormField,
        FormItem,
        FormLabel,
        FormControl,
        FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { UploadBuktiPembayaranField } from "@/components/home/e-sport/UploadBuktiPembayaranField";
import { v4 as uuidv4 } from "uuid";
import { submitFormAction } from "@/server/home/e-sport/submit-form-action";
import { CustomToast } from "@/components/ui/nb/custom-toast";
import { useRouter } from "next/navigation";

export function FormRegistrasi() {
        const router = useRouter();
        const form = useForm<RegistrasiFormSchema>({
                resolver: zodResolver(registrasiFormSchema),
                defaultValues: {
                        namaTim: "",
                        instansi: "",
                        noWa: "",
                        tim: [{ id: uuidv4(), idML: "", nama: "", npm: "" }], // Baris pertama secara default
                },
                mode: "onBlur",
        });

        const { fields, append, remove } = useFieldArray({
                control: form.control,
                name: "tim",
        });

        async function onSubmit(data: RegistrasiFormSchema) {
                console.log("Data yang akan di-submit:", data);
                const res = { error: undefined };
                if (res.error) {
                        CustomToast({
                                variant: "error",
                                message: `${res.error} 😂💀`,
                        });
                } else {
                        CustomToast({
                                variant: "success",
                                message: `Berhasil melakukan pendaftaran 😂. Tunggu admin untuk konfirmasi 😘`,
                        });
                        await new Promise(() =>
                                setInterval(() => {
                                        form.reset();
                                        router.push(
                                                "/e-sport/detail-pendaftaran"
                                        );
                                }, 1000)
                        );
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
                                                                                placeholder="ex: Tim Mulmeds"
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
                                                                                        placeholder="Politeknik Negeri Sriwijaya"
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
                                                                {/* <FormMessage /> */}
                                                        </FormItem>
                                                )}
                                        />
                                </div>
                                <h2>Daftar Peserta</h2>
                                {fields.map((field, index) => (
                                        <div
                                                key={field.id}
                                                className="grid md:grid-cols-4 gap-6"
                                        >
                                                <div>
                                                        <FormField
                                                                control={
                                                                        form.control
                                                                }
                                                                name={`tim.${index}.idML`}
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
                                                                name={`tim.${index}.npm`}
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
                                                                name={`tim.${index}.nama`}
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
                                                <div className=" mt-6.5">
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
                                                        >
                                                                <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                </div>
                                        </div>
                                ))}

                                <Button
                                        type="button"
                                        onClick={() =>
                                                append({
                                                        idML: "",
                                                        nama: "",
                                                        npm: "",
                                                })
                                        }
                                        variant="gosong"
                                        className="text-center items-center"
                                >
                                        <Plus className="size-5 font-bold" />{" "}
                                        <span className="hidden md:flex">
                                                Tambah peserta
                                        </span>
                                </Button>
                                <p className="text-xs  mt-2 font-poppins">
                                        *) Saya menyatakan bahwa data yang saya
                                        berikan adalah benar dan bersedia
                                        memenuhi seluruh ketentuan Pendaftaran
                                        VALTER 2025.
                                </p>
                                <Button
                                        type="submit"
                                        variant={"secondary"}
                                        className="w-full max-w-lg flex justify-self-center"
                                        disabled={form.formState.isLoading}
                                >
                                        Submit
                                </Button>
                        </form>
                </FormProvider>
        );
}
