"use client"
import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  useTheme,
} from "@mui/material"
import {
  Add,
  Refresh,
  Search,
  Public,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import RoomList from '../../components/lobby/RoomList'
import { CreateRoom } from "../../components/lobby/CreateRoom"
import { getGames } from "../../APIServices/gameAPI"


export const Lobby = () => {
  const theme = useTheme()
  const [rooms, setRooms] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)

    const updateRooms = async () => {
      setRooms(await getGames())
      setIsRefreshing(false)
    }
    updateRooms()
  }
  function showForm() {
    setOpenCreateDialog(true);
  }
  function hideForm() {
    setOpenCreateDialog(false);
  }

  useEffect(() => {
    getGames()
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error getting games:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        p: { xs: 2, md: 3 },
      }}
    >
      <Paper
        elevation={8}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          maxWidth: 900,
          maxHeight: "calc(100vh - 90px)",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid #fff"
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "divider",
            borderBottom: "2px solid #4CAF50",
            background: "linear-gradient(to right,rgb(69, 138, 55),rgb(90, 153, 82))",
            color: "white"
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", }}>
            <Public sx={{ mr: 1 }} />
            Available Rooms
          </Typography>

          <Box>
            <Button
              variant="contained"
              onClick={showForm}
              startIcon={<Add />}
              sx={{
                mr: 1,
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "secondary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Create Room
            </Button>
            <IconButton
              color="primary"
              onClick={handleRefresh}
              disabled={isRefreshing}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {isRefreshing ? <CircularProgress size={24} sx={{ color: "secondary.main" }} /> : <Refresh />}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 2, borderColor: "divider", borderBottom: "2px solid #4CAF50", bgcolor: "rgb(75, 145, 61)" }}>
          <TextField
            fullWidth
            placeholder="Buscar sala por nombre, anfitrión o tipo..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.8)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />
        </Box>

        <RoomList gameRooms={rooms} />
        {/* Botones flotantes para móvil */}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleRefresh}
            disabled={isRefreshing}
            sx={{
              bgcolor: "white",
              boxShadow: 3,
              "&:hover": { bgcolor: "white" },
            }}
          >
            {isRefreshing ? <CircularProgress size={24} /> : <Refresh />}
          </IconButton>
          <IconButton
            color="primary"
            onClick={showForm}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              boxShadow: 3,
              "&:hover": { bgcolor: theme.palette.primary.dark },
            }}
          >
            <Add />
          </IconButton>
        </Box>
      </Paper>
      <CreateRoom OpenDialog={openCreateDialog} CloseDialog={hideForm} />
    </Box>
  )
}
