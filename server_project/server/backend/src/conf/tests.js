const BASEPATH = (process.env.TEST_BASEPATH || '/usr/src/app');
const PATH = (process.env.TEST_PATH || '/src/db');

export const TEST_PATH = (`${BASEPATH}${PATH}`);