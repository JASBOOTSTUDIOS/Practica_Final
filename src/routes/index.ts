import express from "express";
import { authMiddelware } from "../middelware/authMiddelware";
import path from "path";
import { dashboardController, indexController } from "../views/viewController/indexController"; 

const viewsRouter = express();
viewsRouter.use(express.json());
viewsRouter.set("view engine", "ejs");
viewsRouter.set("views",path.join(__dirname,"../views"));
// viewsRouter
viewsRouter.use(express.static(path.join(__dirname,"public")));

viewsRouter.get("/", indexController);
viewsRouter.use("/",authMiddelware, ()=>{
    viewsRouter.get("/dashboard",dashboardController);
    viewsRouter.get("/protecter/dash",)
    
})


export default viewsRouter;
