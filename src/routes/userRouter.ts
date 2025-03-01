import express from "express";
import { createUserModel, getAllUsersModel } from "../models/usersModel";

const userRoter = express();
userRoter.use(express.json());

userRoter.get('/', getAllUsersModel);
userRoter.post('/register',createUserModel);


export default userRoter;
