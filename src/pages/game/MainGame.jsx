import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

import { usePlayerStats } from "../../components/user/playerStats";
import { SoccerField } from "../../components/game/SoccerField";
import { useParams } from "react-router-dom";

export const MainGame = () => {
  const { id } = useParams();

  const playerStats = usePlayerStats();
  const [players, setPlayers] = useState([]); // Estado de los jugadores
  const stompClient = useRef(null);
  const movementState = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const FRAME_RATE = 60; // frames por segundo

  // Registrar eventos de teclado para actualizar movementState
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          movementState.current.up = true;
          break;
        case "ArrowDown":
          movementState.current.down = true;
          break;
        case "ArrowLeft":
          movementState.current.left = true;
          break;
        case "ArrowRight":
          movementState.current.right = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          movementState.current.up = false;
          break;
        case "ArrowDown":
          movementState.current.down = false;
          break;
        case "ArrowLeft":
          movementState.current.left = false;
          break;
        case "ArrowRight":
          movementState.current.right = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Conectar al STOMP broker al montar el componente
  useEffect(() => {
    let playerName = playerStats.name;
    console.log("Nombre del jugador:", playerName);
    if (playerName === "Player") {
      playerName = playerName + Math.floor(Math.random() * 1000);
    }
    if (!playerName) {
      alert("Debe ingresar un nombre para conectarse.");
      return;
    }

    // Obtiene el broker URL desde la variable de entorno o usa un valor por defecto
    const brokerUrl = process.env.REACT_APP_API_GAME_URL || process.env.REACT_APP_API_GAME_URL_LOCAL;
    console.log("Conectando al broker:", brokerUrl);
    const client = new Client({
      brokerURL: brokerUrl,
      onConnect: (frame) => {
        console.log("Conectado:", frame);

        // Suscribirse a actualizaciones del juego
        client.subscribe("/topic/play/" + id, (message) => {
          const gameData = JSON.parse(message.body);
          // Actualizar las posiciones de los jugadores
          setPlayers(gameData.players);
        });

        // Suscribirse para saber cuando un jugador se une
        client.subscribe("/topic/players/" + id, (message) => {
          const playersList = JSON.parse(message.body);
          console.log("Lista de jugadores actualizada:", playersList);
          setPlayers(playersList);
        });

        // Enviar el nombre del jugador al backend
        console.log("Uniendo al jugador:", playerName);
        client.publish({
          destination: "/app/join/"+ id,
          body: JSON.stringify({
            name: playerName,
          }),
        });

        // Enviar el estado de movimiento periódicamente
        const intervalId = setInterval(() => {
          if (client.active && client.connected) {
            client.publish({
              destination: "/app/play/"+ id,
              body: JSON.stringify({
                player: playerName,
                dx: movementState.current.right - movementState.current.left,
                dy: movementState.current.down - movementState.current.up,
              }),
            });
          }
          else {
            clearInterval(intervalId);
            console.log("Desconectado del broker.");
          }
        }, 1000 / FRAME_RATE);
      },
      onStompError: (frame) => {
        console.error("Error del broker:", frame.headers["message"]);
        console.error("Detalles adicionales:", frame.body);
      },
      onWebSocketError: (error) => {
        console.error("Error en el websocket:", error);
      },
    });

    client.activate();
    stompClient.current = client;

    // Desconectar al desmontar el componente
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [playerStats.name]);

  return (
    <main className="overflow-hidden p-0 m-0">
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
      `}</style>
      {/* Pasar la lista de jugadores desde el estado actualizado */}
      <SoccerField players={players} />
    </main>
  );
};
