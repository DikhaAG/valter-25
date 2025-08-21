"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { RegistrasiFormSchema } from "@/zod/home/e-sport/registrasi-form-schema";
import { isValidImageType, isFileSizeValid, MAX_FILE_SIZE_KB, ACCEPTED_IMAGE_TYPES } from "@/utils/image-upload-requirements";

interface Props {
        field: ControllerRenderProps<RegistrasiFormSchema>;
        form: UseFormReturn<RegistrasiFormSchema>;
}

export function UploadBuktiPembayaranField({ form }: Props) {
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);

        const onDrop = useCallback(
                (acceptedFiles: File[]) => {
                        const file = acceptedFiles?.[0];

                        if (!file) {
                                setPreviewUrl(null);
                                return;
                        }

                        if (!isValidImageType(file)) {
                                form.setError(`buktiPembayaran`, {
                                        type: "invalid_type",
                                        message: "Jenis file harus JPG, JPEG, atau PNG.",
                                });
                                setPreviewUrl(null);
                                return;
                        }

                        if (!isFileSizeValid(file)) {
                                form.setError(`buktiPembayaran`, {
                                        type: "too_large",
                                        message: `Ukuran file maksimal ${MAX_FILE_SIZE_KB}KB.`,
                                });
                                setPreviewUrl(null);
                                return;
                        }

                        form.clearErrors(`buktiPembayaran`);
                        form.setValue(`buktiPembayaran`, file, {
                                shouldValidate: true,
                        });
                        setPreviewUrl(URL.createObjectURL(file));
                },
                [form]
        );

        const { getRootProps, getInputProps } = useDropzone({
                accept: { "image/*": ACCEPTED_IMAGE_TYPES },
                maxFiles: 1,
                onDrop,
        });

        return (
                <div className="flex flex-col gap-2">
                        <div
                                {...getRootProps()}
                                className="transition-all duration-100 ease-in -translate-x-1 -translate-y-1 hover:translate-0 border-4 border-dashed border-foreground/70 shadow-[8px_8px_0px_#00000040] hover:shadow-none rounded-md p-4 cursor-pointer hover:bg-[#00000040]/10"
                        >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center justify-center text-center space-y-2 font-poppins">
                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                                Seret & lepas gambar di sini
                                                atau klik untuk {previewUrl ? "upload" : "mengubah"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                                (JPG, JPEG, PNG, maks{" "}
                                                {MAX_FILE_SIZE_KB}KB)
                                        </p>
                                </div>
                        </div>
                        {previewUrl && (
                                <div className="overflow-hidden rounded-md flex items-center justify-center py-10 px-2">
                                        <Image
                                                src={previewUrl ? previewUrl : ""}
                                                alt="Preview"
                                                className="max-w-sm w-full object-cover border-4 border-foreground rounded-md shadow-[8px_8px_0px_#00000040]"
                                                width={100}
                                                height={100}
                                        />
                                </div>
                        )}
                        {form.formState.errors.buktiPembayaran?.message && (
                                <p className="text-sm font-medium text-destructive mt-1 font-poppins">
                                        {`${form.formState.errors.buktiPembayaran?.message}`}
                                </p>
                        )}
                </div>
        );
}
