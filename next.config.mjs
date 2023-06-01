// import "./env.mjs";

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

import "./env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  /** ... */
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

export default config;
