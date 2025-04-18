'use client';
import { fetchData } from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
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
import { TextNode } from 'lexical';
import { LinkNode } from '@lexical/link';
import { StyledLinkNode } from '@/plugin/lexical/StyledLinkNode';
import { ImagePlugin } from '@/plugin/lexical/ImagePlugin';
import { FileNode } from '@/plugin/lexical/FileNode';
import { useState, useLayoutEffect } from 'react';

import usePostStore from '@/store/postStore';
import LinkButtonPlugin from '@/plugin/lexical/LinkButtonPlugin';
import FileAttachmentPlugin from '@/plugin/lexical/FileAttachmentPlugin';
import { SetInitialValuePlugin } from '@/plugin/lexical/SetInitialValutPlugin';
import { InlineStyleTextNode } from '@/plugin/lexical/InlineStyleTextNode';
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
  nodes: [
    ImageNode,
    ListNode,
    ListItemNode,
    StyledLinkNode,
    {
      replace: LinkNode,
      with: (node) =>
        new StyledLinkNode(node.__url, {
          target: node.__target,
          rel: node.__rel,
          style: node.__style,
        }),
    },
    InlineStyleTextNode,
    {
      replace: TextNode,
      with: (node) => new InlineStyleTextNode(node.__text, node.__style),
    },
    YoutubeNode,
    FileNode,
  ],
};

export default function RichTextEditor({ editData }) {
  // const editdata = editData;
  useLayoutEffect(() => {
    if (editData?.title) {
      setPostTitle(editData?.title);
    } else {
      setPostTitle('');
    }
  }, [editData?.content]);

  const router = useRouter();
  const { postContent, postTitle, setPostTitle } = usePostStore();
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
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('board', 'blog');
    formData.append('category', '36');
    formData.append('content', postContent);
    formData.append('public', '1');
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    try {
      const token = Cookies.get('authToken_blog');
      const data = await fetchData('blogs', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        // console.log('저장된 데이터:', data);
        alert('저장되었습니다.');
        router.push('/');
      }

      // const response = await fetch(`${apiUrl}/blogs`, {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // if (response.ok) {
      //   const { data } = await response.json();
      //   console.log('저장된 데이터:', data);
      //   alert('저장되었습니다.');
      // }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
      console.error('Error saving data:', error);
    }
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      {/* 초기값 세팅 플러그인은 여기! */}
      <SetInitialValuePlugin initHtml={editData?.content || ''} />
      <div id="main">
        <div className="edit m-t-40">
          <div className="container">
            <div className="icon-bar">
              <ImagePlugin />
              {/* <YoutubePlugin /> */}
              <button
                type="button"
                className="link-btn icon-btn01"
                onClick={() => {
                  alert('준비종입니다.');
                }}
              >
                <div className="icon-bg">
                  <img src="/img/edit/video-icon.png" alt="영상 아이콘" />
                </div>
                <span className="icon-text f-14">영상</span>
              </button>
              <LinkButtonPlugin />
              <button
                type="button"
                className="place-btn icon-btn01"
                onClick={() => {
                  alert('준비종입니다.');
                }}
              >
                <div className="icon-bg">
                  <img src="/img/edit/place-icon.png" alt="장소 아이콘" />
                </div>
                <span className="icon-text f-14">장소</span>
              </button>
              {/* <button type="button" className="file-btn icon-btn01">
                <div className="icon-bg">
                  <img src="/img/edit/file-icon.png" alt="파일 첨부 아이콘" />
                </div>
                <span className="icon-text f-14">파일 첨부</span>
              </button> */}
              <FileAttachmentPlugin />
            </div>

            <div className="content">
              <div className="left-panel">
                <div className="title-container">
                  <textarea
                    className="edit-title"
                    onChange={(e) => {
                      setPostTitle(e.target.value);
                    }}
                    value={postTitle}
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
              <VerticalToolbarPlugin onSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
