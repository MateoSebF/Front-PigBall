"use client"

import PropTypes from 'prop-types';
import { green } from '@mui/material/colors';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  Avatar,
  Paper
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import {
  EmojiEvents as TrophyIcon,
  People as UsersIcon,
  Cancel as XCircleIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "@mui/icons-material"
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
export default function Statistic ({matchesPlayed,matchesWon,matchesLost,score,winRate }) {
  const [countMatches, setCountMatches] = useState(0);
  const [countWon, setCountWon] = useState(0);
  const [countLost, setCountLost] = useState(0);
  const [countScore, setCountScore] = useState(0);
  const [countWin, setCountWin] = useState(0);

  useEffect(() => {
    animation(matchesPlayed,setCountMatches)
  }, [matchesPlayed]);
  useEffect(() => {
    animation(matchesWon,setCountWon)
  }, [matchesWon]);
  useEffect(() => {
    animation(matchesLost,setCountLost)
  }, [matchesLost]);
  useEffect(() => {
    animation(score,setCountScore)
  }, [score]);
  useEffect(() => {
    animation(winRate,setCountWin)
  }, [winRate]);
  const animation = (item,setCount) => {
      const increment = Math.ceil(item / 100); 
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= item) {
          setCount(item);
          clearInterval(interval);
        } else {
          setCount(currentCount);
        }
      }, 20); 

      return () => clearInterval(interval);
  }
    return (
        <Grid item size={{
            xs: 12,
            sm: 8
          }}>
            <Card sx={{ bgcolor: "primary.dark", color: "white", border:"1px solid white"}}>
              <CardHeader
                title="Player Statistics"
                slotProps={{ variant: "h5" }}
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              />
              <CardContent sx={{ py: 3 }}>
                <Grid container spacing={2}>
                  <Grid item size={{
                  xs: 12,
                  sm: 6
                  }}>
                    <Paper
                      sx={{ bgcolor: "#1a237e", p: 2, borderRadius: 2, display: "flex", alignItems: "center" }}
                    >
                      <Avatar sx={{ bgcolor: "#534bae", mr: 2 }}>
                        <UsersIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#534bae" }}>
                          Games Played
                        </Typography>
                          <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2.0 }}
                        >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#121b3c" }}>
                          {countMatches}
                        </Typography>
                        </motion.div>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item size={{
                    xs: 12,
                    sm: 6
                  }}>
                    <Paper
                      sx={{ bgcolor: green[500], p: 2, borderRadius: 2, display: "flex", alignItems: "center" }}
                    >
                      <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                        <CheckCircleIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "success.dark" }}>
                          Games Won
                        </Typography>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2.0 }}
                        >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color:"#175216" }}>
                          {countWon}
                        </Typography>
                        </motion.div>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item size={{
                  xs: 12,
                  sm: 6
                  }}>
                    <Paper
                      sx={{ bgcolor: "error.dark", p: 2, borderRadius: 2, display: "flex", alignItems: "center" }}
                    >
                      <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
                        <XCircleIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "error.light" }}>
                          Lost Games
                        </Typography>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2.0 }}
                        >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color:"#5f1515" }}>
                          {countLost}
                        </Typography>
                        </motion.div>
                        
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item size={{
                    xs: 12,
                    sm: 6
                  }}>
                    <Paper
                      sx={{ bgcolor: "secondary.dark", p: 2, borderRadius: 2, display: "flex", alignItems: "center" }}
                    >
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        <StarIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "secondary.light" }}>
                          Total Score
                        </Typography>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2.0 }}
                        >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f7e04f" }}>
                          {countScore}
                        </Typography>
                        </motion.div>
                        
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Winning Percentage
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "rgba(0,0,0,0.2)",
                    borderRadius: 2,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${countWin}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} // Suaviza la animación
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, #ffc107, #ff9800)",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">0%</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {winRate}%
                  </Typography>
                  <Typography variant="body2">100%</Typography>
                </Box>
              </Box>

                <Paper sx={{ mt: 4, p: 3, bgcolor: "primary.more", borderRadius: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="h6">Best Score</Typography>
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2.0 }}
                        >
                        <Typography variant="h3" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                        {countScore}
                      </Typography>
                        </motion.div>
                    </Box>
                    <TrophyIcon sx={{ fontSize: 60, color: "secondary.main" }} />
                  </Box>
                </Paper>
              </CardContent>
            </Card>
        </Grid>
    )
}

Statistic.propTypes = {
  matchesPlayed: PropTypes.number.isRequired,
  matchesWon: PropTypes.number.isRequired,
  matchesLost: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  winRate: PropTypes.number.isRequired,
};