// context/ThemeContext.tsx
import { type ReactNode, createContext, useEffect, useState, useCallback } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  primeTheme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_CONFIG = {
  light: {
    primeTheme: "mira",
    dataTheme: "light"
  },
  dark: {
    primeTheme: "bootstrap4-dark-blue", 
    dataTheme: "dark"
  }
} as const;

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "light" || saved === "dark") ? saved : "light";
  });

  const currentThemeConfig = THEME_CONFIG[theme];

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentThemeConfig.dataTheme);
    
    const themeLinkId = "prime-theme";
    let themeLink = document.getElementById(themeLinkId) as HTMLLinkElement | null;

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = themeLinkId;
      themeLink.rel = "stylesheet";
      document.head.appendChild(themeLink);
    }

    themeLink.href = `/node_modules/primereact/resources/themes/${currentThemeConfig.primeTheme}/theme.css`;
    
    localStorage.setItem("theme", theme);
    localStorage.setItem("primeTheme", currentThemeConfig.primeTheme);
  }, [theme, currentThemeConfig]);

  const contextValue: ThemeContextType = {
    theme,
    primeTheme: currentThemeConfig.primeTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}