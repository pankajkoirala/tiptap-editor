import { useState } from "react"
import { EditorIcon } from "../IconWrapper"
import { useCloseOnOutsideClick } from "./../../hooks/useCloseOnClickOutside"
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react"

export const HeadingInput = ({
  onClick,
  isActive,
}: {
  onClick?: (e: number) => void
  isActive?: (e: number) => boolean
}) => {
  const [state, setState] = useState(false)
  const scope = useCloseOnOutsideClick(() => {
    setState(false)
  })
  const heading = [
    { label: <Heading1 />, value: 1 },
    { label: <Heading2 />, value: 2 },
    { label: <Heading3 />, value: 3 },
    { label: <Heading4 />, value: 4 },
    { label: <Heading5 />, value: 5 },
    { label: <Heading6 />, value: 6 },
  ]

  return (
    <div style={{ position: "relative" }}>
      <EditorIcon
        isActive={isActive && heading.some((e) => isActive(e.value))}
        onClick={() => setState(!state)}
        //  disabled={!editor.can().chain().focus().redo().run()}
        icon="Heading"
      />
      {state && (
        <div
          ref={scope}
          style={{
            backgroundColor: "#FFFF",
            borderRadius: "8px",
            position: "absolute",
            zIndex: 9999,
            padding: "4px",
            top: "24px",
            width: state ? "auto" : 0,
            height: state ? "auto" : 0,
            overflow: "hidden",
            transitionTimingFunction: "ease-in-out",
            userSelect: "none",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "4px",
          }}
        >
          {heading.map((e) => (
            <div
              style={{
                cursor: "pointer",
                color: isActive && isActive(e.value) ? "red" : "",
              }}
              onClick={() => onClick && onClick(e.value)}
            >
              {e.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
