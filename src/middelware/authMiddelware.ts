import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request{
    user?:any;
    token?:string;
};

const JWT_SECRET = process.env.JWT_SECRET|| "dafault_secret";

export const authMiddelware = (req: AuthRequest, res:Response, next:NextFunction)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(`Header: ${req.header("Authorization")}`);
    if(!token){
        res.status(401).json({msg:"Acceso denegado", Status:false});
        return;
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.token = token;
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({msg:"Token Invalido"});
        return;
    }
}