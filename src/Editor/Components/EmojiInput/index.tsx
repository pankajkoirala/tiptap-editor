import { useState } from "react"
import { EditorIcon } from "../IconWrapper"
import { emoji } from "../../Assets/emoji"
import { useCloseOnOutsideClick } from "./../../hooks/useCloseOnClickOutside"

export const EmojiInput = ({ onClick }: { onClick?: (e: string) => void }) => {
  const [state, setState] = useState(false)
  const scope = useCloseOnOutsideClick(() => {
    setState(false)
  })

  return (
    <div style={{ position: "relative" }}>
      <EditorIcon
        onClick={() => setState(!state)}
        //  disabled={!editor.can().chain().focus().redo().run()}
        icon="Smile"
      />
      {state && (
        <div
          ref={scope}
          style={{
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            backgroundColor: "#FFFF",
            borderRadius: "4px",
            position: "absolute",
            zIndex: 9999,
            padding: "4px",
            top: "24px",
            transform: "translateX(-30%)",
            width: state ? "auto" : 0,
            height: state ? "auto" : 0,
            overflow: "hidden",
            transitionTimingFunction: "ease-in-out",
            userSelect: "none",
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            maxHeight: "250px",
            overflowY: "auto",
            gap: "4px",
          }}
        >
          {Object.keys(emoji).map((e) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => onClick && onClick(e)}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
