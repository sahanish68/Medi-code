/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["tesseract.js"],
  allowedDevOrigins: ["172.17.176.1", "localhost:3000", "127.0.0.1:3000"]
};

export default nextConfig;
