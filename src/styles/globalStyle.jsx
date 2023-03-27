// burada oluşturduğumuz stylingleri istediğimiz yerde kullanabiliriz. mesela buton için yaptığımız stylingi butonda sx={btnStyle} şeklinde yaparız.

export const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
};

export const btnStyle = {
  cursor: "pointer",
  "&:hover": { color: "red" },
};
