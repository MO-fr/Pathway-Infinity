/**
 * Next.js configuration file for Pathway Infinity
 * Configured for Next.js 15+ standards
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration with remotePatterns (Next.js 15 format)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      // Add additional hostnames as needed
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Experimental features (if needed)
  experimental: {
    // Any experimental features can be enabled here
  },
}

export default nextConfig;
