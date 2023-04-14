import { Router } from "express";
import { validateAccessToken } from "../../../lib/request";
import TherapyController from "../controller/therapy";

const router = new Router();
const controller = TherapyController;

/* GET routes */
router.get('/all/not-finished/:rows/:offset', validateAccessToken(), controller.getNotFinished() );
router.get('/:idTherapy/update-current-question/:questionLocation', validateAccessToken(), controller.updateQuestionLocation() );
router.get('/all/finished/:rows/:offset', validateAccessToken(), controller.getFinished() );
router.get('/all/finished/:rows/:offset/:relation', validateAccessToken(), controller.getFinished() );
router.get('/:idTherapy/finish', validateAccessToken(), controller.finishTherapy() );

/* POST routes */
router.post('/schedule', validateAccessToken(), controller.schedule() );


export default router;