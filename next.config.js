/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty');
    return config;
  },
};

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

module.exports = nextConfig;
