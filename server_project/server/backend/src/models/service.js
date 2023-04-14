import Mapper from '../lib/mapper';

class Service {

    constructor ({ repository, module, name, modules }) {
        this.repository = repository;
        this.connections = modules;
        this.mapper = new Mapper();
        console.log(`\x1b[34m[+] ${module} module status: ${name} service created. \x1b[0m`);
    }
}

export default Service;