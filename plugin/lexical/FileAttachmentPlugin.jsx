import React, { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { $createFileNode } from './FileNode';

const FileAttachmentPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // ▼▼▼ 파일 업로드 핸들러 ▼▼▼
  const handleFileUpload = useCallback(
    (url, file) => {
      const reader = new FileReader();
      reader.onload = () => {
        editor.update(() => {
          const fileNode = $createFileNode({
            id: Date.now().toString(),
            name: file.name,
            url: url,
            size: file.size,
            type: file.type,
          });
          // $insertNodes([fileNode]);
          const root = $getRoot();
          root.append(fileNode);
        });
      };
      reader.readAsArrayBuffer(file);
    },
    [editor]
  );

  // ▼▼▼ Drag & Drop 핸들러 ▼▼▼
  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e, 333);
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const token = Cookies.get('authToken_blog');
          console.log(apiUrl, 'file upload');
          // TODO 파일 업로드 api URL
          const response = await fetch(`${apiUrl}/store-blog-image`, {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              // 'ContentType': 'multipart/form-data' // 이 헤더가 수동으로 설정되면 브라우저에서 경계값 을 설정하지 않으므로 주석 처리
            },
          });
          if (response.ok) {
            const { data } = await response.json();
            handleFileUpload(data.original_url, file);
          } else {
            alert('파일 업로드에 실패했습니다.');
            console.log('Error uploading image:', response.statusText);
          }
        } catch (error) {
          alert('파일 업로드 중 오류가 발생했습니다.');
          console.log('Error uploading image:', error);
        }
      }
      // if (files.length > 0) handleFileUpload(files);
    },
    [handleFileUpload]
  );

  return (
    <label
      htmlFor="file"
      className="file-btn icon-btn01"
      style={{ cursor: 'pointer' }} // 커서 포인터 추가
    >
      {/* 실제 파일 입력 요소 (숨김 처리) */}
      <input
        type="file"
        id="file"
        accept="*/*"
        // multiple
        onChange={handleClick}
        style={{ display: 'none' }}
      />

      {/* 커스텀 디자인 요소 */}
      <div className="icon-bg">
        <img src="/img/edit/file-icon.png" alt="파일 첨부 아이콘" />
      </div>
      <span className="icon-text f-14">파일 첨부</span>
    </label>
  );
};

export default FileAttachmentPlugin;
