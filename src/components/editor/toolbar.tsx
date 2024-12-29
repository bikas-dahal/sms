// toolbar.tsx
'use client';

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { 
  $createHeadingNode,
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
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: any;
  label?: string;
  isActive?: boolean;
  disabled?: boolean;
}

const ToolbarButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  isActive = false,
  disabled = false 
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md hover:bg-gray-100 transition-colors duration-200
      flex items-center gap-1 text-sm
      ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
    title={label}
  >
    <Icon className="w-4 h-4" />
    {label && <span className="hidden sm:inline">{label}</span>}
  </button>
);

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  
  const formatText = (formatType: 'bold' | 'italic' | 'underline' | 'code') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  const formatAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  // History actions
  const undo = () => editor.dispatchCommand(UNDO_COMMAND, undefined);
  const redo = () => editor.dispatchCommand(REDO_COMMAND, undefined);

  // List actions
  const insertBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  // Insert link
  const insertLink = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const url = prompt('Enter URL:', 'https://');
      if (url) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'link');
      }
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex flex-wrap items-center gap-1 p-2">
        {/* History Controls */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
          <ToolbarButton icon={Undo} onClick={undo} label="Undo" />
          <ToolbarButton icon={Redo} onClick={redo} label="Redo" />
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <ToolbarButton 
            icon={Bold} 
            onClick={() => formatText('bold')} 
            label="Bold" 
          />
          <ToolbarButton 
            icon={Italic} 
            onClick={() => formatText('italic')} 
            label="Italic" 
          />
          <ToolbarButton 
            icon={Underline} 
            onClick={() => formatText('underline')} 
            label="Underline" 
          />
          <ToolbarButton 
            icon={Code} 
            onClick={() => formatText('code')} 
            label="Code" 
          />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <ToolbarButton 
            icon={AlignLeft} 
            onClick={() => formatAlignment('left')} 
            label="Left" 
          />
          <ToolbarButton 
            icon={AlignCenter} 
            onClick={() => formatAlignment('center')} 
            label="Center" 
          />
          <ToolbarButton 
            icon={AlignRight} 
            onClick={() => formatAlignment('right')} 
            label="Right" 
          />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <ToolbarButton 
            icon={Heading1} 
            onClick={() => formatHeading('h1')} 
            label="H1" 
          />
          <ToolbarButton 
            icon={Heading2} 
            onClick={() => formatHeading('h2')} 
            label="H2" 
          />
          <ToolbarButton 
            icon={Heading3} 
            onClick={() => formatHeading('h3')} 
            label="H3" 
          />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-200">
          <ToolbarButton 
            icon={List} 
            onClick={insertBulletList} 
            label="Bullet List" 
          />
          <ToolbarButton 
            icon={ListOrdered} 
            onClick={insertNumberedList} 
            label="Numbered List" 
          />
        </div>

        {/* Insert Options */}
        <div className="flex items-center gap-1 px-2">
          <ToolbarButton 
            icon={Link} 
            onClick={insertLink} 
            label="Insert Link" 
          />
          <ToolbarButton 
            icon={ImagePlus} 
            onClick={() => {}} 
            label="Insert Image" 
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}