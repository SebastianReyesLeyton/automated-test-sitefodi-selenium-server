import Database from '../lib/database';

class Repository {

    constructor (dbConf, module, name) {
        this.connection = Database.getInstance(dbConf);
        this.db = this.connection.pool;
        console.log(`\x1b[36m[+] ${module} module status: ${name} repository created. \x1b[0m`);
    }
}

export default Repository;