import { DecoratorNode, $getNodeByKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';


// ▼▼▼ React 컴포넌트 (데코레이션용) ▼▼▼
function FileComponent({ data, nodeKey }) {
  const [editor] = useLexicalComposerContext();
  const handleRemove = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) node.remove();
    });
  };
  return (
    <div className="file-container" >

      <div className="attachment-header">
        <button onClick={handleRemove}>×</button>

        <div className="flex attachment-list">
          <ul className="file-title">
            <li className="forder text">
              <img
                className="img-file left"
                src="/img/edit/folder.png"
                alt="첨부파일 아이콘"
              />
              <span className="file-text">
                첨부파일{' '}
                {/* <span className="file-numb file-count-text">2</span>개 */}
              </span>
            </li>
          </ul>
          <ul className="file-down">
            <a href={data.url} download={data.name}>
              <li className="all-download flex">
                다운로드
                <img
                  className="all-down-icon"
                  src="/img/edit/all-down.png"
                  alt="전체다운 아이콘"
                />
              </li>
            </a>
          </ul>
        </div>
        <div className="attachment-list">
          <ul className="item-container">
            <li className="attachment-item">
              <a href={data.url} download={data.name}>
                <span className="paper-title">{data.name}</span>
                <span className="download">
                  <img className="img-file down-img" src="/img/edit/all-down.png" alt="다운로드 아이콘" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ▼▼▼ FileNode 클래스 ▼▼▼
export class FileNode extends DecoratorNode {
  __data;

  static getType() {
    return 'file-node';
  }

  static clone(node) {
    return new FileNode(node.__data, node.__key);
  }

  constructor(data, key) {
    super(key);
    this.__data = data;
  }

  // ▼▼▼ 추가: 커서 격리 해제 ▼▼▼
  isIsolated() {
    return false;
  }
  // ▼▼▼ 추가: 인라인 노드로 설정 ▼▼▼
  isInline() {
    return true;
  }

  // ▼▼▼ DOM 생성 및 업데이트 ▼▼▼
  createDOM() {
    const div = document.createElement('div');
    div.className = 'file-node';
    return div;
  }

  updateDOM() {
    return false; // React 컴포넌트가 렌더링하므로 DOM 직접 업데이트 불필요
  }

  // ▼▼▼ React 컴포넌트 렌더링 ▼▼▼
  decorate() {
    return (
      <FileComponent
        data={this.__data}
        nodeKey={this.getKey()}
      />
    );
  }

  exportDOM(editor) {
    const container = document.createElement('div');
    container.className = 'file-container';

    const header = document.createElement('div');
    header.className = 'attachment-header';

    const flexList = document.createElement('div');
    flexList.className = 'flex attachment-list';

    // 파일 제목 섹션
    const fileTitle = document.createElement('ul');
    fileTitle.className = 'file-title';

    const folderItem = document.createElement('li');
    folderItem.className = 'forder text';

    const folderImg = document.createElement('img');
    folderImg.className = 'img-file left';
    folderImg.src = '/img/edit/folder.png';
    folderImg.alt = '첨부파일 아이콘';

    const fileText = document.createElement('span');
    fileText.className = 'file-text';
    fileText.textContent = '첨부파일 ';

    folderItem.appendChild(folderImg);
    folderItem.appendChild(fileText);
    fileTitle.appendChild(folderItem);

    // 다운로드 섹션
    const fileDown = document.createElement('ul');
    fileDown.className = 'file-down';

    const downloadLink = document.createElement('a');
    downloadLink.href = this.__data.url;
    downloadLink.download = this.__data.name;

    const allDownloadItem = document.createElement('li');
    allDownloadItem.className = 'all-download flex';
    allDownloadItem.textContent = '다운로드 ';

    const allDownIcon = document.createElement('img');
    allDownIcon.className = 'all-down-icon';
    allDownIcon.src = '/img/edit/all-down.png';
    allDownIcon.alt = '전체다운 아이콘';

    allDownloadItem.appendChild(allDownIcon);
    downloadLink.appendChild(allDownloadItem);
    fileDown.appendChild(downloadLink);

    flexList.appendChild(fileTitle);
    flexList.appendChild(fileDown);
    header.appendChild(flexList);

    // 첨부 파일 리스트 섹션
    const attachmentList = document.createElement('div');
    attachmentList.className = 'attachment-list';

    const itemContainer = document.createElement('ul');
    itemContainer.className = 'item-container';

    const attachmentItem = document.createElement('li');
    attachmentItem.className = 'attachment-item';

    const itemLink = document.createElement('a');
    itemLink.href = this.__data.url;
    itemLink.download = this.__data.name;

    const paperTitle = document.createElement('span');
    paperTitle.className = 'paper-title';
    paperTitle.textContent = this.__data.name;

    const downloadSpan = document.createElement('span');
    downloadSpan.className = 'download';

    const downImg = document.createElement('img');
    downImg.className = 'img-file down-img';
    downImg.src = '/img/edit/all-down.png';
    downImg.alt = '다운로드 아이콘';

    downloadSpan.appendChild(downImg);
    itemLink.appendChild(paperTitle);
    itemLink.appendChild(downloadSpan);

    attachmentItem.appendChild(itemLink);
    itemContainer.appendChild(attachmentItem);

    attachmentList.appendChild(itemContainer);

    header.appendChild(attachmentList);

    container.appendChild(header);

    return { element: container };
  }


  static importDOM() {
    return {
      div: (domNode) => {
        if (domNode.classList.contains('file-container')) {
          const headerNode = domNode.querySelector('.attachment-header');
          if (!headerNode) return null;

          const attachmentListNode =
            headerNode.querySelector('.attachment-list .attachment-item a');

          if (!attachmentListNode) return null;

          // 파일 이름과 URL 추출
          const name =
            attachmentListNode.querySelector('.paper-title')?.textContent || '';
          const url =
            attachmentListNode.getAttribute('href') || '';

          return {
            conversion: () => ({
              node: new FileNode({
                id: Date.now().toString(),
                name,
                url,
                size: null,
                type: null,
              }),
            }),
            priority: 1,
          };
        }
        return null;
      },
    };
  }


  // ▼▼▼ JSON 직렬화 (저장/불러오기) ▼▼▼
  static importJSON(serializedNode) {
    return new FileNode(serializedNode.data);
  }

  exportJSON() {
    return {
      type: 'file-node',
      version: 1,
      data: this.__data,
    };
  }

  // ▼▼▼ 텍스트 표현 ▼▼▼
  getTextContent() {
    return `[File Attachment: ${this.__data.name}]`;
  }
}


// ▼▼▼ 노드 등록 헬퍼 ▼▼▼
export function $createFileNode(data) {
  return new FileNode(data);
}

export function $isFileNode(node) {
  return node instanceof FileNode;
}
