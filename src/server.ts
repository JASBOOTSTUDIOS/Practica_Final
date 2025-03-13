import { createServer } from "http"; // new
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/authRoutes";
import userRoter from "./routes/userRouter";
import viewsRouter from "./routes";
import { Server } from "socket.io"; // new
import { PORT_SERVER } from "../ENV";

dotenv.config();

const app = express(); // Dual.
app.use(express.json());
app.use(cors());

// Rutas.
// app.use("/socket.io",server);
// ===============================================================
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Permitir conexiones desde cualquier origen
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("mensaje", data); // Enviar el mensaje a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
  
});
// app.use("/",);
app.use("/users", userRoter);
app.use("/auth", route);
app.use("/views", viewsRouter);
// server.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));


const PORT = PORT_SERVER() || 3002;
server.listen(PORT, () => {
  console.log(`API Corriendo en el puerto http://localhost:${PORT}`);
});
