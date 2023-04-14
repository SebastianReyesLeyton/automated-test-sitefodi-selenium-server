import { Router } from "express";
import supervisor from "./supervisor";
import therapist from "./therapist";
import patient from "./patient";

const userRouter = new Router();

userRouter.use('/supervisor', supervisor);
userRouter.use('/therapist', therapist);
userRouter.use('/patient', patient);

export default userRouter;