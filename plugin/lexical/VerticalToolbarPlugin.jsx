import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { FontFamilyPlugin } from '@/plugin/lexical/FontFamilyPlugin';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import { $getSelection, $isRangeSelection, $isTextNode } from 'lexical';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $patchStyleText } from '@lexical/selection';
import usePostStore from '@/store/postStore';
import { useEffect, useState } from 'react';
// 세로 툴바 플러그인{
export function VerticalToolbarPlugin({ onSave }) {
  const { postTitle, postContent, setPostContent } = usePostStore();
  const [fontWeight, setFontWeight] = useState(null);
  const [fontItalic, setFontItalic] = useState(null);
  const [fontUnderline, setFontUnderline] = useState(null);
  const [fontStrike, setFontStrike] = useState(null);
  const [editor] = useLexicalComposerContext();
  const [activeBox, setActiveBox] = useState(null); // 현재 활성화된 박스의 타입

  const toggleBox = (type) => {
    setActiveBox((prev) => (prev === type ? null : type)); // 같은 버튼 클릭 시 비활성화
  };
  const applyAlignment = (alignment) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    editor.focus();
  };
  const insertUnorderedList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const removeList = () => {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  const handleFontStyleChange = (style, value) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // 선택된 텍스트에 font-size 스타일 적용
        $patchStyleText(selection, { [style]: value });
      }
    });
  };
  const handleFontStyleToggle = (event, style, value) => {
    editor.update(() => {
      const selection = $getSelection();
      let flag = null;
      if ($isRangeSelection(selection)) {
        switch (style) {
          case 'font-weight':
            setFontWeight((prev) => (prev === value ? null : value));
            flag = fontWeight;
            break;
          case 'font-style':
            setFontItalic((prev) => (prev === value ? null : value));
            flag = fontItalic;
            break;
          case 'text-decoration':
            switch (value) {
              case 'line-through':
                setFontStrike((prev) => (prev === value ? null : value));
                $patchStyleText(selection, { [style]: null });
                flag = fontStrike;
                break;
              case 'underline':
                setFontUnderline((prev) => (prev === value ? null : value));
                $patchStyleText(selection, { [style]: null });
                flag = fontUnderline;
                break;
            }
            break;
          default:
            break;
        }
        // 토글: 적용된 경우 제거, 아니면 추가
        $patchStyleText(selection, { [style]: flag });
      }
    });
  };

  const fontColors = [
    { color: '#727272', className: 'color-1' },
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
  const fontBackgroundColors = [
    { color: '#FFFFFF', className: 'color-none' },
    { color: '#FFE4E1', className: 'color-a' },
    { color: '#F0FFF0', className: 'color-b' },
    { color: '#E6F0FF', className: 'color-c' },
    { color: '#F0E6FF', className: 'color-d' },
    { color: '#FDF5E6', className: 'color-e' },
    { color: '#FFB6C1', className: 'color-f' },
    { color: '#8DDE8D', className: 'color-g' },
    { color: '#A0C6FF', className: 'color-h' },
    { color: '#D8BFD8', className: 'color-i' },
  ];
  // 그룹화: 한 줄에 5개의 버튼씩 묶음
  const groupedButtons = (buttons) =>
    buttons.reduce((acc, button, index) => {
      if (index % 5 === 0) acc.push([]); // 새로운 그룹 생성
      acc[acc.length - 1].push(button); // 현재 그룹에 버튼 추가
      return acc;
    }, []);

  const handleSaveButton = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      setPostContent(htmlString); // Zustand 상태 업데이트
    });
  };

  useEffect(() => {
    if (postContent) {
      onSave(); // postContent가 변경될 때만 실행
    }
  }, [postContent]); // 의존성 배열에 postContent 포함

  return (
    <div className="right-panel">
      <div className="style-flex-box first-box">
        {/* <FontFamilyPlugin /> */}
        <select
          onChange={(e) => handleFontStyleChange('font-family', e.target.value)}
          className="f-14"
        >
          <option value="Pretendard" className="pretendard">
            프리텐다드
          </option>
          <option value="Nanum Gothic" className="nanumgothic">
            나눔고딕
          </option>
          <option value="NanumBarunGothic" className="nanumbarungothic">
            나눔바른고딕
          </option>
          <option value="Nanum Myeongjo" className="nanummyeongjo">
            나눔명조
          </option>
          <option value="MaruBuri" className="maruburi">
            마루부리
          </option>
          {/* <option value="Paperlogy">Paperlogy</option> */}
        </select>
        <select
          defaultValue="18px"
          onChange={(e) => handleFontStyleChange('font-size', e.target.value)}
          className="f-14 w-r"
        >
          <option className="fs-22" value="22px">
            22px
          </option>
          <option className="fs-20" value="20px">
            20px
          </option>
          <option className="fs-18" value="18px">
            18px
          </option>
          <option className="fs-16" value="16px">
            16px
          </option>
        </select>
      </div>
      <div className="style-flex-box second-box">
        <button
          onClick={(e) => handleFontStyleToggle(e, 'font-weight', 'bold')}
          type="button"
          className="bold-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/blod-icon.png"
            alt="본문 폰트 굵기 아이콘"
          />
        </button>
        <button
          onClick={(e) => handleFontStyleToggle(e, 'font-style', 'italic')}
          type="button"
          className="italic-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/italic-icon.png"
            alt="본문 폰트 기울기 아이콘"
          />
        </button>
      </div>
      <div className="style-flex-box third-box">
        <button
          onClick={(e) =>
            handleFontStyleToggle(e, 'text-decoration', 'underline')
          }
          type="button"
          className="underline-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/underline-icon.png"
            alt="본문 폰트 밑줄 아이콘"
          />
        </button>
        <button
          onClick={(e) =>
            handleFontStyleToggle(e, 'text-decoration', 'line-through')
          }
          type="button"
          className="strike-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/strikeline-icon.png"
            alt="본문 폰트 취소선 아이콘"
          />
        </button>
      </div>
      <div className="style-flex-box four-box">
        <button
          // onClick={() => toggleColorBox('font')}
          onClick={() => toggleBox('color')}
          type="button"
          className="color-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/color-icon.png"
            alt="본문 폰트 컬러 아이콘"
          />
        </button>
        {/* font-color */}
        <div
          className="style-pop"
          style={{ display: `${activeBox == 'color' ? 'block' : 'none'}` }}
        >
          <ul className="array-box flex-direc">
            {groupedButtons(fontColors).map((colors, groupIndex) => (
              <div key={groupIndex} className="g-15 flex">
                {colors.map((item) => (
                  <button
                    key={item.className}
                    onClick={() => handleFontStyleChange('color', item.color)}
                    type="button"
                    className="pop-list"
                  >
                    <div className={`circle-color ${item.className}`}></div>
                  </button>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <button
          // onClick={() => toggleColorBox('background')}
          onClick={() => toggleBox('background')}
          type="button"
          className="backcolor-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/backcolor-icon.png"
            alt="본문 폰트 배경색 아이콘"
          />
        </button>
        {/* font-background-color */}
        <div
          className="style-pop"
          style={{ display: `${activeBox == 'background' ? 'block' : 'none'}` }}
        >
          <ul className="array-box flex-direc">
            {groupedButtons(fontBackgroundColors).map((colors, groupIndex) => (
              <div key={groupIndex} className="g-15 flex">
                {colors.map((item, itemIndex) => (
                  <button
                    key={item.className}
                    onClick={() =>
                      handleFontStyleChange('background', item.color)
                    }
                    type="button"
                    className="pop-list"
                  >
                    {groupIndex == 0 && itemIndex == 0 ? (
                      <img
                        className="array-img-20"
                        src="/img/edit/bg-none.png"
                        alt="배경없음 아이콘"
                      />
                    ) : (
                      <div className={`circle-color ${item.className}`}></div>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="style-flex-box five-box">
        <button
          type="button"
          onClick={() => toggleBox('align')}
          className="array-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/array-icon.png"
            alt="정렬 아이콘"
          />
        </button>
        {/* align */}
        <div
          className="style-pop"
          style={{ display: `${activeBox == 'align' ? 'block' : 'none'}` }}
        >
          <ul className="array-box">
            <button
              type="button"
              onClick={() => applyAlignment('left')}
              className="pop-list"
            >
              <img
                className="array-img"
                src="/img/edit/array-left.png"
                alt="왼쪽 정렬 아이콘"
              />
            </button>
            <button
              type="button"
              onClick={() => applyAlignment('center')}
              className="pop-list"
            >
              <img
                className="array-img"
                src="/img/edit/array-center.png"
                alt="가운데 정렬 아이콘"
              />
            </button>
            <button
              type="button"
              onClick={() => applyAlignment('right')}
              className="pop-list"
            >
              <img
                className="array-img"
                src="/img/edit/array-right.png"
                alt="오른쪽 정렬 아이콘"
              />
            </button>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => toggleBox('listStyle')}
          className="index-btn btn-04"
        >
          <img
            className="edit-img"
            src="/img/edit/index-icon.png"
            alt="리스트 스타일 아이콘"
          />
        </button>
        {/* list-style */}
        <div
          className="style-pop"
          style={{ display: `${activeBox == 'listStyle' ? 'block' : 'none'}` }}
        >
          <div className="style-pop">
            <ul className="array-box left-position">
              <button
                type="button"
                onClick={insertUnorderedList}
                className="pop-list"
              >
                <img
                  className="array-img"
                  src="/img/edit/list-dot.png"
                  alt="왼쪽 정렬 아이콘"
                />
              </button>
              <button
                type="button"
                onClick={insertOrderedList}
                className="pop-list"
              >
                <img
                  className="array-img"
                  src="/img/edit/list-num.png"
                  alt="가운데 정렬 아이콘"
                />
              </button>
              <button type="button" onClick={removeList} className="pop-list">
                <img
                  className="array-img"
                  src="/img/edit/list-none.png"
                  alt="오른쪽 정렬 아이콘"
                />
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="style-flex-box six-box m-t-20">
        <button type="button" className="btn-01 preview">
          미리보기
        </button>
        <button type="button" className="btn-01 save">
          임시저장
        </button>
      </div>
      <div className="style-flex-box last-box m-t-20">
        <button onClick={handleSaveButton} className="complete user-btn">
          완료
        </button>
      </div>
    </div>
  );
}
