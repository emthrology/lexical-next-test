/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  publicRuntimeConfig: {
    // 클라이언트와 서버 모두에서 접근 가능
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      // https://d2d5wqehjh5x7e.cloudfront.net/1248/signal-2025-01-07-151606_002.jpg
      {
        protocol: 'https',
        hostname: 'd2d5wqehjh5x7e.cloudfront.net',
        pathname: '/**', // 모든 경로 허용
      },
    ]
  }
};

export default nextConfig;
