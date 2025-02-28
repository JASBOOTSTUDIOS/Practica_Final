import {resolve} from 'path';
import { Request, Response } from "express";
import * as fs from 'fs/promises';

interface User {
    id:number;
    nomnres:string;
    apellidos: string;
    cedula: string;
    delete_at:string;
    create_at:string;
};

const filePath = resolve(__dirname, './tables/users.json');
// Leyendo el JSON
async function readUsers(): Promise<User[]>{
    try{
        const dataUser = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(dataUser) as User[]; 
    }catch(error){

        return [];
    }
}



