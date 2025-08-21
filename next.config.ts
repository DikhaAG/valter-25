import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        /* config options here */
        images: {
                domains: ["res.cloudinary.com"],
                formats: ["image/avif", "image/webp"], // Tambahkan format yang Anda butuhkan
        },
};

export default nextConfig;
