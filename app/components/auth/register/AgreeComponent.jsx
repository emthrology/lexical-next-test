import React from 'react';

export default function AgreeComponent({ setPhase }) {
  return (
    <div>
      <div className="user-auth-wrap agree-wrap">
        <h3 className="main-title paperlogy">회원가입</h3>
        <div className="guide-title">
          <span>서비스 이용을 위한 이용약관에 동의해주세요.</span>
        </div>
        <div className="all-check keep-wrap">
          <label htmlFor="all-agree" className="terms-label">
            <input className="check-input" type="checkbox" id="all-agree" />
            <span className="checkBox">
              <svg
                className="check-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="4" fill="#e0e0e0" />
                <path
                  d="M6 9.4L9 13L14 7"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            약관 전체동의
          </label>
        </div>

        <div className="separate-check keep-wrap m-t-20">
          <div className="separate-item">
            <div className="separate-agree">
              <label htmlFor="terms-agree" className="terms-label">
                <input
                  type="checkbox"
                  className="check-input individual-agree"
                  id="terms-agree"
                  required="required"
                />
                <span className="checkBox">
                  <svg
                    className="check-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" rx="4" fill="#e0e0e0" />
                    <path
                      d="M6 9.4L9 13L14 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                이용약관 동의
                <span className="necessity">(필수)</span>
              </label>
              <div className="drop-icon">
                <img
                  src="/img/user-auth/right-arrow.svg"
                  alt="arrow-drop-icon"
                />
              </div>
            </div>
            <div className="terms-content">
              <p>제1조(목적 등)</p>
              <p>
                <span>&#9312;</span>
                Acts29비전빌리지 서비스 약관(이하 "본 약관"이라 합니다)은
                이용자가 Acts29비전빌리지에서 제공하는 인터넷 관련 서비스(이하
                "서비스"라 합니다)를 이용함에 있어 이용자와 "Acts29비전빌리지"의
                권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                <span>&#9313;</span>
                이용자가 되고자 하는 자가 "Acts29비전빌리지"이 정한 소정의
                절차를 거쳐서 "등록하기" 단추를 누르면 본 약관에 동의하는 것으로
                간주합니다. 본 약관에 정하는 이외의 이용자와 "Acts
                29비전빌리지"의 권리, 의무 및 책임사항에 관해서는 전기통신사업법
                기타 대한민국의 관련 법령과 상관습에 의합니다.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                maiores molestiae minus voluptates nam debitis corrupti mollitia
                possimus aspernatur quia, dolorem, dignissimos assumenda rem
                porro totam quam quae laborum? Expedita? Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia.
              </p>
            </div>
          </div>

          <div className="separate-item m-t-20">
            <div className="separate-agree">
              <label htmlFor="privacy-agree" className="terms-label">
                <input
                  type="checkbox"
                  className="check-input individual-agree"
                  id="privacy-agree"
                  required="required"
                />
                <span className="checkBox">
                  <svg
                    className="check-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" rx="4" fill="#e0e0e0" />
                    <path
                      d="M6 9.4L9 13L14 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                개인정보 수집 및 이용 동의
                <span className="necessity">(필수)</span>
              </label>
              <div className="drop-icon">
                <img
                  src="/img/user-auth/right-arrow.svg"
                  alt="arrow-drop-icon"
                />
              </div>
            </div>
            <div className="terms-content">
              <p>제1조(목적 등)</p>
              <p>
                <span>&#9312;</span>
                Acts29비전빌리지 서비스 약관(이하 "본 약관"이라 합니다)은
                이용자가 Acts29비전빌리지에서 제공하는 인터넷 관련 서비스(이하
                "서비스"라 합니다)를 이용함에 있어 이용자와 "Acts29비전빌리지"의
                권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                <span>&#9313;</span>
                이용자가 되고자 하는 자가 "Acts29비전빌리지"이 정한 소정의
                절차를 거쳐서 "등록하기" 단추를 누르면 본 약관에 동의하는 것으로
                간주합니다. 본 약관에 정하는 이외의 이용자와 "Acts
                29비전빌리지"의 권리, 의무 및 책임사항에 관해서는 전기통신사업법
                기타 대한민국의 관련 법령과 상관습에 의합니다.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                maiores molestiae minus voluptates nam debitis corrupti mollitia
                possimus aspernatur quia, dolorem, dignissimos assumenda rem
                porro totam quam quae laborum? Expedita? Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia.
              </p>
            </div>
          </div>

          <div className="separate-item m-t-20">
            <div className="separate-agree">
              <label htmlFor="age-agree" className="terms-label">
                <input
                  type="checkbox"
                  className="check-input individual-agree"
                  id="age-agree"
                  required="required"
                />
                <span className="checkBox">
                  <svg
                    className="check-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" rx="4" fill="#e0e0e0" />
                    <path
                      d="M6 9.4L9 13L14 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                만 14세 이상입니다.
                <span className="necessity">(필수)</span>
              </label>
              <div className="drop-icon">
                <img
                  src="/img/user-auth/right-arrow.svg"
                  alt="arrow-drop-icon"
                />
              </div>
            </div>
            <div className="terms-content">
              <p>제1조(목적 등)</p>
              <p>
                <span>&#9312;</span>
                Acts29비전빌리지 서비스 약관(이하 "본 약관"이라 합니다)은
                이용자가 Acts29비전빌리지에서 제공하는 인터넷 관련 서비스(이하
                "서비스"라 합니다)를 이용함에 있어 이용자와 "Acts29비전빌리지"의
                권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                <span>&#9313;</span>
                이용자가 되고자 하는 자가 "Acts29비전빌리지"이 정한 소정의
                절차를 거쳐서 "등록하기" 단추를 누르면 본 약관에 동의하는 것으로
                간주합니다. 본 약관에 정하는 이외의 이용자와 "Acts
                29비전빌리지"의 권리, 의무 및 책임사항에 관해서는 전기통신사업법
                기타 대한민국의 관련 법령과 상관습에 의합니다.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                maiores molestiae minus voluptates nam debitis corrupti mollitia
                possimus aspernatur quia, dolorem, dignissimos assumenda rem
                porro totam quam quae laborum? Expedita? Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia.
              </p>
            </div>
          </div>

          <div className="separate-item  m-t-20">
            <div className="separate-agree">
              <label htmlFor="marketing-agree" className="terms-label">
                <input
                  type="checkbox"
                  className="check-input individual-agree"
                  id="marketing-agree"
                  required="required"
                />
                <span className="checkBox">
                  <svg
                    className="check-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="20" height="20" rx="4" fill="#e0e0e0" />
                    <path
                      d="M6 9.4L9 13L14 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                마케팅 활용 동의<span className="necessity">(선택)</span>
              </label>
              <div className="drop-icon">
                <img
                  src="/img/user-auth/right-arrow.svg"
                  alt="arrow-drop-icon"
                />
              </div>
            </div>
            <div className="terms-content">
              <p>제1조(목적 등)</p>
              <p>
                <span>&#9312;</span>
                Acts29비전빌리지 서비스 약관(이하 "본 약관"이라 합니다)은
                이용자가 Acts29비전빌리지에서 제공하는 인터넷 관련 서비스(이하
                "서비스"라 합니다)를 이용함에 있어 이용자와 "Acts29비전빌리지"의
                권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                <span>&#9313;</span>
                이용자가 되고자 하는 자가 "Acts29비전빌리지"이 정한 소정의
                절차를 거쳐서 "등록하기" 단추를 누르면 본 약관에 동의하는 것으로
                간주합니다. 본 약관에 정하는 이외의 이용자와 "Acts
                29비전빌리지"의 권리, 의무 및 책임사항에 관해서는 전기통신사업법
                기타 대한민국의 관련 법령과 상관습에 의합니다.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                maiores molestiae minus voluptates nam debitis corrupti mollitia
                possimus aspernatur quia, dolorem, dignissimos assumenda rem
                porro totam quam quae laborum? Expedita? Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia. Lorem ipsum dolor sit
                amet consectetur, adipisicing elit. Exercitationem rerum iste
                minima voluptas consequatur assumenda consequuntur earum.
                Molestiae corporis earum accusamus repellendus esse quia
                reiciendis at, velit enim quo mollitia.
              </p>
            </div>
          </div>
        </div>
        <div className="btn_wrap">
          <button
            type="button"
            className="user-btn"
            onClick={() => setPhase('Form')}
          >
            다음
          </button>
        </div>
      </div>
      {/* TODO 동의 결과를 registerStore를 zustand로 만들어서 저장 */}
      <button onClick={() => setPhase('Form')}>Go to Form</button>
    </div>
  );
}
