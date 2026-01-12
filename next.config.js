/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow cross-origin requests from local network IPs
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.0.18:3000',
    'http://192.168.*.*:3000'
  ]
};

module.exports = nextConfig;
