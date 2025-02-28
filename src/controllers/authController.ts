import path from "path";
import { Request, Response } from "express";
import * as fs from "fs/promises";

interface Credentials {
  id: number; 
  usernae: string;
  userPassword: string;
  tokens: string[];
  delete_at: string;
}


