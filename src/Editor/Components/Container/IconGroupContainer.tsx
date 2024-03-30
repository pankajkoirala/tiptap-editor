export const IconGroupContainer = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div
    style={{
      display: "flex",
      height: "32px",
      gap: "8px",
      alignItems: "center",
    }}
  >
    {children}
  </div>
)
