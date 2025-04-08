import { DecoratorNode } from 'lexical';

export class YoutubeNode extends DecoratorNode {
  __url;

  static getType() {
    return 'youtube';
  }

  static clone(node) {
    return new YoutubeNode(node.__url, node.__key);
  }

  constructor(url, key) {
    super(key);
    this.__url = url;
  }

  decorate() {
    const videoId = this.__url.split('v=')[1]?.split('&')[0];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 비율 유지
        height: 0,
        width: '100%', // 에디터 전체 너비 차지
        margin: '10px 0'
      }}>
        <iframe
          src={embedUrl}
          sandbox="allow-scripts allow-same-origin"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // createDOM(config) {
  //   const videoId = this.__url.split('v=')[1]?.split('&')[0];
  //   const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  //   const iframe = document.createElement('iframe');
  //   iframe.setAttribute('src', embedUrl);
  //   iframe.setAttribute('width', '560');
  //   iframe.setAttribute('height', '315');
  //   iframe.setAttribute('frameborder', '0');
  //   iframe.setAttribute(
  //     'allow',
  //     'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  //   );
  //   iframe.setAttribute('allowfullscreen', 'true');
  //   return iframe;
  // }
  createDOM() {
    const container = document.createElement('div'); // Create a container element
    container.style.display = 'block'; // Ensure it behaves like a block-level element
    return container;
  }
  updateDOM() {
    return false;
  }

  exportDOM() {
    const element = document.createElement('iframe');
    element.setAttribute('src', this.__url);
    element.setAttribute('width', '560');
    element.setAttribute('height', '315');
    element.setAttribute('frameborder', '0');
    element.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    );
    element.setAttribute('allowfullscreen', 'true');
    return { element };
  }
  importDOM() {
    return {
      iframe: (node) => {
        const src = node.getAttribute('src');
        return {
          node: new YoutubeNode(src),
          leave: true,
        };
      },
    };
  }

  exportJSON() {
    return {
      type: 'youtube',
      url: this.__url,
      version: 1,
    };
  }
}

export function $createYoutubeNode(url) {
  return new YoutubeNode(url);
}

export function $isYoutubeNode(node) {
  return node instanceof YoutubeNode;
}
