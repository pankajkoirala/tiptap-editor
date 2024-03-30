import { Editor } from "@tiptap/react"
import { useCallback } from "react"
import { emoji } from "../../Assets/emoji"
import { EditorIcon } from "../IconWrapper"
import { IconGroupContainer } from "../Container/IconGroupContainer"
import { EmojiInput } from "../EmojiInput"
import { HeadingInput } from "../HeaderInput"
import { ColorInput } from "../ColorInput"
import { HeaderContainer } from "../Container/HeaderContainer"

export const EditorMenuBar = ({ editor }: { editor: Editor | null }) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL")

    if (url) {
      editor
        ?.chain()
        .focus()
        .setImage({
          src: url,
        })
        .run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt("Link")

    if (url) {
      editor?.commands.setLink({ href: url, target: "_blank" })
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <HeaderContainer>
      <IconGroupContainer>
        <EditorIcon
          isActive={editor.isActive("bold")}
          icon="Bold"
          onClick={editor.commands.toggleBold}
        />
        <EditorIcon
          isActive={editor.isActive("italic")}
          icon="Italic"
          onClick={editor.commands.toggleItalic}
        />
        <EditorIcon
          icon="Underline"
          isActive={editor.isActive("underline")}
          onClick={editor.commands.toggleUnderline}
        />
        <ColorInput
          onClick={(e) => {
            editor.chain().focus().setColor(e).run()
            editor.commands.focus()
          }}
        />
        <HeadingInput
          isActive={(e) => editor.isActive("heading", { level: e as any })}
          onClick={(e) => {
            editor
              .chain()
              .focus()
              .updateAttributes("heading", {
                style: "color: red; font-size: 24px;",
              })
              .run()

            editor
              .chain()
              .focus()
              .toggleHeading({ level: e as any })
              .run()
          }}
        />
        <EditorIcon
          icon="Highlighter"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
        />

        <EditorIcon
          icon="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        />
        <EditorIcon
          icon="Code2"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        />
      </IconGroupContainer>

      <IconGroupContainer>
        <EditorIcon
          isActive={editor.isActive({ textAlign: "left" })}
          icon="AlignLeft"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <EditorIcon
          isActive={editor.isActive({ textAlign: "center" })}
          icon="AlignCenter"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />

        <EditorIcon
          isActive={editor.isActive({ textAlign: "right" })}
          icon="AlignRight"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
        <EditorIcon
          isActive={editor.isActive({ textAlign: "justify" })}
          icon="AlignJustify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        />

        <EditorIcon
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
          icon="Pilcrow"
        />

        <EditorIcon
          onClick={() => editor.commands.toggleOrderedList()}
          isActive={editor.isActive("orderedList")}
          icon="ListOrdered"
        />

        <EditorIcon
          icon="List"
          onClick={() => editor.commands.toggleBulletList()}
          isActive={editor.isActive("bulletList")}
        />
      </IconGroupContainer>
      <IconGroupContainer>
        <EditorIcon icon="Image" onClick={addImage} />
        <EditorIcon icon="Link2" onClick={addLink} />
        <EmojiInput
          onClick={(e) => {
            editor.commands.insertContent(
              `<span style="font-size:48px">${emoji?.[e]}</span>`
            )
            editor.view.focus()
          }}
        />
        <EditorIcon
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          icon="Undo"
        />
        <EditorIcon
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          icon="Redo"
        />
      </IconGroupContainer>
    </HeaderContainer>
  )
}
