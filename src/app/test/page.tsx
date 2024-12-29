'use client'

import Editor from '@/components/editor/editor';

export default function Page() {
  const handleEditorChange = (value: string) => {
    console.log('Editor content:', value);
  };

  return (
    <div className="container mx-auto p-4">
      <Editor onChange={handleEditorChange} />
    </div>
  );
}