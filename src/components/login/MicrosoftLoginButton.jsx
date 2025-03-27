import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import Button from "@mui/material/Button";


export const MicrosoftLoginButton = () => {
    const { instance } = useMsal();
    const handleLogin = async () => {
            instance.loginPopup(loginRequest).catch((e) => console.error(e));
    };

    return (
        <Button
            variant="contained"
            onClick={handleLogin}
            startIcon={
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#00A4EF"/>
                <rect x="1" y="11" width="9" height="9" fill="#7FBA00"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
            }
            sx={{
                position: "absolute",
                top: { xs: "25%", md: "38%" },
                left: "50%",
                transform: "translateX(-50%)",
                width: { xs: "200px", md: "300px" },
                backgroundColor: "#e78a65",
                border: "2px solid #b03737",
                "&:hover": {
                    backgroundColor: "#d06d50",
                },
                zIndex: 2,
                fontSize: { xs: "10px", md: "15px" }
            }}
        >
            Sign in with Microsoft
        </Button>
    );
};