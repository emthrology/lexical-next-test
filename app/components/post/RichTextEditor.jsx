'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { VerticalToolbarPlugin } from '@/plugin/lexical/VerticalToolbarPlugin';
import { ImageNode } from '@/plugin/lexical/ImageNode';
import { YoutubeNode } from '@/plugin/lexical/YoutubeNode';
import { YoutubePlugin } from '@/plugin/lexical/YoutubePlugin';
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
  nodes: [ImageNode, ListNode, ListItemNode, LinkNode, YoutubeNode],
};

export default function RichTextEditor() {
  const [titleColorBoxFlag, setTitleColorBoxFlag] = useState(false);
  const [titleColor, setTitleColor] = useState('#FDCC32');
  const titleColorList = [
    { color: '#292929', className: 'color-title' },
    { color: '#9D4C4C', className: 'color-2' },
    { color: '#F67E3B', className: 'color-3' },
    { color: '#1BA80F', className: 'color-4' },
    { color: '#6E31EE', className: 'color-5' },
    { color: '#727272', className: 'color-6' },
    { color: '#E7425F', className: 'color-7' },
    { color: '#FDCC32', className: 'color-8' },
    { color: '#317DEE', className: 'color-9' },
    { color: '#C50EB3', className: 'color-10' },
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
  // 그룹화: 한 줄에 5개의 버튼씩 묶음
  const groupedButtons = (buttons) =>
    buttons.reduce((acc, button, index) => {
      if (index % 5 === 0) acc.push([]); // 새로운 그룹 생성
      acc[acc.length - 1].push(button); // 현재 그룹에 버튼 추가
      return acc;
    }, []);
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div id="main">
        <div className="edit m-t-40">
          <div className="container">
            <div className="icon-bar">
              <ImagePlugin />
              <YoutubePlugin />
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
                    spellCheck={false}
                    style={{ color: `${titleColor}` }}
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
                      <ul className="array-box title-color flex-direc">
                        {groupedButtons(titleColorList).map(
                          (colors, groupIndex) => (
                            <div key={groupIndex} className="g-15 flex">
                              {colors.map((item) => (
                                <button
                                  key={item.className}
                                  onClick={
                                    (e) => changeTitleColor(e, 'title')
                                    // handleFontStyleChange('color', item.color)
                                  }
                                  type="button"
                                  className="pop-list"
                                >
                                  <div
                                    className={`circle-color ${item.className}`}
                                  ></div>
                                </button>
                              ))}
                            </div>
                          )
                        )}
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
