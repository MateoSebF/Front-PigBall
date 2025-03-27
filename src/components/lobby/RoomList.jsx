"use client"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from "@mui/material"
import {
  SportsSoccer,
  Lock,
  Star,
  StarBorder,
  People,
  EmojiEvents,
  AccessTime,
} from "@mui/icons-material"
import { motion } from "framer-motion"


export default function RoomList({ gameRooms }) {
  const [rooms, setRooms] = useState(gameRooms);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const searchTerm = useState("");// const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setRooms(gameRooms);
  }, [gameRooms]);


  useEffect(() => {
    console.log("Updated Rooms:", rooms);

    // Filtrar salas según el término de búsqueda
    const filtered = rooms.filter(
      (room) =>
        room.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRooms(filtered); // ✅ Guardamos el resultado en el estado
  }, [rooms, searchTerm]); // ✅ Se ejecuta cuando `rooms` o `searchTerm` cambian


  // Alternar favorito
  const toggleFavorite = (id) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, isFavorite: !room.isFavorite } : room)))
  }

  // Obtener el color según el estado de la sala
  const getStatusColor = (status) => {
    switch (status) {
      case "En espera":
        return theme.palette.success.main
      case "En progreso":
        return theme.palette.warning.main
      case "Completa":
        return theme.palette.error.main
      default:
        return theme.palette.info.main
    }
  }

  // Obtener el icono según el tipo de juego
  const getGameTypeIcon = (gameType) => {

    switch (gameType) {
      case "Liga":
        return <EmojiEvents fontSize="small" />
      case "Torneo":
        return <SportsSoccer fontSize="small" />
      case "Amistoso":
        return <People fontSize="small" />
      case "Entrenamiento":
        return <AccessTime fontSize="small" />
      default:
        return <SportsSoccer fontSize="small" />
    }
  }

  const navigate = useNavigate();

  const joinGame = (roomId) => {
    navigate(`/game/${roomId}`);
  };

  return (
    <List sx={{
      overflow: "auto",
      maxHeight: "calc(100vh - 130px)",
      bgcolor: "#0e250f",
      "& .MuiListItem-root": {
        borderBottom: "1px solid #333",
      },
      "& .MuiListItemText-primary": {
        color: "white",
      },
      "& .MuiListItemText-secondary": {
        color: "rgba(255, 255, 255, 0.7)",
      },
      "&::-webkit-scrollbar": {
        width: "8px",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#0e250f",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#2a552c",
      },
    }}>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <React.Fragment key={room.id}>
            <ListItem
              component={motion.div}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              sx={{
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getStatusColor(room.status),
                    color: "white",
                  }}
                >
                  {getGameTypeIcon("Liga")}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                      {room.gameName}
                    </Typography>
                    {room.privateGame && <Lock fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 16 }} />}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" component="span" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Host: {room.creatorName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, flexWrap: "wrap" }}>
                      <Chip
                        label={`${room.players.length}/${room.maxPlayers}`}
                        size="small"
                        icon={<People fontSize="small" />}
                        sx={{
                          mr: 1,
                          mb: { xs: 0.5, sm: 0 },
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                      <Chip
                        label={room.status}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: { xs: 0.5, sm: 0 },
                          bgcolor: getStatusColor(room.status),
                          color: "white",
                        }}
                      />
                      <Typography
                        variant="caption"
                        component="span"
                        color="text.secondary"
                        sx={{
                          ml: "auto",
                          display: { xs: "none", sm: "block" },
                          color: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        {new Date(room.creationTime*1000).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                }
              />

              <ListItemSecondaryAction>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    edge="end"
                    onClick={() => toggleFavorite(room.id)}
                    sx={{ color: room.isFavorite ? "#FFD700" : "rgba(255, 255, 255, 0.5)" }}
                  >
                    {room.isFavorite ? <Star /> : <StarBorder />}
                  </IconButton>
                  <Button
                    onClick={() => joinGame(room.id)}
                    variant="contained"
                    size="small"
                    disabled={room.status === "Completa" || room.status === "En progreso"}
                    sx={{
                      ml: 1,
                      display: { xs: "none", sm: "inline-flex" },
                      bgcolor: "#4CAF50",
                      "&:hover": {
                        bgcolor: "#388E3C",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255, 255, 255, 0.27)",
                        color: "rgba(255, 255, 255, 0.49)",
                      },
                    }}
                  >
                    Join
                  </Button>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      ) : (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>No rooms were found that match your search.
          </Typography>
        </Box>
      )}
    </List>
  )

}

RoomList.propTypes = {
  gameRooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      creatorName: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired,
      maxPlayers: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["En espera", "En progreso", "Completa"]).isRequired,
      privateGame: PropTypes.bool.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      creationTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};
