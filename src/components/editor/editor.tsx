'use client';

import { useCallback, useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import {
  HeadingNode,
  QuoteNode
} from "@lexical/rich-text";
import {
  ListItemNode,
  ListNode
} from "@lexical/list";
import {
  LinkNode,
  AutoLinkNode
} from "@lexical/link";
import {
  CodeNode,
  CodeHighlightNode
} from "@lexical/code";
import {
  TableNode,
  TableCellNode,
  TableRowNode
} from "@lexical/table";

import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  LexicalEditor
} from "lexical";

import { Toolbar } from "./toolbar";
import { theme } from "./theme";
import { EditorProps, SerializedEditorState } from "./types";

const nodes = [
  HeadingNode,
  QuoteNode,
  ListItemNode,
  ListNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode
];

export default function Editor({ defaultValue, onChange }: EditorProps) {
  const [editorState, setEditorState] = useState<EditorState>();

  // Initialize editor config
  const initialConfig = {
    namespace: "LexicalEditor",
    theme,
    nodes,
    onError: (error: Error) => {
      console.error(error);
    }
  };

  // Handle editor changes
  const handleEditorChange = useCallback(
    (state: EditorState, editor: LexicalEditor) => {
      setEditorState(state);

      // Get editor content as JSON
      state.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
        const jsonString = JSON.stringify(state.toJSON());
        
        // Log the content
        console.log('Editor Content:', {
          json: JSON.parse(jsonString),
          text: root.getTextContent(),
          selection: selection
        });

        // Call onChange prop if provided
        if (onChange) {
          onChange(jsonString, editor);
        }
      });
    },
    [onChange]
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full border rounded-lg overflow-hidden bg-white shadow-sm">
        <Toolbar />
        <div className="p-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="min-h-[200px] outline-none prose max-w-none"
              />
            }
            placeholder={
              <div className="absolute top-[72px] left-4 text-gray-400 pointer-events-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}