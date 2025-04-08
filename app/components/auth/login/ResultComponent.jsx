import React from 'react';
import useFindStore from '@/store/findStore';
import Link from 'next/link';
export default function ResultComponent() {
  const {
    findType,
    setFindType,
    clearFindType,

    userId,
    setUserId,
    clearUserId,

    findSet,
  } = useFindStore();
  const currentFindSet = findSet.find((item) => item.id === findType);
  const renderTemplate = () => {
    if (currentFindSet.id === 'id') {
      return (
        <>
          <div className="id-result">
            회원님의 아이디는
            <b className="yellow">{userId}</b>
            입니다.
          </div>
          <div className="btn_wrap m-t-40">
            <button className="btn-01" type="button">
              비밀번호 찾기
            </button>
            <Link className="btn-02" href="/auth/login">
              로그인 하기
            </Link>
          </div>
        </>
      );
    }
    if (currentFindSet.id === 'pw') {
      return (
        <>
          <div className="input_wrap">
            <div className="input_container">
              <label htmlFor="newPw" className="label-flex">
                <input
                  className="input-01"
                  type="password"
                  id="newPw"
                  placeholder="새 비밀번호"
                />
              </label>
            </div>
            <div className="input_container m-t-20">
              <label htmlFor="checkPw" className="label-flex">
                <input
                  className="input-01"
                  type="password"
                  id="checkPw"
                  placeholder="비밀번호 확인"
                />
              </label>
            </div>
          </div>
          <div className="btn_wrap">
            <button type="button" className="user-btn">
              비밀번호 변경
            </button>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="user-auth-wrap find-result-wrap">
        <h3 className="main-title paperlogy">{currentFindSet.name}</h3>
        <div
          className="guide-title"
          style={{ display: currentFindSet.id == 'pw' ? 'block' : 'none' }}
        >
          새 비밀번호를 설정해주세요.
        </div>
        {renderTemplate()}
      </div>
    </>
  );
}
