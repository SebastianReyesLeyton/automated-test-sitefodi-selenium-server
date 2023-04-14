import { Router } from "express";
import results from './results';

const resultsRouter = new Router();

resultsRouter.use(results);

export default resultsRouter;