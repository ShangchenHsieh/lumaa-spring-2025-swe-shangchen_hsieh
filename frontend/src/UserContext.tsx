import React, { createContext, useState, useEffect, ReactNode } from "react";


interface UserContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    // Listen for changes in the localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            // Only update if localStorage has a new token
            setToken(localStorage.getItem("token"));
        };

        // Attach the event listener to the 'storage' event
        window.addEventListener("storage", handleStorageChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Ensure that when token changes, it's updated in localStorage
    useEffect(() => {
        if (token !== null) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};
