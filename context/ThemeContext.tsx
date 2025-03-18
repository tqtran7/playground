import { createContext, ReactNode, useContext, useState } from "react";

enum Theme {
    Light,
    Dark
}

interface ThemeContext {
    theme: Theme,
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext|undefined>(undefined);

const ThemeContextProvider : React.FC<{ children: ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>(Theme.Light);

    const toggleTheme = () => {
        if (theme === Theme.Light) setTheme(Theme.Dark);
        else setTheme(Theme.Light);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context) return context;
    else {
        console.error('useTheme needs to be inside a themeContextProvider!');
    }
};
