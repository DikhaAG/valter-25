import { CekRegistrasiButton } from "@/app/(home)/e-sport/_components/_sections/form-registrasi-section/CekRegistrasiButton";
import { FormRegistrasi } from "@/app/(home)/e-sport/_components/_sections/form-registrasi-section/FormRegistrasi";

interface Props {
        isVisible: boolean;
}
export function EsportFormRegsitrasiSection({ isVisible }: Props) {
        return (
                <section
                        className={`py-8 px-4 transition-all duration-1000 delay-500 ${
                                isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                        }`}
                >
                        <div className="max-w-md md:max-w-5xl mx-auto">
                                <h2 className="text-xl font-bold text-secondary text-center mb-6">
                                        Pendaftaran
                                </h2>
                                <FormRegistrasi />
                                <div className="my-3"></div>
                                <CekRegistrasiButton />
                        </div>
                </section>
        );
}
