import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/authRoutes";
import userRoter from "./routes/userRouter";
import viewsRouter from "./routes";
import { PORT_SERVER } from "../ENV";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas.
app.use("/users", userRoter);
app.use("/", route);
app.use("/views", viewsRouter);

const PORT = PORT_SERVER() || 3002;
app.listen(PORT, () => {
  console.log(`API Corriendo en el puerto http://localhost:${PORT}`);
});
