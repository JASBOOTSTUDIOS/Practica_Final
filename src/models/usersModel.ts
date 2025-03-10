import { Request, Response } from "express";
import { createUserController, getAllUsersController, getUserByCedula,getUserById,updateUserByIdController } from "../controllers/usersController";


export async function getAllUsersModel(req:Request, res: Response){
    try{
        const users = await getAllUsersController();
        console.log(users)
        if(!users){res.status(400).json({msg:"Aun no hay usuarios registrados."}); return;}

        res.status(200).json(users);

    }catch(error){
        res.status(400).json({msg:"Error al extrael los usuarios"});
    }
};

export async function getUserByIdModel(req:Request, res: Response){
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    if(!user){res.status(401).json({smg:"Error al obtener datos del usario"}); return;}
    
    res.status(200).json({msg:"Solicitud exitosa",user});
}

export async function createUserModel(req:Request, res: Response){
    const {nombres, apellidos, genero, edad, cedula, telefono,fechaDeNacimiento} = req.body;
    const validCed = await getUserByCedula(cedula);
    console.log(validCed);
    if(validCed){res.status(400).json({mensage:"Ya hay un usuario con esta cedula."});return;}

    if(!nombres || !apellidos || !genero|| !edad || !telefono || !fechaDeNacimiento){res.status(400).json({msg:"Faltan datos."}); return;}

    const newUser = await createUserController(nombres, apellidos, genero,edad, cedula,telefono,fechaDeNacimiento);
    res.status(201).json(newUser); 
}
// update users.
export async function updateUserByIdModel(req:Request, res: Response){
    const { nombres, apellidos, genero, edad, cedula, telefono,fechaDeNacimiento}:any = req.body;
    const id = parseInt(req.params.id);
    // const validCed = await getUserByCedula(cedula);
    // if(validCed){res.status(400).json({mensage:"Ya hay un usuario con esta cedula."});return;}

    if(!id || !nombres || !genero|| !apellidos || !edad || !telefono || !fechaDeNacimiento){res.status(400).json({msg:"Faltan datos."}); return;}

    const newUser = await updateUserByIdController(id, nombres, apellidos, genero,edad, cedula, telefono, fechaDeNacimiento);
    res.status(201).json(newUser); 
}