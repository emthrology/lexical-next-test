import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { ImageNode } from '@/plugin/lexical/ImageNode';
export function ImagePlugin() {
  const [editor] = useLexicalComposerContext(); // 올바른 에디터 인스턴스 획득
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleInsertImage = (url, alt) => {
    // const url = 'https://postfiles.pstatic.net/MjAyNTA0MDFfNzQg/MDAxNzQzNTE4NzM5NjMw.fOvQi8wrgIzcA22Dv6AZ1pv0t5iBL9tmmdH0o_Bk_rEg.w4mCIxA19Og8FuW7NYCX-F57vFdL_mj4Di9pIP_npocg.JPEG/shinkawayua_art_20180809.jpg?type=w966';
    editor.update(() => {
      const imageNode = new ImageNode(
        url,
        alt || '',
      );
      // const root = editor.getRoot();
      const root = $getRoot();
      root.append(imageNode);
    });
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleInsertImage(reader.result); // Base64 데이터 URL 사용
        e.target.value = ''; // 1. 입력 값 초기화
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadAndInsertImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formatData = new FormData();
      formatData.append("image", file);

      try {
        const response = await fetch(`${apiUrl}/store-blog-image`, {
          method: 'POST',
          body: formatData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            // 'ContentType': 'multipart/form-data'
          }

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
  }
  return (
    <label
      htmlFor='image_file'
      type="button"
      onClick={uploadAndInsertImage}
      className="photo-btn icon-btn01"
    >
      <input type="file" id='image_file' accept="image/*" onChange={uploadAndInsertImage} style={{ display: 'none' }} />
      <div className="icon-bg">
        <img src="/img/edit/photo-icon.png" alt="사진 첨부 아이콘" />
      </div>
      <span className="icon-text f-14">사진 첨부</span>
    </label>
  );
}