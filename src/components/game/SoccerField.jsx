"use client"

import { useEffect, useRef } from "react"
import PropTypes from 'prop-types';

export const SoccerField = ({players}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const ctx = canvas.getContext("2d")
      if (ctx) drawSoccerField(ctx, canvas.width, canvas.height, players)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [players])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full m-0 p-0 overflow-hiddenfixed top-0 left-0 w-full h-full m-0 p-0 overflow-hidden" />
}

function drawSoccerField(ctx, width, height, players) {
  const margin = Math.min(width, height) * 0.1
  const fieldWidth = width - margin * 2
  const fieldHeight = height - margin * 2
  const lineWidth = 2

  // Colors
  const outerAreaColor = "#2d6a31";
  const fieldColorDark = "#3a8c40";
  const fieldColorLight = "#4CAF50";
  const lineColor = "#FFFFFF";

  // Draw outer area (stadium surroundings)
  ctx.fillStyle = outerAreaColor
  ctx.fillRect(0, 0, width, height)

  // Guardar el estado del contexto
ctx.save(); 

// Definir el área de la cancha para recortar
ctx.beginPath();
ctx.rect(margin, margin, fieldWidth, fieldHeight);
ctx.clip(); // Aplicar el recorte para que solo se dibuje dentro de la cancha

// Dibujar franjas diagonales en -45°
const stripeWidth = fieldHeight / 4;

for (let i = -fieldWidth; i < fieldWidth; i += stripeWidth) {
  ctx.beginPath();
  ctx.moveTo(margin + i + fieldWidth, margin); // Mover hacia la esquina superior derecha
  ctx.lineTo(margin + i, margin + fieldHeight); // Terminar en la parte inferior izquierda
  ctx.lineTo(margin + i - stripeWidth, margin + fieldHeight);
  ctx.lineTo(margin + i + fieldWidth - stripeWidth, margin);
  ctx.closePath();

  ctx.fillStyle = Math.floor(i / stripeWidth) % 2 === 0 ? fieldColorLight : fieldColorDark;
  ctx.fill();
}

  ctx.restore();

  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth

  // Draw field outline
  ctx.strokeRect(margin, margin, fieldWidth, fieldHeight)

  // Draw halfway line
  ctx.beginPath()
  ctx.moveTo(width / 2, margin)
  ctx.lineTo(width / 2, height - margin)
  ctx.stroke()

  // Draw center circle
  const centerCircleRadius = Math.min(fieldWidth, fieldHeight) * 0.2
  ctx.beginPath()
  ctx.arc(width / 2, height / 2, centerCircleRadius, 0, Math.PI * 2)
  ctx.stroke()

  // Draw center spot
  ctx.beginPath()
  ctx.arc(width / 2, height / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = lineColor
  ctx.fill()

  // Draw penalty areas
  const penaltyAreaWidth = fieldWidth * 0.15
  const penaltyAreaHeight = fieldHeight * 0.65
  const penaltyAreaY = margin + (fieldHeight - penaltyAreaHeight) / 2

  // Left penalty area
  ctx.strokeRect(margin, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight)

  // Right penalty area
  ctx.strokeRect(width - margin - penaltyAreaWidth, penaltyAreaY, penaltyAreaWidth, penaltyAreaHeight)

  // Draw goal areas
  const goalAreaWidth = fieldWidth * 0.07
  const goalAreaHeight = fieldHeight * 0.38
  const goalAreaY = margin + (fieldHeight - goalAreaHeight) / 2

  // Left goal area
  ctx.strokeRect(margin, goalAreaY, goalAreaWidth, goalAreaHeight)

  // Right goal area
  ctx.strokeRect(width - margin - goalAreaWidth, goalAreaY, goalAreaWidth, goalAreaHeight)

  // Draw penalty spots
  const penaltySpotDistance = fieldWidth * 0.11

  // Left penalty spot
  ctx.beginPath()
  ctx.arc(margin + penaltySpotDistance, height / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = lineColor
  ctx.fill()

  // Right penalty spot
  ctx.beginPath()
  ctx.arc(width - margin - penaltySpotDistance, height / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = lineColor
  ctx.fill()

  // Draw corner arcs
  const cornerRadius = Math.min(fieldWidth, fieldHeight) * 0.02

  // Top-left corner
  ctx.beginPath()
  ctx.arc(margin + cornerRadius, margin + cornerRadius, cornerRadius, Math.PI, Math.PI * 1.5)
  ctx.stroke()

  // Top-right corner
  ctx.beginPath()
  ctx.arc(width - margin - cornerRadius, margin + cornerRadius, cornerRadius, Math.PI * 1.5, 0)
  ctx.stroke()

  // Bottom-left corner
  ctx.beginPath()
  ctx.arc(margin + cornerRadius, height - margin - cornerRadius, cornerRadius, Math.PI * 0.5, Math.PI)
  ctx.stroke()

  // Bottom-right corner
  ctx.beginPath()
  ctx.arc(width - margin - cornerRadius, height - margin - cornerRadius, cornerRadius, 0, Math.PI * 0.5)
  ctx.stroke()

  // Draw goals
  const goalWidth = fieldWidth * 0.03
  const goalHeight = fieldHeight * 0.20
  const goalY = margin + (fieldHeight - goalHeight) / 2

  // Left goal
  ctx.strokeRect(margin - goalWidth, goalY, goalWidth, goalHeight)

  // Right goal
  ctx.strokeRect(width - margin, goalY, goalWidth, goalHeight)

  ctx.stroke()

  players.forEach(player => {
    // Dibujar un círculo por cada jugador en su posición (x, y)
    const playerRadius = 20; // Radio del círculo del jugador (puedes cambiarlo)
    ctx.beginPath();
    ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
    if (player.team === 0){
      ctx.fillStyle = "red"; // Color del jugador
    }
    else{
      ctx.fillStyle = "blue"; // Color del jugador
    }
    
    ctx.fill();
    ctx.stroke();
  });
}

SoccerField.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      team: PropTypes.number.isRequired,
    })
  ).isRequired,
};
