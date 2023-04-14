import { Router } from "express";
import AuthController from "../controller/auth";
import { validateAccessToken } from "../../../lib/request";

const router = Router();
const controller = AuthController;

router.post('/login', controller.login() );
router.get('/logout', validateAccessToken(), controller.logout() );

export default router;