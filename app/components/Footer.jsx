import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contain">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank">
            <img src="/img/common/facebook.png" alt="facebook" />
          </a>
          <a href="https://www.spacex.com" target="_blank">
            <img src="/img/common/xmark.png" alt="xmark" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img src="/img/common/instagram.png" alt="instagram" />
          </a>
          <a href="https://blog.naver.com" target="_blank">
            <img src="/img/common/blogger.png" alt="blogger" />
          </a>
          <a href="https://www.youtube.com" target="_blank">
            <img src="/img/common/youtube.png" alt="youtube" />
          </a>
          <a href="mailto:example@email.com">
            <img src="/img/common/email.png" alt="email" />
          </a>
        </div>

        <div className="footer-text">BlogStory Ⓒ 2025 Magazine Lab</div>
      </div>
    </footer>
  );
}
