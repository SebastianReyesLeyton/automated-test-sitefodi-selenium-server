import { Router } from "express";
import ResultsController from "../controller/results";
import { validateAccessToken } from "../../../lib/request";

const router = Router();
const controller = ResultsController;

/* GET routes */
router.get('/:idTherapy', validateAccessToken(), controller.getResults() );

/* POST routes */
router.post('/store/:idTherapy/:qType/:idQuestion', validateAccessToken(), controller.storeResult() );

export default router;