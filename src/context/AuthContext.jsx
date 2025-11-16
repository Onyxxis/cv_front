import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
            setToken(savedToken);
            const payload = JSON.parse(atob(savedToken.split('.')[1]));
            setUser({
                user_id: payload.user_id,
                username: payload.username,
                email: payload.email,
                role: payload.role,
                ispremium: payload.ispremium
            });
        }
    }, []);

    const saveToken = (newToken) => {
        localStorage.setItem("access_token", newToken);
        setToken(newToken);
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setUser({
            user_id: payload.user_id,
            username: payload.username,
            email: payload.email,
            role: payload.role,
            ispremium: payload.ispremium
        });
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
