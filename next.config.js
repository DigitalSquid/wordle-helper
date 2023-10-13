/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wordle-helper',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
