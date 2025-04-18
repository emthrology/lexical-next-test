import { LinkNode, $createLinkNode } from '@lexical/link';
import { InlineStyleTextNode } from './InlineStyleTextNode';
import { $createTextNode } from 'lexical';

export class StyledLinkNode extends LinkNode {
  __style;

  constructor(url, { target, rel, style }, key) {
    super(url, { target, rel }, key);
    this.__style = style || 'text-decoration: underline;'; // 기본 스타일 설정
  }

  static getType() {
    return 'styled-link';
  }

  static clone(node) {
    return new StyledLinkNode(
      node.__url,
      { target: node.__target, rel: node.__rel, style: node.__style },
      node.__key
    );
  }

  static importDOM() {
    return {
      a: (domNode) => {
        if (domNode instanceof HTMLAnchorElement) {
          return {
            conversion: (element) => ({
              node: new StyledLinkNode(
                element.href,
                {
                  target: element.target,
                  rel: element.rel,
                  style: element.style.cssText
                }
              )
            }),
            priority: 1
          };
        }
        return null;
      }
    };
  }

  exportDOM(editor) {
    const { element } = super.exportDOM(editor);
    if (element) {
      element.style.cssText = this.__style;
    }

    return { element };
  }
}

export function $createStyledLinkNode(url, text, style) {
  const linkNode = new StyledLinkNode(url, {
    target: '_blank',
    rel: 'noopener',
    style: style || 'text-decoration: underline;'
  });
  // 텍스트 노드 생성 (스타일 적용)
  const textNode = new InlineStyleTextNode(
    text,
    style
  );
  // const textNode = $createTextNode(text);
  linkNode.append(textNode);
  return linkNode;
}