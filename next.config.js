/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 👇 Alias para que @/ apunte a la raíz del proyecto en producción
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};

module.exports = nextConfig;
