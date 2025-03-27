"use client"
import PropTypes from 'prop-types';

import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField as MuiTextField,
  Slider,
  FormHelperText,
} from "@mui/material"
import {
  SportsSoccer,
  Lock,
  Close,
  Check,
  Groups,
  Public,
} from "@mui/icons-material"
import {createRoom} from "../../APIServices/gameAPI"
import { usePlayerStats } from "../../components/user/playerStats";

export const CreateRoom = ({OpenDialog,CloseDialog}) => {
    const playerStats = usePlayerStats();
    const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [newRoom, setNewRoom] = useState({
      name: "",
      isPrivate: false,
      maxPlayers: 8,
      gameType: "Amistoso",
      description: "",
    })
    const [formErrors, setFormErrors] = useState({
      name: false,
    })
    const handleCloseCreateDialog = () => {
      CloseDialog();
      setNewRoom({
        name: "",
        isPrivate: false,
        maxPlayers: 8,
        gameType: "Amistoso",
        description: "",
      })
      setFormErrors({
        name: false,
      })
    }
  
    const handleRoomInputChange = (e) => {
      const { name, value } = e.target
      setNewRoom({
        ...newRoom,
        [name]: value,
      })
  
      // Validación para el nombre
      if (name === "name") {
        setFormErrors({
          ...formErrors,
          name: value.trim() === "",
        })
      }
    }
  
    const handleSwitchChange = (e) => {
      setNewRoom({
        ...newRoom,
        isPrivate: e.target.checked,
      })
    }
  
    const handleSliderChange = (e, newValue) => {
      setNewRoom({
        ...newRoom,
        maxPlayers: newValue,
      })
    }
  
    const handleCreateRoom = async () => {
      if (newRoom.name.trim() === "") {
        setFormErrors({
          ...formErrors,
          name: true,
        })
        return
      }
      await createRoom(newRoom, playerStats.name);
      handleCloseCreateDialog()
    }

  return (
    <Dialog
    open={OpenDialog}
    onClose={handleCloseCreateDialog}
    maxWidth="sm"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 3,
        bgcolor: "#1d4c1f",
        border: "3px solid #4CAF50",
        boxShadow: "0 0 20px rgba(60, 145, 63, 0.42)",
        color: "white",
        overflow: "hidden",
      },
    }}
    
  >
    <DialogTitle
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #4CAF50",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SportsSoccer sx={{ mr: 1, color: "white" }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
        Create New Room
        </Typography>
      </Box>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseCreateDialog}
        aria-label="close"
        sx={{ color: "white" }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
        py: 3,
      }}
    >
      <Box component="form" sx={{ mt: 1 }}>
        <MuiTextField
          margin="dense"
          label="Room Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={newRoom.name}
          onChange={handleRoomInputChange}
          error={formErrors.name}
          helperText={formErrors.name ? "The room name is required" : ""}
          required
          InputLabelProps={{
            sx: { color: "rgba(255, 255, 255, 0.7)" },
          }}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
          Maximum Number of Players: {newRoom.maxPlayers}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Groups sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }} />
            <Slider
              value={newRoom.maxPlayers}
              onChange={handleSliderChange}
              step={2}
              marks
              min={2}
              max={20}
              valueLabelDisplay="auto"
              sx={{
                color: "#4CAF50",
                "& .MuiSlider-thumb": {
                  bgcolor: "white",
                },
                "& .MuiSlider-rail": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
                "& .MuiSlider-mark": {
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                },
              }}
            />
          </Box>
        </Box>

        <MuiTextField
          margin="dense"
          label="Description (optional)"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          name="description"
          value={newRoom.description}
          onChange={handleRoomInputChange}
          InputLabelProps={{
            sx: { color: "rgba(255, 255, 255, 0.7)" },
          }}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={newRoom.isPrivate}
              onChange={handleSwitchChange}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4CAF50",
                },
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {newRoom.isPrivate ? (
                <Lock fontSize="small" sx={{ mr: 0.5, color: "rgba(255, 255, 255, 0.9)" }} />
              ) : (
                <Public fontSize="small" sx={{ mr: 0.5, color: "rgba(255, 255, 255, 0.9)" }} />
              )}
              <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                {newRoom.isPrivate ? "Private Room" : "Public Room"}
              </Typography>
            </Box>
          }
          sx={{ mb: 1 }}
        />
        <FormHelperText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {newRoom.isPrivate
            ? "Only players with the code will be able to join"
            : "Any player will be able to find and join this room"}
        </FormHelperText>
      </Box>
    </DialogContent>
    <DialogActions
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        borderTop: "2px solid #4CAF50",
        py: 1.5,
        px: 3,
      }}
    >
      <Button
        onClick={handleCreateRoom}
        variant="contained"
        startIcon={<Check />}
        sx={{
          bgcolor: "white",
          color: "#1b5e20",
          "&:hover": {
            bgcolor: "#e0e0e0",
          },
          ml: 2,
        }}
      >
        Create Room
      </Button>
    </DialogActions>
  </Dialog>
  )
}

CreateRoom.propTypes = {
  OpenDialog: PropTypes.bool.isRequired,  // OpenDialog should be a boolean and is required
  CloseDialog: PropTypes.func.isRequired, // CloseDialog should be a function and is required
};