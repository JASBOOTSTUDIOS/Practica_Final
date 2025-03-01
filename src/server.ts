import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/authRoutes';
import userRoter from './routes/userRouter';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas.
app.use('/users', userRoter);
app.use('/',route);


const PORT = process.env.PORT_SERVE || 3000;
app.listen(PORT, ()=>{
    console.log(`API Corriendo en el puerto http://localhost:${PORT}`);
});