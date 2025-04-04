'use client';
import { useState } from 'react';
import BlogList from './components/BlogList';

export default function Home() {
  const [trendPage, setTrendPage] = useState(1);
  const [postPage, setPostPage] = useState(1);
  const handleLastPage = () => {
    alert('마지막 페이지에 도달했습니다!');
  };
  const addTrendPage = () => {
    setTrendPage((prev) => prev + 1);
  };
  const addPostPage = () => {
    setPostPage((prev) => prev + 1);
  };

  return (
    <>
      <div id="main" className="intro">
        <div className="sec1 m-t-50">
          <div className="subscriber-box m-t-50">
            <p>
              <span className="subscriber-count paperlogy">1,638명 </span> 해당
              블로그를 구독중입니다
            </p>
          </div>
          <h2 className="main-title paperlogy m-t-50">
            보통 날이네요, 어느새.
          </h2>
          <div className="profile-count-container">
            <div className="profile-box">
              <div className="profile-img">
                <img src="/img/profile.png" alt="프로필 사진" />
              </div>
              <div className="profile-text">
                <div className="nick-job-container">
                  <p className="nickname">휠소굳</p>
                  <p className="job-title">프로 여행러</p>
                </div>
                <p className="bio">
                  현실만을 믿는 삶이란 때론 더욱 불행할 수도 있지 그렇지 않은감
                </p>
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

        <div className="sec2 m-t-100">
          <h2 className="section-title">인기글</h2>

          {/* <LazyMainBlogList type="trend" :page="trendPage" @last-page="alertLast" /> */}
          <BlogList type="trend" page={trendPage} onLastPage={handleLastPage} />
          <button
            onClick={addTrendPage}
            type="button"
            className="load-more-btn btn-01"
          >
            더보기
          </button>
        </div>

        <div className="sec3 m-t-100">
          <h2 className="section-title">
            전체글 <span className="total yellow">1,356</span>개
          </h2>

          <div className="photo-box-container">
            {/* <LazyMainBlogList type="post" :page="postPage" @last-page="alertLast" /> */}
            <BlogList type="post" page={postPage} onLastPage={handleLastPage} />
          </div>
          <button
            onClick={addPostPage}
            type="button"
            className="load-more-btn btn-01"
          >
            더보기
          </button>
        </div>

        <div className="sec4 m-t-100">
          <h2 className="section-title">DECEMBER</h2>

          <div className="photo-box-container">
            <div className="photo-box">
              <a href="listDetail.html">
                <img src="/img/Desem01.png" alt="사진 1" />
                <div className="text-box">
                  <h3 className="post-title">서울 인기있는 맛집 베스트 10</h3>
                  <p className="post-date">2025.03.19</p>
                </div>
              </a>
            </div>
            <div className="photo-box">
              <a href="listDetail.html">
                <img src="/img/Desem02.png" alt="사진 2" />
                <div className="text-box">
                  <h3 className="post-title">
                    이탈리아에서의 일상 #93 - 2024년 크리스마스
                  </h3>
                  <p className="post-date">2025.03.19</p>
                </div>
              </a>
            </div>
            <div className="photo-box">
              <a href="listDetail.html">
                <img src="/img/Desem03.png" alt="사진 3" />
                <div className="text-box">
                  <h3 className="post-title">요즘 뜨는 카페 리스트</h3>
                  <p className="post-date">2025.03.19</p>
                </div>
              </a>
            </div>
            <div className="photo-box">
              <a href="listDetail.html">
                <img src="/img/Desem04.png" alt="사진 4" />
                <div className="text-box">
                  <h3 className="post-title">
                    대만여행, 코스트코, 치과, 그리고 늘고 있는 나의 김장 실력
                  </h3>
                  <p className="post-date">2025.03.19</p>
                </div>
              </a>
            </div>

            <div className="photo-box hidden">
              <img src="/img/Desem04.png" alt="사진 5" />
              <div className="text-box">
                <h3 className="post-title">핫한 브런치 맛집 모음</h3>
                <p className="post-date">2025.03.19</p>
              </div>
            </div>
            <div className="photo-box hidden">
              <img src="/img/Desem03.png" alt="사진 6" />
              <div className="text-box">
                <h3 className="post-title">데이트하기 좋은 카페</h3>
                <p className="post-date">2025.03.19</p>
              </div>
            </div>
            <div className="photo-box hidden">
              <img src="/img/Desem02.png" alt="사진 7" />
              <div className="text-box">
                <h3 className="post-title">서울 야경 명소 BEST</h3>
                <p className="post-date">2025.03.19</p>
              </div>
            </div>
            <div className="photo-box hidden">
              <img src="/img/Desem01.png" alt="사진 8" />
              <div className="text-box">
                <h3 className="post-title">전통시장 먹거리 탐방</h3>
                <p className="post-date">2025.03.19</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sec5 m-t-100">
          <div className="keyword-box">
            <div className="keyword-header">
              <p className="keyword-title">Keywords</p>
            </div>
            <div className="keyword-list">
              <div className="keyword-btn btn-03 radius-20">전국커피</div>
              <div className="keyword-btn btn-03 radius-20">이탈리아</div>
              <div className="keyword-btn btn-03 radius-20">맛집</div>
              <div className="keyword-btn btn-03 radius-20">주문진</div>
              <div className="keyword-btn btn-03 radius-20">분조카</div>
              <div className="keyword-btn btn-03 radius-20">한화 이글스</div>
              <div className="keyword-btn btn-03 radius-20">합정</div>
              <div className="keyword-btn btn-03 radius-20">연남동</div>
            </div>
          </div>

          <div className="follower-box">
            <div className="follower-header">
              <p className="follower-title">새로운 구독자</p>
            </div>
            <div className="follower-info">
              <p className="follower-count">
                총 <span className="follower-count-number yellow">8</span>명
              </p>
            </div>
            <div className="follower-profiles">
              <div className="follower-profile">
                <img
                  src="/img/profile01.png"
                  alt="방문자1"
                  className="profile-img"
                />
                <p className="profile-name">방문자1</p>
                <p className="profile-date">2025. 03. 19</p>
              </div>
              <div className="follower-profile">
                <img
                  src="/img/profile02.png"
                  alt="방문자2"
                  className="profile-img"
                />
                <p className="profile-name">방문자2</p>
                <p className="profile-date">2025. 03. 19</p>
              </div>
              <div className="follower-profile">
                <img
                  src="/img/profile03.png"
                  alt="방문자3"
                  className="profile-img"
                />
                <p className="profile-name">방문자3</p>
                <p className="profile-date">2025. 03. 19</p>
              </div>
              <div className="follower-profile">
                <img
                  src="/img/profile04.png"
                  alt="방문자4"
                  className="profile-img"
                />
                <p className="profile-name">방문자4</p>
                <p className="profile-date">2025. 03. 19</p>
              </div>
              <div className="follower-profile">
                <img
                  src="/img/profile05.png"
                  alt="방문자5"
                  className="profile-img"
                />
                <p className="profile-name">방문자5</p>
                <p className="profile-date">2025. 03. 19</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
