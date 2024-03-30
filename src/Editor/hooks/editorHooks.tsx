import Heading from "@tiptap/extension-heading"
import { Resizeable } from "../Components/Resizable"

import Image from "@tiptap/extension-image"

import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"

const CustomImageNodeView = ({
  node,
  HTMLAttributes,
  updateAttributes,
}: {
  node: any
  HTMLAttributes: Record<string, string>
  updateAttributes: any
}) => {
  return (
    <NodeViewWrapper as={"span"}>
      <Resizeable
        defaultValue={{ y: node.attrs.height, x: node.attrs.width }}
        style={{ display: "inline-block" }}
        onChange={(e) =>
          updateAttributes({
            ...HTMLAttributes,
            height: e.y,
            width: e.x,
            style: `height:${e.y}px !important; width: ${e.x}px !important; display: inline-block;`,
          })
        }
      >
        <img
          {...HTMLAttributes}
          src={node?.attrs?.src}
          alt={node?.attrs?.alt || ""}
          style={{
            width: "100%",
            height: "100%",
            justifySelf: "end",
          }}
        />
      </Resizeable>
    </NodeViewWrapper>
  )
}

export const useEditorHooks = () => {
  const headingStyles = {
    1: "font-size: 32px;",
    2: "font-size: 28px;",
    3: "font-size: 24px;",
    4: "font-size: 20px;",
    5: "font-size: 16px;",
    6: "font-size: 14px;",
  }
  const customHeading = Heading.extend({
    addAttributes() {
      return {
        style: {
          default: null,
          // Take the attribute values
          renderHTML: (attributes) => {
            return {
              style: `${
                headingStyles?.[attributes?.level as keyof typeof headingStyles]
              }`,
            }
          },
        },
      }
    },
  })

  const CustomImage: any = Image.extend({
    name: "customImage",
    inline: true,
    group: "inline",
    selectable: true,
    draggable: true,

    addAttributes() {
      return {
        src: {
          default: null,
        },
        height: {
          default: null,
        },
        width: {
          default: null,
        },
        style: {
          default: null,
          // "height:100px !important; width:100px !important;display: inline-block;",
        },
        alt: {
          default: null,
        },
      }
    },

    addNodeView() {
      return ReactNodeViewRenderer(CustomImageNodeView)
    },
  })
  return { customHeading, CustomImage }
}
