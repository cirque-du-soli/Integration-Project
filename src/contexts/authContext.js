import { createContext, useState } from "react";

export const AuthContext = createContext("");



/* 
// SOLI TEST:
export const AuthContext = createContext({});

export const Auth = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext; 

*/