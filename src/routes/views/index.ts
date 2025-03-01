import express, {Request, Response} from 'express';
import { authMiddelware } from '../../middelware/authMiddelware';

const viewsRouter = express();
viewsRouter.use(express.json());

viewsRouter.get('/loged/',authMiddelware, (req: Request, res:Response)=>{
    res.json({msg:"Este es el Dashboard.", user: req.body});
});

export default viewsRouter;