import { Router } from "express";
import PatientController from "../controller/patient";
import { validateAccessToken } from "../../../lib/request";

const router = Router();
const controller = PatientController;

/* GET routes */
router.get('/get/:id', validateAccessToken(), controller.get() );
router.get('/all/:rows/:offset', validateAccessToken(), controller.getAll() );
router.get('/modify-state/:id/:state', validateAccessToken(), controller.modifyState() );

/* POST routes */
router.post('/register', validateAccessToken(), controller.register() );
router.post('/edit', validateAccessToken(), controller.edit() );

export default router;