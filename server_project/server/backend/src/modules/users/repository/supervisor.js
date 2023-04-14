import UserRepository from "./user";

class SupervisorRepository extends UserRepository {

    constructor () {
        super('supervisor');
    }
    
    setData ( obj ) {
        return super.setUserData( Object.assign(obj, { rol: 'supervisor' }));
    }

    setState ( obj ) {
        return super.setUserState( Object.assign(obj, { rol: 'supervisor' }));
    }

}

export default SupervisorRepository;