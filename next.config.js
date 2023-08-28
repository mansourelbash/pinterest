/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com']
  },
  output: 'export',
}

module.exports = nextConfig

