import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request{
    user?:any;
};

const JWT_SECRET = process.env.JWT_SECRET|| "dafault_secret";

export const authMiddelware = (req: AuthRequest, res:Response, next:NextFunction)=>{
    const token = req.header("Autorization")?.split("")[1];
    if(!token){
        res.status(401).json({msg:"Acceso denegado"});
        return;
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
    }catch(error){
        res.status(401).json({msg:"Token Invalido"});
        return;
    }
}