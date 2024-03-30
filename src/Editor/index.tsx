import "./styles/editorStyles.css"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"

import { EditorContent, EditorEvents, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { EditorMenuBar } from "./Components/Header"
import { EditorContainer } from "./Components/Container/container"
import React, { CSSProperties } from "react"
import { useEditorHooks } from "./hooks/editorHooks"

const TipTapEditor = ({
  styles,
  onChange,
  HTMLvalue,
  isLoading,
  loadingComponent,
}: {
  styles?: CSSProperties
  onChange?: (e: string) => void
  HTMLvalue?: string
  isLoading?: boolean
  loadingComponent?: React.ReactNode
}) => {
  const { customHeading, CustomImage } = useEditorHooks()

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({
        types: [ListItem.name],
      } as any),

      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            style:
              "list-style-type: initial !important; padding-left: 1em !important;", // Apply the style directly
          },
        },
        orderedList: {
          HTMLAttributes: {
            style:
              "list-style-type: decimal !important; padding-left: 1em !important;", // Apply the style directly
          },
        },
      }),
      customHeading,
      Underline,
      Link.configure({
        protocols: ["ftp", "mailto"],

        autolink: false,
        HTMLAttributes: {
          style: "cursor: pointer;color: blue;", // Apply the style directly
        },
      }),
      CustomImage,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      Highlight,
    ],
    content: HTMLvalue ?? ``,

    onUpdate: ({ editor }: EditorEvents["update"]) => {
      const html = editor.getHTML()
      onChange && onChange(html)
    },
    editorProps: {
      handleDrop: function (event: any, moved: any) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          return true // handled
        }
        return false // not handled use default behaviour
      },
    },
  })

  return (
    <EditorContainer>
      <EditorMenuBar editor={editor} />
      {isLoading ? (
        <div
          style={{
            ...styles,
            width: "100%",
            textAlign: "center",
          }}
        >
          {loadingComponent ?? "Loading..."}
        </div>
      ) : (
        <EditorContent
          style={styles}
          className="tiptap-editor"
          editor={editor}
        />
      )}
    </EditorContainer>
  )
}

export default TipTapEditor
