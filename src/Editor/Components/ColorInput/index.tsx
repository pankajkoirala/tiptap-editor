import { useState } from "react"
import { EditorIcon } from "../IconWrapper"
import { colors } from "../../Assets/colors"
import { useCloseOnOutsideClick } from "./../../hooks/useCloseOnClickOutside"

export const ColorInput = ({ onClick }: { onClick?: (e: string) => void }) => {
  const [state, setState] = useState(false)
  const [color, setColor] = useState("black")

  const scope = useCloseOnOutsideClick(() => {
    setState(false)
  })

  return (
    <div style={{ position: "relative" }}>
      <EditorIcon
        style={{ color: color }}
        onClick={() => setState(!state)}
        //  disabled={!editor.can().chain().focus().redo().run()}

        icon="Baseline"
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
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "4px",
          }}
        >
          {colors.map((e) => (
            <div
              style={{
                cursor: "pointer",
                height: "16px",
                width: "16px",
                borderRadius: "4px",
                backgroundColor: e.hex,
              }}
              onClick={() => {
                setColor(e.hex)
                onClick && onClick(e.hex)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
