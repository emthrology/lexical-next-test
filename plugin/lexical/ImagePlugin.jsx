import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { ImageNode } from '@/plugin/lexical/ImageNode';
import Cookies from 'js-cookie';
export function ImagePlugin() {
  const [editor] = useLexicalComposerContext(); // 올바른 에디터 인스턴스 획득
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleInsertImage = (url, alt) => {
    editor.update(() => {
      const imageNode = new ImageNode(url, alt || '');
      const root = $getRoot();
      root.append(imageNode);
    });
  };
  const uploadAndInsertImage = async (e) => {
    console.log('uploadAndInsertImage, imageNode');
    if (e.target.files === undefined) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const formatData = new FormData();
      formatData.append('image', file);

      try {
        const token = Cookies.get('authToken_blog');
        const response = await fetch(`${apiUrl}/store-blog-image`, {
          method: 'POST',
          body: formatData,
          headers: {
            Authorization: `Bearer ${token}`,
            // 'ContentType': 'multipart/form-data' // 이 헤더가 수동으로 설정되면 브라우저에서 경계값 을 설정하지 않으므로 주석 처리
          },
        });
        if (response.ok) {
          const { data } = await response.json();
          handleInsertImage(data.original_url, data.file_name);
        } else {
          alert('이미지 업로드에 실패했습니다.');
          console.log('Error uploading image:', response.statusText);
        }
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다.');
        console.log('Error uploading image:', error);
      }
    }
  };
  return (
    <label
      htmlFor="image_file"
      type="button"
      onClick={uploadAndInsertImage}
      className="photo-btn icon-btn01"
    >
      <input
        type="file"
        id="image_file"
        accept="image/*"
        onChange={uploadAndInsertImage}
        style={{ display: 'none' }}
      />
      <div className="icon-bg">
        <img src="/img/edit/photo-icon.png" alt="사진 첨부 아이콘" />
      </div>
      <span className="icon-text f-14">사진 첨부</span>
    </label>
  );
}
