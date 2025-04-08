import React from 'react';
import useUserStore from '@/store/userStore';
export default function ProfileComponent() {
  const { user } = useUserStore();
  return (
    <div className="sec1 m-t-50" style={{ display: !!user ? 'block' : 'none' }}>
      <div className="subscriber-box m-t-50">
        <p>
          <span className="subscriber-count paperlogy">1,638명 </span> 해당
          블로그를 구독중입니다
        </p>
      </div>
      <h2 className="main-title paperlogy m-t-50">
        {user?.title ?? `${user.nickname}의 블로그`}
      </h2>
      <div className="profile-count-container">
        <div className="profile-box">
          <div className="profile-img">
            <img src={user?.my_profile_photo} alt="프로필 사진" />
          </div>
          <div className="profile-text">
            <div className="nick-job-container">
              <p className="nickname">{user?.nickname}</p>
              <p className="job-title">{user?.job ?? '블로거'}</p>
            </div>
            <p className="bio">{user?.description}</p>
          </div>
          <button type="button" className="subscribe-btn btn-02 radius-50">
            구독하기
          </button>
        </div>
        <div className="count-box">
          <div className="count-left">
            <p className="count-text">전체 방문자수</p>
            <p className="count-number paperlogy">4,333명</p>
          </div>
          <div className="count-right">
            <p className="count-today">
              Today <span className="count-today-number">15</span>
            </p>
            <p className="count-yesterday">
              Yesterday <span className="count-yesterday-number">23</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
