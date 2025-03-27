import React from 'react';
import { Box, Typography} from "@mui/material";
import { MicrosoftLoginButton } from '../../components/login/MicrosoftLoginButton';
import {Court} from '../../components/game/Court'

export const Login = () => {
  return (
    <>
        <Court />
      {/* Título */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Bungee Spice', sans-serif",
          fontSize: { xs: "80px", md: "180px" },
          fontWeight: "bold",
          textShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
          zIndex: 2,
          color: "white",
        }}
      >
        PIGBALL
      </Typography>

      {/* Balón */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          border: "3px solid black",
          backgroundColor: "white",
          zIndex: 2,
        }}
      />
      <MicrosoftLoginButton />
    </>
  );
};
