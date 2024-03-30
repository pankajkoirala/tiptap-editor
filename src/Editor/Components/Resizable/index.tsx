import { useState } from "react"
import { Maximize2 } from "lucide-react"
import "./../../styles/editorStyles.css"
export function Resizeable({
  children,
  onChange,
  style,
  defaultValue,
  ...props
}: {
  children: React.ReactNode
  onChange?: (e: { x: number; y: number }) => void
  style?: any
  defaultValue: { x: number; y: number }
}) {
  const [size, setSize] = useState({
    x: defaultValue.x ?? 200,
    y: defaultValue.y ?? 200,
  })

  const handler = (mouseDownEvent: { pageX: any; pageY: any }) => {
    const startSize = size
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY }

    function onMouseMove(mouseMoveEvent: { pageX: number; pageY: number }) {
      setSize(() => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      }))
      onChange &&
        onChange({
          x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
          y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
        })
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove)
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove)
    document.body.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return (
    <span
      {...props}
      style={{
        display: "inline-block",
        width: size.x,
        height: size.y,
        position: "relative",
      }}
    >
      {children}
      <Maximize2
        style={{
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "20px",
          width: "20px",
          zIndex: 9999,
          transform: "rotate(90deg)",
        }}
        id="draghandle"
        type="button"
        onMouseDown={handler}
      />
    </span>
  )
}
