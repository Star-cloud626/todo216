import type { NextConfig } from 'next';
import initializeBundleAnalyzer from '@next/bundle-analyzer';

// Initialize bundle analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// Next.js configuration
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'ui.shadcn.com' }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/list',
                permanent: true, // true = 301 redirect, false = 302 redirect
            }
        ];
    }
};

export default withBundleAnalyzer(nextConfig);
