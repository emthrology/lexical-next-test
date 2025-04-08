import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { $createYoutubeNode } from './YoutubeNode';

export const YoutubePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [linkUrl, setLinkUrl] = useState('');

  const openLinkModal = () => {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'block'; // 모달 표시
  }
  const closeModal = () => {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none'; // 모달 숨김
  }
  const isValidYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };
  const handleInsert = () => {
    if (isValidYouTubeUrl(linkUrl)) {
      editor.update(() => {
        const youTubeNode = $createYoutubeNode(linkUrl);
        const root = $getRoot();
        root.append(youTubeNode);
        // editor.insertNodes([youTubeNode]);
      });
      setLinkUrl('');
    } else {
      alert('유효한 YouTube URL이 아닙니다.'); // 유효하지 않은 URL 경고
    }
  };

  return (
    <>
      <button type="button" onClick={openLinkModal} className="link-btn icon-btn01">
        <div className="icon-bg">
          <img src="/img/edit/video-icon.png" alt="영상 첨부 아이콘" />
        </div>
        <span className="icon-text f-14">영상</span>
      </button>
      <div
        id="videoModal"
        className="link-modal"
        style={{ display: 'none' }}
      >
        <div className="modal-content" style={{ marginTop: 'calc(50vh - 200px)' }}>
          <span onClick={closeModal} className="close-btn">&times;</span>
          <h3 className="f-18">링크 입력</h3>
          <input
            className="border-ef m-t-20"
            type="url"
            id="linkURL"
            placeholder="URL 입력"
            onInput={(e) => setLinkUrl(e.target.value)}
          />
          <button onClick={handleInsert} className="btn-01 m-t-20" id="submitLink">
            입력
          </button>
        </div>
      </div >
    </>
  );
};
