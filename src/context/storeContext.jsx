import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
        const initialize = async () => {
            await verifyHomePageVisit();
            if (localStorage.getItem("currentPage") === "test") {
                console.log("test");
                navigate("/test");
            }
            else if(localStorage.getItem('currentPage')==='result'){
                console.log("result");
                navigate("/result");
            }
        };

        initialize();
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