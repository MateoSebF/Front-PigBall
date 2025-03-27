import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import {Theme} from "../themes/Theme";
import { ThemeProvider} from "@mui/material/styles";
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * 
 */
export const Main = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Navbar />
            <Outlet />
        </ThemeProvider>
    );
};