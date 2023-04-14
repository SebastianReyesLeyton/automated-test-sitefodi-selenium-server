import UserRepository from "./user";

class TherapistRepository extends UserRepository {

    constructor () {
        super('therapist');
    }

    setData ( obj ) {
        return super.setUserData( Object.assign(obj, { rol: 'terapeuta' }));
    }

    setState ( obj ) {
        return super.setUserState( Object.assign(obj, { rol: 'terapeuta' }));
    }

    registerRelation ( obj ) {
        const ans = this.db.query('INSERT INTO relation_therapist_patient_table (idTherapist, idPatient) VALUES (?, ?)', [
            obj.idTherapist,
            obj.idPatient
        ]);
        return ans;
    }

}

export default TherapistRepository;