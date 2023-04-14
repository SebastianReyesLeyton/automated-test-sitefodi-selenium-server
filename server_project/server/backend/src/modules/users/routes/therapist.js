import { Router } from "express";
import TherapistController from "../controller/therapist";
import { validateAccessToken } from "../../../lib/request";

const router = Router();
const controller = TherapistController;

/* GET routes */
router.get('/get/:id', validateAccessToken(), controller.get() );
router.get('/all/:rows/:offset', validateAccessToken(), controller.getAll() );
router.get('/modify-state/:id/:state', validateAccessToken(), controller.modifyState() );
router.get('/relate-patient/:therapist/:patient', validateAccessToken(), controller.relatePatient() );

/* POST routes */
router.post('/register', validateAccessToken(), controller.register() );
router.post('/edit', validateAccessToken(), controller.edit() );

export default router;