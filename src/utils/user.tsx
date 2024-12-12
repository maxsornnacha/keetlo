"use client";

import axios from "axios";

export const fetchLoginStatus = async (): Promise<{ loggedIn: boolean; user?: any }> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/status`, {
            withCredentials: true, // Send cookies with the request
        });

        if (response.status === 200 && response.data) {
            const { id, name, email, image } = response.data; 
            return {
                loggedIn: true,
                user: { id, name, email, image },
            };
        }
        return { loggedIn: false };
    } catch (error: any) {
        console.log("Error fetching login status:", error.response?.data || error.message);
        return { loggedIn: false };
    }
};

