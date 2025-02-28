import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "dafault_secret";
const JWT_EXPIRESS = "1h";;

export const generatteToken =(id:number):string =>{
    return jwt.sign({id}, JWT_SECRET,{expiresIn:JWT_EXPIRESS || process.env.JWT_EXPIRES});
};

export const verifyToken = (token:string): any =>{
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch (error){
        return null;
    };
};