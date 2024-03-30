export const HeaderContainer = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div
    style={{
      display: "flex",
      minHeight: "40px",
      padding: "0px 8px",
      columnGap: "24px",
      flexWrap: "wrap",
      alignItems: "center",
      borderBottom: "1px solid #E5E5E5",
    }}
  >
    {children}
  </div>
)
