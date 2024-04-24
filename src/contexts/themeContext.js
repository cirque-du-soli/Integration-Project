import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('');

export const useTheme = () => useContext(ThemeContext);
 
export const ThemeProvider = ({ children }) => {
     const[theme, setTheme] = useState(null); // default theme

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
