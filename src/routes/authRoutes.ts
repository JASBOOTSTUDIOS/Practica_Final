import express from "express";
import cors from "cors";
import { authMiddelware } from "../middelware/authMiddelware";
import {
  createCredentialsUserModel,
  updateCredentialsUserModel,
  Login,
  getCredentialsUserByIdModel,
  getAllCredentialsUserModel,
} from "../models/credentialUsersModel";
import path from "path";

const route = express();
route.use(express.json());
route.use(cors());
route.use("/", express.static(path.join(__dirname, "../public")));

// Ruta De Credenciales.
route.get("/profile", authMiddelware, getCredentialsUserByIdModel);
route.get("/credentials", authMiddelware, getAllCredentialsUserModel);
route.post("/login", Login);
route.post("/register", authMiddelware, createCredentialsUserModel);
route.put("/update", authMiddelware, updateCredentialsUserModel);

export default route;