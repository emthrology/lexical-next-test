import React from 'react';
import { DecoratorNode } from 'lexical';

export class ImageNode extends DecoratorNode {
  constructor(src, alt, key) {
    super(key);
    this.__src = src;
    this.__alt = alt || '';
  }

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  // 중요: createDOM 메서드 구현
  createDOM() {
    // 플레이스홀더 요소 생성
    const div = document.createElement('div');
    div.style.display = 'contents'; // 레이아웃에 영향을 주지 않게 함
    return div;
  }

  updateDOM() {
    // 업데이트가 필요하지 않음
    return false;
  }

  // TODO exportDOM, importDOM 메서드 구현
  exportDOM() {
    // DOM 요소를 반환하는 메서드
    const element = document.createElement('img');
    element.className = 'm-t-50 post-image';
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__alt);
    return { element };
  }
  // importDOM() {
  //   // DOM 요소를 Lexical 노드로 변환하는 메서드
  //   return {
  //     img: (node) => {
  //       const src = node.getAttribute('src');
  //       const alt = node.getAttribute('alt');
  //       return {
  //         node: new ImageNode(src, alt),
  //         leave: true,
  //       };
  //     },
  //   };
  // }
  static importDOM() {
    return {
      img: (node) => ({
        conversion: (domNode) => {
          const img = domNode;
          return {
            node: new ImageNode(img.src, img.alt),
          };
        },
        priority: 1, // 변환 우선순위
      }),
    };
  }

  // 중요: decorate 메서드는 반드시 React 컴포넌트를 반환해야 함
  decorate() {
    return <ImageComponent src={this.__src} alt={this.__alt} nodeKey={this.getKey()} />;
  }

  // 기타 필요한 메서드들...
  // 직렬화 메서드 구현
  exportJSON() {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
    };
  }

  // 역직렬화 메서드 구현
  static importJSON(serializedNode) {
    const { src, alt } = serializedNode;
    return new ImageNode(src, alt);
  }

}

// 별도의 컴포넌트로 분리하는 것이 좋습니다
function ImageComponent({ src, alt, nodeKey }) {
  return (
    <img
      src={src}
      alt={alt}
      data-lexical-node-key={nodeKey}
      style={{ maxWidth: '100%', objectFit: 'cover', height: 'auto' }} // 스타일을 추가하여 이미지 크기를 조정
    />
  );
}
