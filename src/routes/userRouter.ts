import express from "express";
import { createUserModel, getAllUsersModel, updateUserByIdModel } from "../models/usersModel";
import { authMiddelware } from "../middelware/authMiddelware";

const userRoter = express();
userRoter.use(express.json());
userRoter.use(authMiddelware);
// Get Metodos.
userRoter.get('/', getAllUsersModel);
userRoter.get('/:id');

// Post Metodos.
userRoter.post('/register',createUserModel);

// PUT Metodo.
userRoter.put('/:id',updateUserByIdModel);
export default userRoter;
