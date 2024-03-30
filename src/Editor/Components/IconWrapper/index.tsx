import * as icons from "lucide-react"
import { CSSProperties } from "react"
import { AlertOctagon } from "lucide-react"

export const EditorIcon = ({
  icon,
  isActive,
  disabled,
  onClick,
  style,
}: {
  icon: keyof typeof icons
  onClick?: () => void
  isActive?: boolean
  disabled?: boolean
  style?: CSSProperties
}) => {
  const LucideIcon = icons[icon] as icons.LucideIcon

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "0.5" : "1",
        backgroundColor: isActive ? "#E5E5E5" : "transparent",
        padding: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        ...style,
      }}
    >
      {LucideIcon ? (
        <LucideIcon style={{ height: "16px", width: "16px" }} />
      ) : (
        <AlertOctagon style={{ height: "16px", width: "16px" }} />
      )}
    </div>
  )
}
