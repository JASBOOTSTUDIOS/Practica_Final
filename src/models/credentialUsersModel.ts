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
import { AuthRequest } from "../middelware/authMiddelware";


export async function Login(req: AuthRequest, res: Response) {
  try {
    const { userName, userPassword } = req.body;
    
    const comparePass = await getCredentialsUserByUserName(userName);
    if (!comparePass) {
      res.status(400).json({ msg: "Usuario no encontrado" });
      return;
    }
    // const a = bcrypt
    const isMatch = await bcrypt.compare(
      userPassword,  
      comparePass.userPassword
    );

    if (!isMatch) {res.status(400).json({ msg: "Usuario y o Contraseña Incorrecta." }); return;};
    const token = generatteToken(comparePass.id, comparePass.nombres, comparePass.apellidos,comparePass.telefono,comparePass.userName,comparePass.userEmail);
    await updateCredemtialsUser(
      comparePass.id, 
      comparePass.nombres, 
      comparePass.apellidos,
      comparePass.telefono,
      userName,
      comparePass.userEmail,
      comparePass.userPassword,
      token,
      comparePass.userPassword
    );
    res.status(200).json({
      verifiData:req.user,
      msg: "User Logueado con exito!",
      token: token,
    });
    return;
  } catch (error) { 
    res.status(401).json({ msg: "Parece que hubo un error" });
    return;
  }
}
// Trae todos los usuarios.
export async function getAllCredentialsUserModel(req: Request, res: Response) {
  try{
    const data = await getAllCredentialsUser();
    if (!data) res.status(204).json({ msg: "No Hay Usuarios Registrados." });
    res.status(200).send(data);
    return;

  }catch(error){
    res.status(400).json({msg:"Error al extraer todos los datos.",error});
  }
}

// Traer usuario por id

export async function getCredentialsUserByIdModel(req: Request, res: Response){
  const id =req.header("id")?.toString();
  const ID = parseInt(id!);
  const user = await getCredentialsUserById(ID);
  res.status(201).json(user);
  return;
}

export async function createCredentialsUserModel(req: Request, res: Response){
  const { nombres, apellidos, telefono, userName, userEmail, userPassword } = req.body;
  const credentialsByUserName = await getCredentialsUserByUserName(userName);
  const credentialsByUserEmail = await getCredentialsUserByEmail(userEmail);
  if (credentialsByUserName) {
    res.status(409).json({ msg: "Este Nombre de Usuario Ya Existe." });
    return;
  } else if (credentialsByUserEmail) {
    res.status(409).json({ msg: "Este Email Ya Existe." });
    return;
  } else if (!userName || !nombres || !apellidos || !telefono || !userEmail || !userPassword) {
    res
      .status(400)
      .json({
        msg: "Parece que hubo un error, todos los campos deben de ser llenados.",
      });
      return;
  } else {
    const newCredentialsUser = await createCredentialsUser(
      nombres, 
      apellidos, 
      telefono,
      userName,
      userEmail,
      userPassword
    );
    res.status(201).json(newCredentialsUser);
    return;
  }
}

export async function updateCredentialsUserModel(req: Request, res: Response){
  const { id, nombres, apellidos, telefono, userName, userEmail, userPassword } = req.body;
  const credentialsById = await getCredentialsUserById(id);
  if (!credentialsById) {
    res.status(400).json({ msg: "Usuario No Encontrado." });
  } else if (!id || !nombres || !apellidos || !telefono || !userName || !userEmail || !userPassword){
    res
      .status(400)
      .json({
        msg: "Parece que hubo un error, todos los campos deben de ser llenados.",
      });
  } else {
    const newUpdateCredentialsUser = await updateCredemtialsUser(
      id,
      nombres,
      apellidos,
      telefono,
      userName,
      userEmail,
      userPassword,
      ""
    );
    res.status(201).json(newUpdateCredentialsUser);
  }
}
 