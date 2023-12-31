import React, { useContext, useState } from "react"

type AvailableThemes = 'dark' | 'white';

type ThemeContextValueType = {
    theme: AvailableThemes;
    changeTheme: (theme: AvailableThemes) => void;
};

const defaultContextTypeValue: ThemeContextValueType = {
    theme: 'dark',
    changeTheme: () => {},
};

export const useInitThemeContext = () => {
    const [theme, setTheme] = useState<AvailableThemes>('dark');
    const changeTheme = (newTheme: AvailableThemes) => {
        setTheme(() => newTheme);
    };
    return {
        theme,
        changeTheme,
    };
};

export const ThemeContext = React.createContext<ThemeContextValueType>(
    defaultContextTypeValue
);

export const useThemeContext = () => {
    const useThemContext = useContext(ThemeContext);
    return useThemContext;
};