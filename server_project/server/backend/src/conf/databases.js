
const USER = process.env.MYSQL_USER,
      USER_PASSWORD = process.env.MYSQL_PASSWORD,
      HOST = 'database';

const users = {
    host: HOST,
    user: USER,
    password: USER_PASSWORD,
    database: 'sitefodi_users'
}

const tests = {
    host: HOST,
    user: USER,
    password: USER_PASSWORD,
    database: 'sitefodi_tests'
}

const therapy = {
    host: HOST,
    user: USER,
    password: USER_PASSWORD,
    database: 'sitefodi_therapy'
}

const results = {
    host: HOST,
    user: USER,
    password: USER_PASSWORD,
    database: 'sitefodi_results'
}

const auth = {
    host: HOST,
    user: USER,
    password: USER_PASSWORD,
    database: 'sitefodi_auth'
}

export {
    users, 
    tests,
    therapy,
    results,
    auth
}