// src/app/middleware.js (또는 src/middleware.js)
import { NextResponse } from 'next/server';

const allowedOrigins = ['http://localhost:3000',];

export function middleware(request) {
  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  // Preflight 요청 처리
  if (request.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      const headers = new Headers();
      headers.append('Access-Control-Allow-Origin', origin);
      headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.append(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-CSRF-Token'
      );
      headers.append('Access-Control-Allow-Credentials', 'true');
      return new Response(null, { status: 200, headers });
    }
    return new Response(null, { status: 403 }); // Origin이 허용되지 않으면 차단
  }

  // CORS 헤더 추가
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.append('Access-Control-Allow-Origin', origin);
    response.headers.append('Access-Control-Allow-Credentials', 'true');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.append(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token'
    );
  }

  return response;
}

export const config = {
  matcher: '/api/:path*', // API 경로에만 적용
};
