import { type ReactNode, createContext, useEffect, useState, useCallback, useContext, useMemo } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  primeTheme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Hook personalizado para usar o contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_CONFIG = {
  light: {
    primeTheme: "saga-orange",
    dataTheme: "light"
  },
  dark: {
    primeTheme: "arya-orange",
    dataTheme: "dark"
  }
} as const;

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const currentThemeConfig = THEME_CONFIG[theme];
    
    document.documentElement.setAttribute("data-theme", currentThemeConfig.dataTheme);
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${theme}-theme`);

    const themeLinkId = "prime-theme";
    let themeLink = document.getElementById(themeLinkId) as HTMLLinkElement | null;

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = themeLinkId;
      themeLink.rel = "stylesheet";
      themeLink.type = "text/css";
      document.head.appendChild(themeLink);
    }

    themeLink.href = `/themes/${currentThemeConfig.primeTheme}/theme.css`;
    
    localStorage.setItem("theme", theme);
    localStorage.setItem("primeTheme", currentThemeConfig.primeTheme);

    themeLink.onload = () => {
      console.log(`Tema ${currentThemeConfig.primeTheme} carregado`);
    };
    
    themeLink.onerror = () => {
      console.error(`Erro ao carregar tema: ${currentThemeConfig.primeTheme}`);
      themeLink!.href = `/themes/saga-orange/theme.css`;
    };
    
  }, [theme]);

  const contextValue = useMemo(() => ({
    theme,
    primeTheme: THEME_CONFIG[theme].primeTheme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}