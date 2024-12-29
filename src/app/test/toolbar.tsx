'use client';

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  RangeSelection,
  NodeSelection,
  GridSelection,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { 
  $createHeadingNode, 
  $createQuoteNode,
  HeadingTagType 
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Code,
  Link2,
  AlignLeft,
  ChevronDown,
} from "lucide-react";

// Type for toolbar button props
interface ToolbarButtonProps {
  onClick: () => void;
  icon: any;
  label?: string;
  isActive?: boolean;
}

// Toolbar Button Component
const ToolbarButton = ({ icon: Icon, label, onClick, isActive = false }: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 flex items-center gap-1 text-sm ${
      isActive ? 'bg-gray-100' : ''
    }`}
    title={label}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label && <span>{label}</span>}
    {label && <ChevronDown className="w-3 h-3" />}
  </button>
);

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  // Text Formatting
  const formatText = (formatType: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  // Block Formatting
  const formatBlock = (formatType: string) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };

  // Heading Functions
  const createHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  // List Functions
  const createBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const createNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  // History Functions
  const undo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  // Font Size Functions
  const changeFontSize = (size: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Here we're using the selection API properly
        selection.formatText('fontSize', size);
      }
    });
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200">
      {/* History Controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={Undo} onClick={undo} label="" />
        <ToolbarButton icon={Redo} onClick={redo} label="" />
      </div>

      {/* Text Formatting */}
      <div className="flex items-center gap-1 border-l border-r border-gray-200 px-2">
        <ToolbarButton
          icon={Bold}
          onClick={() => formatText('bold')}
          label=""
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => formatText('italic')}
          label=""
        />
        <ToolbarButton
          icon={Underline}
          onClick={() => formatText('underline')}
          label=""
        />
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-1">
        <button 
          onClick={() => changeFontSize('smaller')}
          className="px-2 py-1 hover:bg-gray-100 rounded"
        >
          -
        </button>
        <span className="px-2">15</span>
        <button 
          onClick={() => changeFontSize('larger')}
          className="px-2 py-1 hover:bg-gray-100 rounded"
        >
          +
        </button>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 border-l border-gray-200 px-2">
        <button
          onClick={createBulletList}
          className="px-3 py-1 hover:bg-gray-100 rounded"
        >
          • List
        </button>
        <button
          onClick={createNumberedList}
          className="px-3 py-1 hover:bg-gray-100 rounded"
        >
          1. List
        </button>
      </div>
    </div>
  );
}