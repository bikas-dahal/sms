import React from 'react';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Code,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  List,
  Type,
  ChevronDown,
  TextSelect,
} from "lucide-react";

const ToolbarButton = ({ icon: Icon, label, onClick, isActive = false }) => (
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

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-gray-200 mx-1" />
);

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex flex-col w-full">
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center gap-1 p-1">
          {/* Undo/Redo */}
          <div className="flex items-center">
            <ToolbarButton icon={Undo} label="" />
            <ToolbarButton icon={Redo} label="" />
          </div>

          <ToolbarDivider />

          {/* List Types */}
          <ToolbarButton icon={List} label="Bulleted List" />

          <ToolbarDivider />

          {/* Font Family */}
          <ToolbarButton icon={Type} label="Arial" />

          {/* Font Size */}
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-sm">-</button>
            <span className="px-2 py-1 text-sm">15</span>
            <button className="px-2 py-1 text-sm">+</button>
          </div>

          <ToolbarDivider />

          {/* Text Formatting */}
          <div className="flex items-center">
            <ToolbarButton icon={Bold} label="" />
            <ToolbarButton icon={Italic} label="" />
            <ToolbarButton icon={Underline} label="" />
          </div>

          <ToolbarDivider />

          {/* Code and Link */}
          <div className="flex items-center">
            <ToolbarButton icon={Code} label="" />
            <ToolbarButton icon={Link2} label="" />
          </div>

          {/* Text Options */}
          <ToolbarButton icon={TextSelect} label="Aa" />

          {/* Insert */}
          <ToolbarButton icon={Plus} label="Insert" />

          {/* Alignment */}
          <ToolbarButton icon={AlignLeft} label="Left Align" />
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 min-h-[300px]">
        {/* Your LexicalRichTextPlugin would go here */}
      </div>

      {/* Bottom Debug Bar */}
      <div className="border-t border-gray-200 bg-gray-50 p-2 text-sm text-gray-600 flex justify-between">
        <div>root</div>
        <div className="flex gap-4">
          <button className="hover:text-gray-900">Export DOM</button>
          <button className="hover:text-gray-900">Time Travel</button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;