import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const verifyHomePageVisit = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:5000/api/users/verify',
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setIsVerified(response.data.success);
        } catch (error) {
            console.error('Verification failed', error);
            setIsVerified(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyHomePageVisit();
    }, []);

    return (
        <StoreContext.Provider value={{ 
            isVerified, 
            isLoading,
            verifyHomePageVisit 
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };