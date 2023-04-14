// Environmental variables
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
const BACKEND_PROTOCOL = process.env.REACT_APP_BACKEND_PROTOCOL;
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
// const BACKEND_HOST = '192.168.21.147';

// URLS
const AUTH_BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/auth`;
const USER_BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/user`;
const TEST_BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/test`;
const THERAPY_BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/therapy`;
const RESULTS_BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/results`;
const SOCKET_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}:${5000}/`;

export {
    AUTH_BASE_URL,
    USER_BASE_URL,
    TEST_BASE_URL,
    THERAPY_BASE_URL,
    RESULTS_BASE_URL,
    SOCKET_URL
};