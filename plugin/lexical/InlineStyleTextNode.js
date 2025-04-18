import { TextNode } from 'lexical';

export class InlineStyleTextNode extends TextNode {
  __inlineStyle; // 텍스트의 인라인 스타일 (예: background-color)

  constructor(text, style, key) {
    super(text, key);
    this.__inlineStyle = style || '';
  }

  static getType() {
    return 'styled-text';
  }

  static clone(node) {
    return new InlineStyleTextNode(node.__text, node.__inlineStyle, node.__key);
  }
  // HTML → InlineStyleTextNode 변환
  static importDOM() {
    return {
      span: (domNode) => {
        if (domNode instanceof HTMLSpanElement) {
          return {
            conversion: (element) => ({
              node: new InlineStyleTextNode(
                element.textContent,
                element.style.cssText // span 스타일 추출
              )
            }),
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  exportDOM(editor) {
    const { element } = super.exportDOM(editor);
    if (element) { // ✅ element 존재 확인
      element.style.cssText = this.__style;
    }
    return { element };
  }

  // InlineStyleTextNode → HTML 변환
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cssText = this.__inlineStyle; // span 스타일 적용
    return dom;
  }
}

export function $createStyleTextNode(text, style) {
  return new InlineStyleTextNode(text, style);
}
