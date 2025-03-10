import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../ENV";


const JWT_SECRETS = JWT_SECRET() || "dafault_secret";
const JWT_EXPIRESS = "1h";

export const generatteToken =(id:number, nombres:string, apellidos:string, telefono:string, userName:string,userEmail:string):string =>{
    return jwt.sign({id,nombres,apellidos,telefono,userName,userEmail}, JWT_SECRETS,{expiresIn:JWT_EXPIRESS || process.env.JWT_EXPIRES});
};

export const verifyToken = (token:string): any =>{
    console.info(token)
    try{
        return jwt.verify(token, JWT_SECRET());
    }catch (error){
        return null;
    };
};