import { Router } from "express";
import auth from './auth';

const authRouter = new Router();

authRouter.use(auth);

export default authRouter;