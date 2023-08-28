/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  },

  output: {
    // Set your target directory for the exported files
    // For example, you can use 'out' or any other directory name
    directory: 'out',
  },
};

module.exports = nextConfig;
