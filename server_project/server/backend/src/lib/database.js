import util from 'util';
import mysql from 'mysql';
import sleep from './sleep';
import { config } from 'process';

let databases = {};
class PrivateDatabase {

    constructor ( config ) {
        this.name = config.database;                // Database name
        this.pool = mysql.createPool( config );     // Connections pool
    }

    initialization () {
        this.connect();
        this.queryConf();
    }

    async synchronization () {
        console.log(`[+] Database ${this.name} status: Waiting to launch other connection`);
        await sleep(13000);
        console.log(`[+] Database ${this.name} status: Ready to launch a new connection`)
    }

    async connect () {
        await this.pool.getConnection( async (err, conn) => {

            if ( err ) {
                // If there is an error in the connection, handle it 
                switch (err.code) {
    
                    case 'PROTOCOL_CONNECTION_LOST': 
                        console.log(`\x1b[31m[+] Database ${this.name} status: Error.`);
                        console.log('    Description: Database connection was closed.\x1b[0m');
                        break;
                    case 'ER_CON_COUNT_ERROR':
                        console.log(`\x1b[31m[+] Database ${this.name} status: Error.`);
                        console.log('    Description: Database has to many connections.\x1b[0m');
                        break;
                    case 'ECONNREFUSED':
                        console.log(`\x1b[31m[+] Database ${this.name} status: Error.`);
                        console.log('    Description: Database connection was refused.\x1b[0m');
                        break;
                    default:
                        console.log(`\x1b[31m[+] Database ${this.name} status: Error.`);
                        console.log(err,'\x1b[0m');
                        break;

                }

                // If the connection is unsuccessful, it goes to the synchronization state and tries again until the connection is successful
                await this.synchronization();
                this.connect();
                return ;
            }

            if ( conn ) { 
                // When the connection is successful, release it and define that a connection exists
                conn.release();
                console.log(`\x1b[32m[+] Database ${this.name} status: Connected\x1b[0m`) ;
            }

        });

    }

    queryConf () {
        // Transform mysql queries to JavaScript promises
        this.pool.query = util.promisify(this.pool.query);
    }
}

class Database {

    constructor () {
        throw new Error('Use Database.getInstance()');
    }

    static getInstance( conf ) {
        
        if ( !Boolean(databases[conf.database]) ) { 
            databases[conf.database] = new PrivateDatabase(conf); 
            databases[conf.database].initialization();
        }
        return databases[conf.database];
    }
}

export default Database;