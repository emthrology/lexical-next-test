'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import useUserStore from '@/store/userStore';
export default function Header() {
  const { user, clearUser } = useUserStore();
  const [menuToggle, setMenuToggle] = useState(false);
  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  const isLoggdIn = user !== null;
  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };
  return (
    <>
      <header className="header">
        <div className="header-contain">
          <h1>
            <Link className="logo" href="/">
              BLOG SITE
            </Link>
          </h1>
          <div className="header-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="키워드를 입력하세요."
                className="search-input"
              />
              <button type="button" className="search-submit">
                <img src="/img/common/search2.png" alt="돋보기 이미지" />
              </button>
            </div>
            <button type="button" className="icon-area">
              <img
                src="/img/common/search.png"
                alt="돋보기 이미지"
                className="search-icon"
              />
              <img
                src="/img/common/close.png"
                alt="돋보기 이미지"
                className="close-icon"
              />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className="ham-box"
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
          <a href="index.html">
            <li className="panel-list">Home</li>
          </a>
          <a href="listDetail.html">
            <li className="panel-list">Blog List</li>
          </a>
          <a href="/post/edit">
            <li className="panel-list">Edit</li>
          </a>
          <a href="myInfo.html">
            <li className="panel-list">My Info</li>
          </a>
          <a
            className="log-in"
            href="/auth/login"
            style={{ display: isLoggdIn ? 'none' : 'block' }}
          >
            <li className="panel-list">Log In</li>
          </a>
          <a
            className="log-out"
            href="#"
            style={{ display: isLoggdIn ? 'block' : 'none' }}
            onClick={handleLogout}
          >
            <li className="panel-list">Log Out</li>
          </a>
        </ul>
      </div>
    </>
  );
}
