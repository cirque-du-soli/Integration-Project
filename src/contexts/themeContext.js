import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext('');

export const useTheme = () => useContext(ThemeContext);
 
export const ThemeProvider = ({ children }) => {
     const[theme, setTheme] = useState('light'); // default theme

    const toggleTheme = (newTheme) => {
        setTheme(newTheme); 
    };

    // initially set the theme and apply changes to the HTML tag
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
