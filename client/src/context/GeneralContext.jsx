import { createContext, useContext, useEffect, useState } from "react";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);

    const login = (userData, jwtToken) => {

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("token", jwtToken);

        setUser(userData);

        setToken(jwtToken);

    };

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

        setToken("");

    };

    return (

        <GeneralContext.Provider
            value={{
                user,
                token,
                loading,
                setLoading,
                login,
                logout
            }}
        >

            {children}

        </GeneralContext.Provider>

    );

};

export const useGeneral = () => useContext(GeneralContext);