'use client';
import React, { useState, useEffect } from 'react';
import useUserStore from '@/store/userStore';
import Cookies from 'js-cookie';
export default function page() {
  // TODO 내정보에 내 댓글, 내 포스트?(Blog List 메뉴로 갈수도 있음)
  const [formData, setFormData] = useState(null);
  const { user } = useUserStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const inputFields = [
    { label: '닉네임', id: 'nickname', key: 'nickname', type: 'text' },
    { label: '아이디', id: 'id', key: 'id', type: 'text' },
    { label: '블로그 제목', id: 'title', key: 'title', type: 'text' },
    { label: '직업?', id: 'job', key: 'job', type: 'text' },
  ];
  const uploadAndInsertImage = async (e) => {
    console.log(e.target.files);
    if (e.target.files === undefined) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const formatData = new FormData();
      formatData.append('image', file);

      try {
        const token = Cookies.get('authToken_blog');
        const response = await fetch(`${apiUrl}/store-blog-image`, {
          method: 'POST',
          body: formatData,
          headers: {
            Authorization: `Bearer ${token}`,
            // 'ContentType': 'multipart/form-data' // 이 헤더가 수동으로 설정되면 브라우저에서 경계값 을 설정하지 않으므로 주석 처리
          },
        });
        if (response.ok) {
          const { data } = await response.json();
          // handleInsertImage(data.original_url, data.file_name);
          setUser({
            ...user,
            my_profile_photo: data.original_url,
          });
        } else {
          alert('이미지 업로드에 실패했습니다.');
          console.log('Error uploading image:', response.statusText);
        }
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다.');
        console.log('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        id: user.id || '',
        title: user.title || '',
        job: user.job || '',
        pw: '',
      });
    }
  }, [user]); // 'user'가 변경될 때도 실행되도록 설정

  return (
    <div className="content-wrap">
      <div id="main" className="user-auth">
        <div className="user-auth-wrap info">
          <h3 className="main-title paperlogy">내 정보</h3>
          <span className="guide-title m-top20">
            수정할 정보를 선택하여 변경해주세요.
            <br />
            개인정보보호를 위하여 <br className="mob-br" /> 기존의 비밀번호를
            한번 더 입력해주세요.
          </span>
          <div className="profile">
            <div className="my_img">
              <img src={user?.my_profile_photo} alt="내 프로필 이미지" />
            </div>
            <div className="editBtn">
              <label
                htmlFor="fileInput"
                type="button"
                id="editButton"
                className="edit-Btn"
                onClick={uploadAndInsertImage}
              >
                <img
                  className="camera"
                  src="/img/myInfo/camera.svg"
                  alt="카메라 아이콘"
                />
                <div className="edit-text">편집</div>
              </label>
              <input
                className="file-input"
                type="file"
                id="fileInput"
                onChange={uploadAndInsertImage}
                accept="image/*"
              />
            </div>
          </div>
          <div className="input_wrap m-t-40">
            {/* TODO 반복문처리 */}
            {inputFields.map((field, index) => (
              <div
                className={`input_container ${index !== 0 ? 'm-t-20' : ''}`}
                key={field.id}
              >
                <span className="category">{field.label}</span>
                <div className="flex-mob">
                  <label htmlFor={field.id} className="input_title">
                    <input
                      className="input-01"
                      type={field.type}
                      id={field.id}
                      value={formData?.[field.key] || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value, // 상태 업데이트
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            ))}
            <div className="input_container m-t-20">
              <span className="category">비밀번호</span>
              <div className="flex-mob">
                <label htmlFor="pw" className="input_title">
                  <input className="input-01" type="password" id="pw" />
                </label>
                <button
                  className="btn-02"
                  type="button"
                  // onclick="showModal('changeModal')"
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
          <div className="btn_wrap m-t-50">
            <button
              type="button"
              className="btn-01"
              // onclick="showModal('quitModal')"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
      {/* {!!user && (
        <div>
          <h4>사용자 정보:</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
