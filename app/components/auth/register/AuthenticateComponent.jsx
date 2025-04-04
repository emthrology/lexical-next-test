import React from 'react';

export default function AuthencicateComponent({ setPhase }) {
  return (
    <div className="user-auth-wrap register">
      <h3 className="main-title paperlogy">본인 인증</h3>
      <div className="guide-title">
        입력한 휴대폰 번호로 인증 후{' '}
        <span className="mob">회원가입이 진행됩니다.</span>
      </div>
      <div className="input_wrap">
        <div className="input_container">
          <label htmlFor="name" className="input_title label-flex">
            <input
              className="input-01"
              type="text"
              id="name"
              placeholder="이름"
            />
          </label>
        </div>
        <div className="input_container m-t-20">
          <label htmlFor="phone" className="input_title label-flex">
            <input
              className="input-01"
              type="tel"
              id="phone"
              placeholder="휴대전화"
            />
          </label>
          <button className="codeBtn btn-01" type="button">
            인증번호 전송
          </button>
        </div>
        <div className="input_container m-t-20">
          <label htmlFor="code" className="password_container label-flex">
            <input
              className="input-01"
              id="code"
              type="text"
              placeholder="인증번호"
            />
          </label>
          <button className="btn-04" type="button">
            확인
          </button>
        </div>
      </div>
      <div className="btn_wrap">
        <button
          type="button"
          className="user-btn"
          onClick={() => setPhase('Agree')}
        >
          다음
        </button>
      </div>
      {/* TODO 인증결과를 registerStore를 zustand로 만들어서 저장 */}
      <button onClick={() => setPhase('Agree')}>Go to Agree</button>
    </div>
  );
}
