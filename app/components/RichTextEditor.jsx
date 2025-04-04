'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { VerticalToolbarPlugin } from '@/plugin/lexical/VerticalToolbarPlugin';
import { ImageNode } from '@/plugin/lexical/ImageNode';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LinkNode } from '@lexical/link';
import { ImagePlugin } from '@/plugin/lexical/ImagePlugin';
import { useState } from 'react';
import LinkButtonPlugin from '@/plugin/lexical/LinkButtonPlugin';
const editorConfig = {
  namespace: 'MyEditor',
  theme: {
    text: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
    },
    list: {
      ul: 'ul-list',
      ol: 'ol-list',
      nested: {
        ul: 'ul-li',
        ol: 'ol-li',
      },
    },
  },
  onError(error) {
    console.error('Lexical Error:', error);
  },
  nodes: [ImageNode, ListNode, ListItemNode, LinkNode],
};

export default function RichTextEditor() {
  const [titleColorBoxFlag, setTitleColorBoxFlag] = useState(false);
  const [titleColor, setTitleColor] = useState('#000000');
  const titleColorList = [
    { className: 'color-default', color: '#000000' },
    { className: 'color-title', color: '#FDCC32' },
    { className: 'color-a', color: '#727272' },
    { className: 'color-b', color: '#EF3333' },
    { className: 'color-c', color: '#FF8329' },
    { className: 'color-white', color: '#FFFFFF' },
  ];
  const toggleColorBox = () => {
    setTitleColorBoxFlag((prev) => !prev);
  };
  const changeTitleColor = (e, type) => {
    const selectedOption = e.target.className.split(' ')[1]; // className에서 두 번째 클래스 이름을 가져옴
    const selectedColor = titleColorList.find((color) => {
      return color.className === selectedOption;
    });
    if (selectedColor) {
      if (type === 'title') {
        setTitleColor(selectedColor.color);
        setTitleColorBoxFlag(false); // 색상 선택 후 팝업 닫기
      }
    } else {
      console.error('Selected color not found in the list');
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div id="main">
        <div className="edit m-t-100">
          <div className="container">
            <div className="icon-bar">
              <ImagePlugin />
              <button type="button" className="video-btn icon-btn01">
                <div className="icon-bg">
                  <img src="/img/edit/video-icon.png" alt="영상 첨부 아이콘" />
                </div>
                <span className="icon-text f-14">영상 첨부</span>
              </button>
              <LinkButtonPlugin />
              <button type="button" className="place-btn icon-btn01">
                <div className="icon-bg">
                  <img src="/img/edit/place-icon.png" alt="장소 아이콘" />
                </div>
                <span className="icon-text f-14">장소</span>
              </button>
              <button type="button" className="file-btn icon-btn01">
                <div className="icon-bg">
                  <img src="/img/edit/file-icon.png" alt="파일 첨부 아이콘" />
                </div>
                <span className="icon-text f-14">파일 첨부</span>
              </button>
            </div>

            <div className="content">
              <div className="left-panel">
                <div className="title-container">
                  <textarea
                    className="edit-title"
                    style={{ color: `${titleColor}`, spellcheck: 'false' }}
                    placeholder="제목을 작성해 주세요."
                  ></textarea>
                  <div className="btn-area">
                    <button
                      type="button"
                      onClick={() => toggleColorBox()}
                      className="color-btn icon-btn01"
                    >
                      <div className="icon-bg">
                        <img
                          src="/img/edit/color-icon.png"
                          alt="제목 컬러 변경 아이콘"
                        />
                      </div>
                    </button>
                    <div
                      className="style-pop"
                      style={{
                        display: `${titleColorBoxFlag ? 'block' : 'none'}`,
                      }}
                    >
                      <ul className="array-box title-color">
                        <button
                          onClick={(e) => changeTitleColor(e, 'title')}
                          type="button"
                          className="pop-list"
                        >
                          <div className="circle color-default"></div>
                        </button>
                        <button
                          onClick={(e) => changeTitleColor(e, 'title')}
                          type="button"
                          className="pop-list"
                        >
                          <div className="circle color-title"></div>
                        </button>
                        <button
                          onClick={(e) => changeTitleColor(e, 'title')}
                          type="button"
                          className="pop-list"
                        >
                          <div className="circle color-b"></div>
                        </button>
                        <button
                          onClick={(e) => changeTitleColor(e, 'title')}
                          type="button"
                          className="pop-list"
                        >
                          <div className="circle color-c"></div>
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-area-border">
                  <div className=" text-area">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable
                          className="editor-input"
                          spellCheck={false}
                        />
                      }
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <ListPlugin />
                    <LinkPlugin />
                  </div>
                </div>
              </div>
              <VerticalToolbarPlugin />
            </div>
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
