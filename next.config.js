/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty');
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any hostname
      },
    ],
  },
};

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

module.exports = nextConfig;
