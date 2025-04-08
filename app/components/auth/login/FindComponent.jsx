import React from 'react';
import useFindStore from '@/store/findStore';
export default function FindComponent({ setPhase }) {
  const {
    findType,
    setFindType,
    clearFindType,

    email,
    setEmail,
    clearEmail,

    phone,
    setPhone,
    clearPhone,

    code,
    setCode,
    clearCode,

    findSet,
  } = useFindStore();

  const currentFindSet = findSet.find((item) => item.id === findType);
  const changeSet = (id) => {
    findSet.map((item) => {
      if (item.id === id) {
        setFindType(item.id);
      }
    });
  };
  const requestCode = () => {
    // 인증번호 요청 로직을 여기에 추가하세요
    if (phone === '') {
      alert('휴대전화 번호를 입력해주세요.');
      return;
    }
    // 예를 들어, 서버에 인증번호를 요청하는 API 요청을 보낼 수 있습니다.
  };
  const handleCheckCode = () => {
    // 인증번호 확인 로직을 여기에 추가하세요
    if (code === '') {
      alert('인증번호를 입력해주세요.');
      return;
    }
    // 예를 들어, 서버에 인증번호를 확인하는 API 요청을 보낼 수 있습니다.
  };
  const handleFind = () => {
    //TODO currentFindSet 에 따라 아이디 찾기 or 비밀번호 찾기 결과값을 store에 정리해서 (API)
    //TODO 찾등 못찾든 결과값을가지고 ResultComponent로 이동
    setPhase('Result');
  };
  return (
    <>
      <div className="user-auth-wrap find-wrap">
        <h3 className="main-title paperlogy">{currentFindSet.name} 찾기</h3>
        <div className="guide-title">
          가입 당시 입력한 휴대번호를 입력해주세요&nbsp;
          <br className="mob-br" />
          인증번호를 발송해드립니다
        </div>
        <ul className="tab-view">
          <li
            className={`tab-${findType == 'id' ? 'active' : 'disb'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => changeSet('id')}
          >
            아이디 찾기
          </li>
          <li
            className={`tab-${findType == 'pw' ? 'active' : 'disb'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => changeSet('pw')}
          >
            비밀번호 찾기
          </li>
        </ul>
        <div className="input_wrap">
          <div
            className="input_container"
            style={{ display: currentFindSet.id == 'id' ? 'block' : 'none' }}
          >
            <label htmlFor="id" className="label-flex">
              <input
                type="text"
                className="input-01"
                id="id"
                placeholder="아이디"
              />
            </label>
          </div>
          <div className="input_container m-t-20">
            <label htmlFor="phone" className="label-flex">
              <input
                type="text"
                className="input-01"
                id="phone"
                placeholder="휴대전화 번호"
              />
            </label>
            <button
              className="codeBtn btn-01"
              type="button"
              onClick={requestCode}
            >
              인증번호 전송
            </button>
          </div>
          <div className="input_container m-t-20">
            <label htmlFor="code" className="label-flex">
              <input
                type="text"
                className="input-01"
                id="code"
                placeholder="인증번호"
              />
            </label>
            <button type="button" className="btn-04" onClick={handleCheckCode}>
              확인
            </button>
          </div>
          <div className="btn_wrap">
            <button className="user-btn" onClick={handleFind}>
              {currentFindSet.name} 찾기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
