import {Request, Response} from 'express';
import { AuthRequest } from '../../middelware/authMiddelware';
import { getAllUsersController } from '../../controllers/usersController';

export async function indexController(req:Request, res:Response){
    // console.log(req);
    const data = await getAllUsersController();
    // console.log(data);
    res.render('layout',{title:'Inicio',msg:'Bienvenido A mi Primera App.',body:"pages/login.ejs"}); 
};

export async function dashboardController(req:Request, res:Response){
    // console.log(req);
    // const
    // const data = await getAllUsersController(); 
    // console.log(data)
    res.render('layout',{body:"dashboard/dashboard.ejs"}); 
    console.log(req.header("Authorization"));
}

export async function protectedDashboardConroller(req:AuthRequest, res:Response) {
    const token = req.token;
    const html = await fetch(`/views/dashboard`, {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}`,
        },
        
    });
    
}