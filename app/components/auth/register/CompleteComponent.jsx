'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function CompleteComponent() {
  const router = useRouter();
  return (
    <div>
      <div className="user-auth-wrap register-complete">
        <h3 className="main-title paperlogy">회원가입 완료</h3>
        <div className="guide-title m-t-20">
          회원가입이 완료되었습니다
          <br />
          로그인 후 서비스를 이용해보세요
        </div>
        <div className="img_wrap">
          <img className="img" src="/img/user-auth/register.png" alt="로고" />
        </div>
        <div className="btn_wrap m-t-20">
          <button
            className="btn-01"
            type="button"
            onClick={() => router.push('/')}
          >
            홈으로
          </button>
          <button
            className="btn-02"
            type="button"
            onClick={() => router.push('/auth/login')}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
