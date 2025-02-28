import { Request, Response } from "express";
import {
  getAllCredentialsUser,
  createCredentialsUser,
  getCredentialsUserById,
  getCredentialsUserByUserName,
  getCredentialsUserByEmail,
  updateCredemtialsUser,
} from "../controllers/credentialsController";
import bcrypt from "bcryptjs";
import { generatteToken } from "../utils/jwt";

export async function Login(req: Request, res: Response) {
  try {
    const { userName, userPassword } = req.body;
    const comparePass = await getCredentialsUserByUserName(userName);
    if (!comparePass) {
      res.status(400).json({ msg: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(
      userPassword,
      comparePass?.userPassword!
    );

    if (!isMatch) res.status(400).json({ msg: "Contraseña Incorrecta." });
    const token = generatteToken(comparePass?.id!);
    res.status(200).json({
      msg: "User Logueado con exito!",
      id:comparePass?.id,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ msg: "Parece que ubo un error" });
  }
}

export async function getAllCredentialsUserModel(req: Request, res: Response) {
  const data = await getAllCredentialsUser();
  if (!data) res.status(204).json({ msg: "No Hay Usuarios Registrados." });
  res.status(200).send(data);
}

export async function createCredentialsUserModel(req: Request, res: Response) {
  const { userName, userEmail, userPassword } = req.body;
  const credentialsByUserName = await getCredentialsUserByUserName(userName);
  const credentialsByUserEmail = await getCredentialsUserByEmail(userEmail);
  if (credentialsByUserName) {
    res.status(409).json({ msg: "Este Nombre de Usuario Ya Existe." });
  } else if (credentialsByUserEmail) {
    res.status(409).json({ msg: "Este Email Ya Existe." });
  } else if (!userName || !userEmail || !userPassword) {
    res
      .status(400)
      .json({
        msg: "Parece que hubo un error, todos los campos deben de ser llenados.",
      });
  } else {
    const newCredentialsUser = await createCredentialsUser(
      userName,
      userEmail,
      userPassword
    );
    res.status(201).json(newCredentialsUser);
  }
}

export async function updateCredentialsUserModel(req: Request, res: Response) {
  const { id, userName, userEmail, userPassword } = req.body;
  const credentialsById = await getCredentialsUserById(id);
  if (!credentialsById) {
    res.status(400).json({ msg: "Usuario No Encontrado." });
  } else if (!id || !userName || !userEmail || !userPassword) {
    res
      .status(400)
      .json({
        msg: "Parece que hubo un error, todos los campos deben de ser llenados.",
      });
  } else {
    const newUpdateCredentialsUser = await updateCredemtialsUser(
      id,
      userName,
      userEmail,
      userPassword
    );
    res.status(201).json(newUpdateCredentialsUser);
  }
}
