import Mapper from '../lib/mapper';

class Controller {

    constructor (name, module, service) {
        this.service = service;
        this.mapper = new Mapper();
        console.log(`\x1b[35m[+] ${module} module status: ${name} controller created.\x1b[0m`);
    }
}

export default Controller;