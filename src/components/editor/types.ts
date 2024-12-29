import { EditorState, LexicalEditor } from "lexical";

export interface EditorProps {
  defaultValue?: string;
  onChange?: (value: string, editor: LexicalEditor) => void;
}

export interface SerializedEditorState {
    root: {
      children: any[];
      direction: string | null;
      format: string;
      indent: number;
      type: string;
      version: number;
    };
  }