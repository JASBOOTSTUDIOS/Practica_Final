import { Request, Response } from "express";
import { createUserController, getAllUsersController, getUserByCedula } from "../controllers/usersController";


export async function getAllUsersModel(req:Request, res: Response){
    try{
        const users = getAllUsersController();
        if(!users){res.status(400).json({msg:"Aun no hay usuarios registrados."}); return;}

        res.status(200).json(users);

    }catch(error){
        res.status(400).json({msg:"Error al extrael los usuarios"});
    }
};

export async function createUserModel(req:Request, res: Response){
    const {nombres, apellidos, edad, cedula, telefono,fechaDeNacimiento} = req.body;
    const validCed = await getUserByCedula(cedula);
    console.log(validCed);
    if(validCed){res.status(400).json({mensage:"Ya hay un usuario con esta cedula."});return;}

    if(!nombres || !apellidos || !edad || !telefono || !fechaDeNacimiento){res.status(400).json({msg:"Faltan datos."}); return;}

    const newUser = await createUserController(nombres, apellidos, edad, cedula,telefono,fechaDeNacimiento);
    res.status(201).json(newUser); 
}