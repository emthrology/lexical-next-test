'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import useUserStore from '@/store/userStore';
export default function Header() {
  const { user, clearUser } = useUserStore();
  const [menuToggle, setMenuToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
    setSearchToggle(false); // 검색창 닫기
    if (!menuToggle) {
      // TODO searchInput useState 만들기
      // searchInput.value = '';
    }
  };
  const handleSearchClick = () => {
    setSearchToggle(!searchToggle);
    setMenuToggle(false); // 메뉴 닫기
  };
  const isLoggdIn = user !== null;
  const handleLogout = () => {
    setMenuToggle(false);
    // Clear user data in the application state
    clearUser();
    // Remove the authToken cookie by setting it with max-age=0
    document.cookie =
      'authToken_blog=; path=/; max-age=0; secure; samesite=strict';
    // Redirect to the home page
    window.location.href = '/';
  };
  return (
    <>
      <header className="header">
        <div className="header-contain">
          <h1>
            <Link className="logo" href="/">
              BLOG SERVICE TITLE
            </Link>
          </h1>
          <div className="header-right">
            <div className={`search-container ${searchToggle ? 'active' : ''}`}>
              <input
                type="text"
                placeholder="키워드를 입력하세요."
                className="search-input"
              />
              <button
                type="button"
                className="search-submit"
                onClick={() => {}}
              >
                <img src="/img/common/search2.png" alt="돋보기 이미지" />
              </button>
            </div>
            <button
              onClick={handleSearchClick}
              type="button"
              className="icon-area"
            >
              <img
                src="/img/common/search.png"
                alt="돋보기 이미지"
                className="search-icon"
                style={{ display: searchToggle ? 'none' : 'block' }}
              />
              <img
                src="/img/common/close.png"
                alt="돋보기 이미지"
                className="close-icon"
                style={{ display: searchToggle ? 'block' : 'none' }}
              />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className={`ham-box ${menuToggle ? 'active' : ''}`}
              id="menuBtn"
            >
              <span className="ham"></span>
              <span className="ham"></span>
              <span className="ham"></span>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`menu-panel ${menuToggle ? 'active' : ''}`}
        id="menuPanel"
      >
        <ul className="menu-list-box">
          <Link href="/" onClick={() => setMenuToggle(false)}>
            <li className="panel-list">Home</li>
          </Link>
          <a href="listDetail.html">
            <li className="panel-list">Blog List</li>
          </a>
          <Link href="/post/edit" onClick={() => setMenuToggle(false)}>
            <li className="panel-list">Edit</li>
          </Link>
          <Link href="/my-info" onClick={() => setMenuToggle(false)}>
            <li className="panel-list">My Info</li>
          </Link>
          <Link
            className="log-in"
            href="/auth/login"
            style={{ display: isLoggdIn ? 'none' : 'block' }}
            onClick={() => setMenuToggle(false)}
          >
            <li className="panel-list">Log In</li>
          </Link>
          <Link
            className="log-out"
            href="#"
            style={{ display: isLoggdIn ? 'block' : 'none' }}
            onClick={handleLogout}
          >
            <li className="panel-list">Log Out</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
