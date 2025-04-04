import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $patchStyleText } from '@lexical/selection';
export function FontFamilyPlugin() {
  const [editor] = useLexicalComposerContext();

  const handleFontChange = (fontFamily) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // 선택된 텍스트에 font-family 스타일 적용
        $patchStyleText(selection, { "font-family": fontFamily });
      }
    });
  };

  return (
    <select onChange={(e) => handleFontChange(e.target.value)} className="f-14">
      <option value="Pretendard">프리텐다드</option>
      <option value="Nanum Gothic">나눔고딕</option>
      <option value="NanumBarunGothic">나눔바른고딕</option>
      <option value="Nanum Myeongjo">나눔명조</option>
      <option value="MaruBuri">마루부리</option>
      {/* <option value="Paperlogy">Paperlogy</option> */}
    </select>
  );
}
