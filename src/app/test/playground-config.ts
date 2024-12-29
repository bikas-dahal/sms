import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

const PlaygroundTheme = {
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "my-2",
  placeholder: "text-gray-400 absolute overflow-hidden select-none pointer-events-none",
  heading: {
    h1: "text-2xl font-bold",
    h2: "text-xl font-bold",
    h3: "text-lg font-bold",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    code: "bg-gray-100 px-1 py-0.5 rounded font-mono text-sm",
    strikethrough: "line-through",
    subscript: "vertical-align-sub",
    superscript: "vertical-align-super",
  },
  list: {
    nested: {
      listitem: "list-none ml-4",
    },
    ol: "list-decimal ml-4",
    ul: "list-disc ml-4",
    listitem: "ml-4",
  },
  // Add more theme styles as needed
};

const PlaygroundConfig = {
  namespace: 'Playground',
  theme: PlaygroundTheme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    LinkNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export { PlaygroundConfig, PlaygroundTheme };