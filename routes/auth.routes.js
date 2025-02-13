import { Router } from "express";
import { singUP, singIN, singOUT } from "../controllers/auth.controller.js"; 

const authRouter = Router();

// Routes
authRouter.post('/sign-up', singUP);  
authRouter.post('/sign-in', singIN);
authRouter.post('/sign-out', singOUT);

export default authRouter;  
