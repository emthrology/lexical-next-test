import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { CLEAR_HISTORY_COMMAND, $getRoot, $insertNodes } from 'lexical';
import { useLayoutEffect } from 'react';

export const SetInitialValuePlugin = ({ initHtml = '' }) => {
  const [editor] = useLexicalComposerContext();
  useLayoutEffect(() => {
    if (editor && initHtml) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initHtml, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.select();
        // root.insertNodes(nodes);
        $insertNodes(nodes);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, null);
      });
    }
  }, [initHtml]);
  return null;
};
