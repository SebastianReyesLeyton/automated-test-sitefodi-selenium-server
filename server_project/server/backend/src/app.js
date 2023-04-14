import express from 'express';
import sleep from './lib/sleep';
import Gateway from './modules/gateway';
import { PORT, HOST } from './conf/server';
import middleware from './conf/middleware';

const app = express();

middleware(app);

Gateway.getInstance(app);

export default app;
export { PORT, HOST };