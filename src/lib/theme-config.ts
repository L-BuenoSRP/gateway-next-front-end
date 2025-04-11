type ThemeType = "light" | "dark"

export const getInitialTheme = (): ThemeType => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeType
    if (savedTheme) return savedTheme
  }
  return "light"
}

export const saveTheme = (theme: ThemeType): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme)
  }
}
