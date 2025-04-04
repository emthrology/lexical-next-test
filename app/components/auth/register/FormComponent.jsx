import React from 'react';

export default function FormComponent({ setPhase }) {
  return (
    <div>
      <div className="user-auth-wrap register">
        <h3 className="main-title paperlogy">회원가입</h3>
        <div className="guide-title">
          <span>회원가입을 위한 정보를 작성해주세요.</span>
        </div>
        <div className="input_wrap">
          <div className="input_container">
            <label htmlFor="nickname" className="label-flex">
              <input
                className="input-01"
                type="text"
                id="nickname"
                placeholder="닉네임"
              />
            </label>
            <button className="btn-01" type="button">
              중복 확인
            </button>
          </div>
          <div className="input_container m-t-20">
            <label htmlFor="id" className="label-flex">
              <input
                className="input-01"
                type="text"
                id="id"
                placeholder="아이디"
              />
            </label>
            <button className="btn-01" type="button">
              중복 확인
            </button>
          </div>
          <div className="input_container m-t-20">
            <label htmlFor="password" className="password_container label-flex">
              <input
                className="input-01"
                id="password"
                type="password"
                placeholder="비밀번호"
                onInput="updatePassword()"
              />
              <span className="eyeBtn">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99997 0.25C5.91882 0.25 2.36847 2.51686 0.542558 5.85557C0.152487 6.56882 0.15248 7.43102 0.54254 8.14428C2.36843 11.4831 5.91882 13.75 10 13.75C14.0812 13.75 17.6315 11.4831 19.4574 8.14443C19.8475 7.43118 19.8475 6.56898 19.4575 5.85572C17.6316 2.51694 14.0812 0.25 9.99997 0.25ZM10 4.75C8.75736 4.75 7.75 5.75736 7.75 7C7.75 8.24264 8.75736 9.25 10 9.25C10.6805 9.25 11.2904 8.94794 11.7029 8.47059C11.0168 8.33275 10.5 7.72673 10.5 7C10.5 6.27327 11.0168 5.66725 11.7029 5.52941C11.2904 5.05206 10.6805 4.75 10 4.75ZM6.25 7C6.25 4.92893 7.92893 3.25 10 3.25C12.0711 3.25 13.75 4.92893 13.75 7C13.75 9.07107 12.0711 10.75 10 10.75C7.92893 10.75 6.25 9.07107 6.25 7Z"
                    fill="#999"
                  />
                </svg>
              </span>
            </label>
          </div>
          <div className="input_container m-t-20">
            <label
              htmlFor="check-password"
              className="password_container label-flex"
            >
              <input
                className="input-01"
                id="check-password"
                type="password"
                placeholder="비밀번호 확인"
                onInput="updatePassword()"
              />
              <span className="eyeBtn">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99997 0.25C5.91882 0.25 2.36847 2.51686 0.542558 5.85557C0.152487 6.56882 0.15248 7.43102 0.54254 8.14428C2.36843 11.4831 5.91882 13.75 10 13.75C14.0812 13.75 17.6315 11.4831 19.4574 8.14443C19.8475 7.43118 19.8475 6.56898 19.4575 5.85572C17.6316 2.51694 14.0812 0.25 9.99997 0.25ZM10 4.75C8.75736 4.75 7.75 5.75736 7.75 7C7.75 8.24264 8.75736 9.25 10 9.25C10.6805 9.25 11.2904 8.94794 11.7029 8.47059C11.0168 8.33275 10.5 7.72673 10.5 7C10.5 6.27327 11.0168 5.66725 11.7029 5.52941C11.2904 5.05206 10.6805 4.75 10 4.75ZM6.25 7C6.25 4.92893 7.92893 3.25 10 3.25C12.0711 3.25 13.75 4.92893 13.75 7C13.75 9.07107 12.0711 10.75 10 10.75C7.92893 10.75 6.25 9.07107 6.25 7Z"
                    fill="#999"
                  />
                </svg>
              </span>
            </label>
          </div>

          <div className="input_container m-t-20 residentNum-input">
            <label
              htmlFor="before-residentNum"
              className="resident-label label-flex"
            >
              <input
                className="input-01 before-residentNum"
                id="before-residentNum"
                type="text"
                placeholder="주민번호 앞자리 6자"
                maxLength="6"
                inputMode="numeric"
                pattern="[0-9]*"
                onInput="this.value = this.value.replace(/[^0-9]/g, '')"
              />
            </label>
            <span>-</span>
            <label
              htmlFor="after-residentNum"
              className="resident-label label-flex"
            >
              <input
                className="input-01 after-residentNum"
                id="after-residentNum"
                type="password"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                onInput="this.value = this.value.replace(/[^0-9]/g, '')"
              />
            </label>
            <span className="hidden-number">******</span>
          </div>
        </div>
        <div className="btn_wrap">
          <button
            type="button"
            className="user-btn m-t-40"
            onClick={() => setPhase('Complete')}
          >
            다음
          </button>
        </div>
      </div>
      {/* TODO 폼 입력 정보를 zustand의 registerStore 정보와 합쳐서 제출 */}
      <button onClick={() => setPhase('Complete')}>Go to Complete</button>
    </div>
  );
}
