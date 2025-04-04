'use client';
import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createLinkNode, } from '@lexical/link';
import { $getRoot, $createTextNode } from 'lexical';

export default function LinkButtonPlugin() {
  const [editor] = useLexicalComposerContext(); // 올바른 에디터 인스턴스 획득
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const openLinkModal = () => {
    const modal = document.getElementById('linkModal');
    modal.style.display = 'block'; // 모달 표시
  }
  const closeModal = () => {
    const modal = document.getElementById('linkModal');
    modal.style.display = 'none'; // 모달 숨김
  }
  const addLink = (text, url) => {
    editor.update(() => {
      const root = $getRoot(); // 에디터의 루트 노드 가져오기
      const linkNode = $createLinkNode(url); // 새 링크 노드 생성
      const textNode = $createTextNode(text); // 새 텍스트 노드 생성
      linkNode.append(textNode); // 텍스트를 링크에 추가
      root.append(linkNode); // 링크를 루트에 추가
    });
    setLinkLabel(''); // 링크명 초기화
    setLinkUrl(''); // URL 초기화
    closeModal(); // 모달 닫기

  };

  return (
    <>
      <button type="button" onClick={openLinkModal} className="link-btn icon-btn01">
        <div className="icon-bg">
          <img src="/img/edit/link-icon.png" alt="링크 아이콘" />
        </div>
        <span className="icon-text f-14">링크</span>
      </button>
      <div
        id="linkModal"
        className="link-modal"
        style={{ display: 'none' }}
      >
        <div className="modal-content" style={{ marginTop: 'calc(50vh - 200px)' }}>
          <span onClick={closeModal} className="close-btn">&times;</span>
          <h3 className="f-18">링크 입력</h3>
          <input
            className="border-ef m-t-40"
            type="text"
            id="linkName"
            placeholder="링크명 입력"
            onInput={(e) => setLinkLabel(e.target.value)}
          />
          <input
            className="border-ef m-t-20"
            type="url"
            id="linkURL"
            placeholder="URL 입력"
            onInput={(e) => setLinkUrl(e.target.value)}
          />
          <button onClick={() => addLink(linkLabel, linkUrl)} className="btn-01 m-t-20" id="submitLink">
            입력
          </button>
        </div>
      </div >
    </>
  );
}
