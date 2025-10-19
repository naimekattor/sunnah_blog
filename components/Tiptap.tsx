"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { EditorToolbar } from "./editor/EditorToolbar";
interface TiptapProps {
  value: string;
  onChange: (richText: string) => void;
  placeholder?: string;
}

const Tiptap = ({ value, onChange, placeholder }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder || "Start writing..." }),
      Underline,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base focus:outline-none w-full",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full border border-gray-300 rounded-md">
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ minHeight: "200px" }}
        className="p-4"
      />
    </div>
  );
};

export default Tiptap;
