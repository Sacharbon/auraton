import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'em-content.zobj.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'france3-regions.francetvinfo.fr',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
