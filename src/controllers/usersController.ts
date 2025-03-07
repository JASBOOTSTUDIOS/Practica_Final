import {resolve} from 'path';
import * as fs from 'fs/promises';

interface User {
    id:number;
    nombres:string;
    apellidos: string;
    genero:string;
    edad:number;
    cedula: string;
    telefono:string;
    fechaDeNacimiento:string;
    userStatus:boolean;
    delete_at:string;
    update_at:string;
    create_at:string;
};

const filePath = resolve(__dirname, './tables/users.json');
// Leyendo el JSON
async function readUsers(): Promise<User[]>{
    try{
        const dataUser = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(dataUser) as User[]; 
    }catch(error){
        console.error(`Error al intertar leer el JSON: ${error}`);
        return [];
    }
};
 
// Guardando el JSON
async function writeUser(user: User[]): Promise<void> {
    try{
        await fs.writeFile(filePath, JSON.stringify(user,null,2));
    }catch(error){
        console.error(`Error al guardar los cambios: ${error}`);
    };
};

export async function getAllUsersController():Promise<User[]>{
    const users = await readUsers();
    if(!users)return [];
    return users;
};

// extrayendo usuario por claves.
export async function getUserByEmail(id:number):Promise<User | undefined>{
const users = await readUsers();
return users.find((user)=> user.id === id); 
};

export async function getUserById(id:number):Promise<User | undefined>{
const users = await readUsers();
return users.find((user)=> user.id === id); 
};

export async function getUserByCedula(cedula:string):Promise<User | undefined>{
const users = await readUsers();
return users.find((user)=> user.cedula === cedula);
};

export async function getUserByName(id:number):Promise<User | undefined>{
const users = await readUsers();
return users.find((user)=> user.id === id); 
};

export async function createUserController(nombres:string,apellidos:string,genero:string,edad:number,cedula:string,telefono:string,fechaDeNacimiento:string):Promise<User | undefined>{
    const users = await readUsers();
    
    const newUser: User ={
        id: users.length ? Math.max(...users.map((u)=> u.id)) +1 : 1,
        nombres,
        apellidos,
        genero,
        edad,
        cedula,
        telefono,
        fechaDeNacimiento,
        userStatus:true,
        delete_at:"",
        update_at:"",
        create_at: new Date().toString()
    }
    users.push(newUser);
    await writeUser(users);
return newUser;
};

export async function updateUserByIdController(id:number,nombres:string, apellidos:string,genero:string,edad:number,cedula:string,telefono:string,fechaDeNacimiento:string):Promise<User | null>{
    const users = await readUsers();
    const userIdex = users.findIndex((user)=> user.id === id);
    if(userIdex === -1) return null;
    const create_at = users[userIdex].create_at;
    const updateUser: User ={
        id,
        nombres,
        apellidos,
        genero,
        edad,
        cedula,
        telefono,
        fechaDeNacimiento,
        userStatus:true,
        delete_at:"",
        update_at: new Date().toString(),
        create_at:create_at
    }
    users[userIdex] = updateUser;
    await writeUser(users);
return updateUser;
};


