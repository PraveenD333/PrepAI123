import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data);
            } catch (error) {
                console.error("User not Authenticated", error);
                // clearUser();
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const updateUser = async (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token) //Save the Token
        setLoading(false);
    }

    // const clearUser = () => {
    //     setUser(null);
    //     localStorage.removeItem("token");
    // };

    return (
        <UserContext.Provider value={{ user, loading, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;