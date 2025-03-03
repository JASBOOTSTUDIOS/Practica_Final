import express from "express";
import cors from "cors";
import { authMiddelware } from "../middelware/authMiddelware";
import {
  createCredentialsUserModel,
  updateCredentialsUserModel,
  Login,
  getCredentialsUserByIdModel,
} from "../models/credentialUsersModel";
import path from "path";

const route = express();
route.use(express.json());
route.use(cors());
route.use("/", express.static(path.join(__dirname, "../public")));

// Ruta De Login.
route.get("/profile", authMiddelware, getCredentialsUserByIdModel);
route.post("/login", Login);
route.post("/register", authMiddelware, createCredentialsUserModel);
route.put("/update", updateCredentialsUserModel);

export default route;
