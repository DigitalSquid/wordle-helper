/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'out',
  basePath: '/wordle-helper',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
