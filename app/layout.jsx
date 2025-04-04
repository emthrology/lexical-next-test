import React from 'react';
import '@/assets/css/globals.css';
import '@/assets/css/main.css';
import '@/assets/css/common.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
