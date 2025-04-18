'use client';
import Cookies from 'js-cookie';
import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';
import Reply from '@/app/components/blogs/Reply';
import DotbtnModals from '@/app/components/blogs/DotbtnModals';
import BlogList from '@/app/components/blogs/BlogList';

export default function page({ params }) {
  const router = useRouter();
  const { user } = useUserStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = use(params);
  const blogId = id[0];
  const [blogData, setBlogData] = useState(null);
  const [toggleReport, setToggleReport] = useState(0);
  const [toggleDelete, setToggleDelete] = useState(0);
  const [toggleDotMenu, setToggleDotMenu] = useState(false);
  useEffect(() => {
    // TODO api 에서 값 받아서 각 컴포넌트에 전달
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/${blogId}`);
        if (response.ok) {
          const data = await response.json();
          setBlogData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (user) {
      setIsAuthor(user.id == 4);
    }
  }, [user]);

  const handleOnEdit = () => {
    router.push(`/blogs/edit?blogId=${blogId ?? ''}`);
    setToggleDotMenu(false);
  };
  const handleOnDelete = (commentId) => {
    // TODO 삭제하기
    setToggleDotMenu(false);
  };

  // 댓글 데이터를 상태로 관리
  // TODO delete dummy
  const [comments, setComments] = useState([
    {
      id: 1,
      userId: 4,
      author: '사용자1',
      profile_image: '/img/detail/user-img.png',
      created_at: '2025-04-10',
      comment: '이것은 첫 번째 댓글입니다.',
    },
    {
      id: 2,
      userId: 5,
      author: '사용자2',
      profile_image: '/img/detail/user-img1.png',
      created_at: '2025-04-09',
      comment: '이것은 두 번째 댓글입니다.',
      replies: [
        {
          id: 3,
          userId: 4,
          author: '사용자1',
          profile_image: '/img/detail/user-img.png',
          created_at: '2025-04-10',
          comment: '대댓글입니다.',
        },
        {
          id: 4,
          userId: 5,
          author: '사용자2',
          profile_image: '/img/detail/user-img1.png',
          created_at: '2025-04-10',
          comment: '대댓글2입니다.',
        },
      ],
    },
  ]);
  // TODO useEffect 로 상태 추적
  const totalLength = comments.reduce((acc, comment) => {
    const repliesLength = comment.replies ? comment.replies.length : 0; // replies가 있는 경우 길이를 추가
    return acc + 1 + repliesLength; // 현재 댓글 + 대댓글 길이
  }, 0);
  // TODO api 에서 값 받아서 각 컴포넌트에 전달
  return (
    <div className="content-wrap">
      <div id="main">
        <div className="detail m-t-100">
          <div className="container">
            <div className="detail-content">
              <div className="post-title yellow">
                {blogData?.data.title}
                {/* <button
                  className="more border-ef"
                  onClick={() => setToggleDotMenu(!toggleDotMenu)}
                >
                  <img
                    src="/img/detail/more.png"
                    alt="더보기 아이콘"
                    className="more-icon iconW-24"
                  />
                </button>
                <div className={`more-menu ${toggleDotMenu ? 'visible' : ''}`}>
                  <button
                    className="report"
                    onClick={() => handleOnEdit(blogData?.data.id)}
                  >
                    수정하기
                  </button>
                  {isAuthor && (
                    <button
                      className="del"
                      onClick={() => handleOnDelete(blogData?.data.id)}
                    >
                      삭제하기
                    </button>
                  )}
                </div> */}
              </div>
              <div className="post-meta m-t-60">
                <div>
                  <span className="writer">맛거리(response.data.author)</span>
                  <span className="date">{blogData?.data.created_at}</span>
                </div>

                {/* TODO 글쓴이만 수정삭제버튼이 보여야함, 즉 blog detail api 에 userId 가 있어야 대조 가능함 */}
                <div className="edit-btn-box">
                  <button
                    className="share edit-btn"
                    type="button"
                    onClick={() => handleOnEdit(blogData?.data.id)}
                  >
                    <img
                      className="iconW-24"
                      src="/img/detail/edit.png"
                      alt="수정 아이콘"
                    />
                    <span className="edit-txt">수정</span>
                  </button>
                  <button
                    className="share edit-btn"
                    type="button"
                    onClick={() => handleOnDelete(blogData?.data.id)}
                  >
                    <img
                      className="iconW-24"
                      src="/img/detail/trash.png"
                      alt="삭제 아이콘"
                    />
                    <span className="edit-txt">삭제</span>
                  </button>
                </div>
              </div>

              <div className="post-body m-y-60">
                <div
                  className="post-text"
                  dangerouslySetInnerHTML={{ __html: blogData?.data.content }}
                >
                  {/* 안에 editor 결과물 넣기 */}
                </div>
              </div>
              {/* keywords */}
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
                  <span className="yellow"> {totalLength}</span>
                </span>
                {/* 댓글 리스트 */}
                {comments.map((comment) => (
                  <Reply
                    key={comment.id}
                    props={comment}
                    isReplies={false}
                    onReport={(commentId) => setToggleReport(commentId)}
                    onDelete={(commentId) => setToggleDelete(commentId)}
                  >
                    <DotbtnModals
                      commentId={comment.id}
                      toggleReport={toggleReport}
                      toggleDelete={toggleDelete}
                    />
                  </Reply>
                ))}

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
                <BlogList type="trend" page={1} />
              </div>

              {/* 최신글 */}
              <div className="latest-list m-t-90">
                <h2 className="sidebar-title">최신글</h2>
                <BlogList type="post" page={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
