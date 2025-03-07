import * as fs from "fs/promises";
import { resolve } from "path";
import bcrypt from "bcryptjs";
interface CredentialUser {
  id: number;
  userName: string;
  userEmail:string;
  userPassword: string;
  userStatus:boolean;
  token: string;
  create_at: string;
  delete_at:string;
  update_at:string
}

const filePath = resolve(__dirname, "./tables/credentialUser.json");

async function readCredentialUser(): Promise<CredentialUser[]> {
  try {
    const dataUser = await fs.readFile(filePath, "utf-8");
    return JSON.parse(dataUser) as CredentialUser[];
  } catch (error) {
    console.log("No funciono.");
    console.log(error);
    return [];
  }
}

export async function writeCredentials(
  credentials: CredentialUser[]
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(credentials, null, 2), "utf-8");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
  }
}
// Extrayendo Todas las credenciales.
export async function getAllCredentialsUser(): Promise<CredentialUser[]> {
  const data = await readCredentialUser();
  return data;
}

// Obtener Usuario por ID.
export async function getCredentialsUserById(id:number):Promise<CredentialUser | undefined>{
  const credentials = await readCredentialUser();
  return credentials.find((credential)=> credential.id === id);
}
// Obtener Usuario por Email.
export async function getCredentialsUserByEmail(userEmail:string):Promise<CredentialUser | undefined>{
  const credentials = await readCredentialUser();
  return credentials.find((credential)=> credential.userEmail === userEmail);
}
// Obtener Usuario por User Name.
export async function getCredentialsUserByUserName(userName:string):Promise<CredentialUser | undefined>{
  try{
  const credentials = await readCredentialUser();
  const returnCredential = credentials.find((credential)=> credential.userName === userName);
  if(!returnCredential) return undefined;
  return returnCredential;
  }catch(error){
    return undefined;
  }

}

// Login
export async function LoginController(userName:string, userPassword:string){
  const comparePass = await getCredentialsUserByUserName(userName);
  if(!comparePass) return false;
  
}

// Creando Nueva Credenciales.
export async function createCredentialsUser(userName:string,userEmail:string, userPassword:string):Promise<CredentialUser>{
  const userCredential = await readCredentialUser();
  const hashedPassword = await bcrypt.hash(userPassword,10);
  const newUserCredential = {
    id: userCredential.length ? Math.max(...userCredential.map((u)=> u.id)) + 1 : 1,
    userName:userName,
    userEmail:userEmail,
    userPassword: hashedPassword,
    token:"",
    userStatus:true,
    create_at: new Date().toString(),
    delete_at: "",
    update_at:""
  };
  userCredential.push(newUserCredential);
  await writeCredentials(userCredential);
  return newUserCredential;
}

// Actualizar una credencial por ID 
export async function updateCredemtialsUser(id:number, userName:string, userEmail:string, userPassword:string):Promise<CredentialUser | null>{
  const this_crendential = await getCredentialsUserById(id);
  const credentials = await readCredentialUser();
  const hashedPassword = await bcrypt.hash(userPassword,10);
  const credentialIndex = credentials.findIndex((credential)=> credential.id === id);
  if(credentialIndex === -1) return null;

  const updateCredential = {
    id,
    userName:userName,
    userEmail:userEmail,
    userPassword:hashedPassword,
    token: this_crendential?.token!,
    userStatus: this_crendential?.userStatus!,
    create_at: this_crendential?.create_at!,
    delete_at: this_crendential?.delete_at!,
    update_at:new Date().toString()
  };
  credentials[credentialIndex] = updateCredential;
  await writeCredentials(credentials);
  return updateCredential;
};

// Borrando Usuario;
export async function deleteCrential(id:number, userEmail:string, userName:string, userPassword:string, token:string, userStatus:boolean, create_at:string,delete_at:string, update_at:string):Promise<CredentialUser | null>{
  const credentials = await readCredentialUser();
  const credentialIndex = credentials.findIndex((credential)=> credential.id === id);
  if(credentialIndex === -1) return null;

  const deleteCredential: CredentialUser = {id,userEmail,userName,userPassword,token,userStatus,create_at,delete_at,update_at};
  credentials[credentialIndex] = deleteCredential;
  await writeCredentials(credentials);
  return deleteCredential;
}