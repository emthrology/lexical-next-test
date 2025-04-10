'use client';
import Cookies from 'js-cookie';
import React, { use, useState, useEffect } from 'react';

export default function page({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = use(params);
  const blogId = id[0];
  const [blogData, setBlogData] = useState(null);
  const testHTML = `<p><br></p><a href="https://naver.com" target="_blank" rel="noopener noreferrer" dir="ltr"><span style="color: rgb(27, 168, 15); text-decoration: underline; font-family: MaruBuri; font-weight: bold; white-space: pre-wrap;">네이이이이버버버어어어어어</span></a><p><br></p><p dir="ltr"><span style="font-style: italic; font-weight: bold; white-space: pre-wrap;">다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오</span></p><p dir="ltr"><span style="white-space: pre-wrap;">다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오다 작성 후 스타일링을 하세요오오오오</span></p><ul class="ul-list"><li value="1" dir="ltr"><span style="white-space: pre-wrap;">항목1</span></li><li value="2" dir="ltr"><span style="white-space: pre-wrap;">항목2</span></li><li value="3" dir="ltr"><span style="white-space: pre-wrap;">항목3</span></li><li value="4" dir="ltr"><span style="white-space: pre-wrap;">항목4</span></li></ul><p dir="ltr"><br></p><div class="file-container"><div class="attachment-header"><div class="flex attachment-list"><ul class="file-title"><li class="forder text"><img class="img-file left" src="/img/edit/folder.png" alt="첨부파일 아이콘"><span class="file-text">첨부파일 </span></li></ul><ul class="file-down"><a href="blob:http://localhost:3000/c87410a7-f7ed-41d2-90df-303c98e5db17" download="19831002.png"><li class="all-download flex">다운로드 <img class="all-down-icon" src="/img/edit/all-down.png" alt="전체다운 아이콘"></li></a></ul></div><div class="attacnment-list"><ul class="item-container"><li class="attachment-item"><a href="blob:http://localhost:3000/c87410a7-f7ed-41d2-90df-303c98e5db17" download="19831002.png"><span class="paper-title">19831002.png</span><span class="download"><img class="img-file down-img" src="/img/edit/all-down.png" alt="다운로드 아이콘"></span></a></li></ul></div></div></div>`;
  useEffect(() => {
    // TODO api 에서 값 받아서 각 컴포넌트에 전달
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/${blogId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data, 333);
          setBlogData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  // TODO api 에서 값 받아서 각 컴포넌트에 전달
  return (
    <div className="content-wrap">
      <div id="main">
        <div className="detail m-t-100">
          <div className="container">
            <div className="detail-content">
              <div className="post-title yellow">{blogData?.data.title}</div>
              <div className="post-meta m-t-60">
                <span className="writer">맛거리(response.data.author)</span>
                <span className="date">{blogData?.data.created_at}</span>
              </div>

              <div className="post-body m-y-60">
                <div
                  className="post-text"
                  dangerouslySetInnerHTML={{ __html: blogData?.data.content }}
                >
                  {/* 안에 editor 결과물 넣기 */}
                </div>
              </div>
              {/* buttons */}
              <div className="btn-container m-t-50">
                <div className="keyword-list">
                  <div className="keyword-btn btn-03 radius-20">전국 카페</div>
                  <div className="keyword-btn btn-03 radius-20">카페 추천</div>
                  <div className="keyword-btn btn-03 radius-20">분좋카</div>
                  <div className="keyword-btn btn-03 radius-20">맛집</div>
                </div>

                <div className="btn-box">
                  <button className="like border-ef" type="button">
                    <img
                      className="like-change iconW-24"
                      src="/img/detail/like-before.png"
                      alt="하트 아이콘"
                    />
                    <span className="like-total">14</span>
                  </button>
                  <button className="share border-ef" type="button">
                    <img
                      className="iconW-24"
                      src="/img/detail/share.png"
                      alt="공유하기 아이콘"
                    />
                    <span className="share-total">14</span>
                  </button>
                </div>
              </div>
              <div className="comment-list m-t-40">
                <span className="list-total">
                  댓글
                  <span className="yellow"> 14</span>
                </span>
                {/* TODO 반복처리 */}
                <div className="comment-box">
                  <img
                    src="/img/detail/user-img.png"
                    alt="프로필 이미지"
                    className="user-img"
                  />
                  <div className="comment-content">
                    <span className="user-name">닉네임1</span>
                    <div className="comment-meta">2025.03.19</div>
                    <span className="comment comment-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eaque, sunt? Vitae assumenda hic porro maiores eum
                      laudantium repellat saepe molestias nobis cumque numquam
                      placeat doloribus impedit, iste nemo culpa vero?
                    </span>
                    <div className="btn-bottom">
                      <button className="f-14-b read-more">자세히 보기</button>
                      <button className="f-14-b reply">답글 달기</button>
                    </div>
                    <div className="reply-input-box">
                      <textarea
                        className="reply-input border-ef"
                        placeholder="답글을 입력해 주세요."
                      ></textarea>
                      <div className="btn-bottom">
                        <button className="reply-submit btn-02">등록</button>
                        <button className="reply-cancel btn-02">취소</button>
                      </div>
                    </div>
                  </div>
                  {/* TODO 점점점 버튼 */}
                  <button className="more border-ef">
                    <img
                      src="/img/detail/more.png"
                      alt="더보기 아이콘"
                      className="more-icon iconW-24"
                    />
                  </button>
                  <div className="more-menu ">
                    <button className="report">신고하기</button>
                    {/* TODO 본인이 쓴 글만 삭제 가능? */}
                    <button className="del">삭제하기</button>
                  </div>
                </div>

                {/* 댓글 입력 */}
                <div className="input-area">
                  <textarea
                    className="comment-input border-ef"
                    placeholder="댓글을 입력해주세요"
                  ></textarea>
                  <div className="input-area-btn">
                    <label htmlFor="secretCheck" className="custom-checkbox">
                      <input type="checkbox" id="secretCheck" />
                      <span className="checkmark"></span>
                    </label>
                    비밀글
                    <button className="regist-btn btn-02">등록하기</button>
                  </div>
                </div>

                {/* 구독 */}
                <div className="blog-author-card">
                  <div className="author-info">
                    <img
                      src="/img/detail/user-img1.png"
                      alt="프로필 이미지"
                      className="profile-img"
                    />
                    <div className="author-details">
                      <div className="author-name">
                        <span className="name">블로그 작가 이름</span>
                      </div>
                      <div className="category">뱃지 ? + #카테고리 분야</div>
                    </div>
                  </div>
                  <p className="author-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatibus. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, voluptatibus.
                  </p>
                  <button className="subscribe-btn btn-02 mob-hidden">
                    구독하기
                  </button>
                  <button className="subscribe-btn btn-02 hidden">구독</button>
                </div>
              </div>
            </div>

            {/* 우측 최신글/인기글 */}
            <div className="sidebar">
              {/* 인기글 */}
              <div className="best-list">
                <h2 className="sidebar-title">BEST3</h2>
                {/* TODO 반복 */}
                <div className="best-item">
                  <div className="thumbnail">
                    <img src="/img/sample.png" alt="음식" />
                    <span className="rank">1</span>
                  </div>
                  <div className="info">
                    <p className="title">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt odio atque dicta nulla maxime, saepe deleniti
                      explicabo doloremque voluptas expedita animi itaque,
                      mollitia illo nisi, ipsum necessitatibus modi voluptatem?
                      Nemo?
                    </p>
                    <p className="date">2025.03.19</p>
                  </div>
                </div>
              </div>

              {/* 최신글 */}
              <div className="latest-list m-t-90">
                <h2 className="sidebar-title">최신글</h2>
                {/* TODO 반복 */}
                <div className="best-item">
                  <div className="thumbnail">
                    <img src="/img/sample.png" alt="음식" />
                  </div>
                  <div className="info">
                    <p className="title">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt odio atque dicta nulla maxime, saepe deleniti
                      explicabo doloremque voluptas expedita animi itaque,
                      mollitia illo nisi, ipsum necessitatibus modi voluptatem?
                      Nemo?
                    </p>
                    <p className="date">2025.03.19</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
