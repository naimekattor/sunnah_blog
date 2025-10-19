"use client";

import { Editor } from "@tiptap/react";
/* Local, minimal implementations of toolbar controls to avoid importing from an empty module */
const BoldButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}>
      <strong>B</strong>
    </ToolbarButton>
  );
};

const ItalicButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}>
      <em>I</em>
    </ToolbarButton>
  );
};

const UnderlineButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleUnderline().run()}
    >
      <u>U</u>
    </ToolbarButton>
  );
};

const StrikeButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()}>
      <s>S</s>
    </ToolbarButton>
  );
};

const LinkEditorPanel = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  const handle = () => {
    const url = window.prompt("Enter a URL");
    if (!url) return;
    // setLink may vary depending on your TipTap setup; adjust if needed
    // if empty url, remove link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  return <ToolbarButton onClick={handle}>Link</ToolbarButton>;
};

const ListButtons = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>
    </>
  );
};

const BlockquoteButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
    >
      "
    </ToolbarButton>
  );
};

const CodeBlockButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
    >
      {"</>"}
    </ToolbarButton>
  );
};

const HeadingButtons = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        P
      </ToolbarButton>
    </>
  );
};

const ImageUploader = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    // setImage may vary depending on your TipTap setup; adjust if needed
    editor.chain().focus().setImage({ src: url }).run();
  };
  return (
    <label className="p-1 rounded-md hover:bg-gray-200 cursor-pointer">
      Add
      <input
        onChange={onChange}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </label>
  );
};

const UndoButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
      ↶
    </ToolbarButton>
  );
};

const RedoButton = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
      ↷
    </ToolbarButton>
  );
};
import {
  Superscript,
  Subscript,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
} from "lucide-react";

// A small component for the vertical separator line
const Separator = () => <div className="w-px bg-gray-300 h-6 mx-2" />;

// A simple button wrapper for custom actions
const ToolbarButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="p-1 rounded-md hover:bg-gray-200"
  >
    {children}
  </button>
);

export const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center flex-wrap gap-1 p-2 border-b border-gray-300">
      <UndoButton editor={editor} />
      <RedoButton editor={editor} />
      <Separator />

      <HeadingButtons editor={editor} />
      <Separator />

      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <UnderlineButton editor={editor} />
      <StrikeButton editor={editor} />
      <LinkEditorPanel editor={editor} />
      <Separator />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
      >
        <Superscript className="w-5 h-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleSubscript().run()}
      >
        <Subscript className="w-5 h-5" />
      </ToolbarButton>
      <Separator />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="w-5 h-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="w-5 h-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="w-5 h-5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="w-5 h-5" />
      </ToolbarButton>
      <Separator />

      <ListButtons editor={editor} />
      <BlockquoteButton editor={editor} />
      <CodeBlockButton editor={editor} />
      <Separator />

      {/* This "Add" button is for images */}
      <ImageUploader editor={editor} />
    </div>
  );
};
