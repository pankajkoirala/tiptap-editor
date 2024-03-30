export const EditorContainer = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div
    style={{
      display: "flex",
      height: "100%",
      gap: "4px",
      flexDirection: "column",
      backgroundColor: "#FFFF",
      borderRadius: "4px",
      border: "1px solid #E5E5E5",
    }}
  >
    {children}
  </div>
)
