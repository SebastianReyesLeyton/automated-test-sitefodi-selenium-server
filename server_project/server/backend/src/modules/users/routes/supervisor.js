import { Router } from "express";
import SupervisorController from "../controller/supervisor";
import { validateAccessToken } from "../../../lib/request";

const router = Router();
const controller = SupervisorController;

/* GET routes */
router.get('/get/:id', validateAccessToken(), controller.get() );
router.get('/all/:rows/:offset', validateAccessToken(), controller.getAll() );
router.get('/modify-state/:id/:state', validateAccessToken(), controller.modifyState() );

/* POST routes */
router.post('/register', validateAccessToken(), controller.register() );
router.post('/edit', validateAccessToken(), controller.edit() );

export default router;