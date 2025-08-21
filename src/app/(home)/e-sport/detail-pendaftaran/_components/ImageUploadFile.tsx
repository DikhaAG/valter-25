import { ACCEPTED_IMAGE_TYPES } from "@/utils/image-upload-requirements";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

// --- KOMPONEN INPUT GAMBAR ---
export const ImageUploadField = ({
        onFileChange,
}: {
        onFileChange: Dispatch<SetStateAction<File | null>>;
}) => {
        const onDrop = useCallback(
                (acceptedFiles: File[], fileRejections: FileRejection[]) => {
                        if (fileRejections.length > 0) {
                                toast.error(
                                        "Gagal mengunggah. Jenis file atau ukuran tidak valid."
                                );
                                return;
                        }
                        const file = acceptedFiles?.[0];
                        onFileChange(file);
                },
                [onFileChange]
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
                onDrop,
                accept: { "image/*": ACCEPTED_IMAGE_TYPES },
                maxFiles: 1,
        });

        return (
                <div
                        {...getRootProps()}
                        className="transition-all duration-100 -translate-y-1 -translate-x-1 hover:translate-0 shadow-[7px_7px_0px_#00000040] hover:shadow-none border-2 border-dashed border-foreground/80 rounded-md p-4 cursor-pointer bg-muted/50 hover:bg-muted text-center text-muted-foreground"
                >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                                <p>Lepaskan file di sini...</p>
                        ) : (
                                <p>
                                        Seret & lepas gambar di sini, atau klik
                                        untuk memilih file
                                </p>
                        )}
                        <p className="text-xs mt-1">
                                (JPG, JPEG, PNG, maks 500KB)
                        </p>
                </div>
        );
};
