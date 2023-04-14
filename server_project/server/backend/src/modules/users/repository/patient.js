import UserRepository from "./user";

class PatientRepository extends UserRepository {

    constructor () {
        super('patient');
    }

    registerPatient ( obj ) {
        const ans = this.db.query('INSERT INTO patient_table ( id, gender, leftHAID, rightHAID, dateofBirth ) VALUES \
                                  (?, ?, ?, ?, ?)', [
                                    obj.id,
                                    obj.gender,
                                    obj.leftHAID,
                                    obj.rightHAID,
                                    obj.dateofBirth
                                  ]);
        return ans;
    }
    
    getPatient ( obj ) {
        const ans = this.db.query('SELECT * FROM patient_table WHERE id = ?', [ obj.id ]);
        return ans;
    }

    getPatients ( obj ) {
        const ans = this.db.query('SELECT user_table.id AS id, fullname, email, docnum, gender, user_table.isActive AS isActive, relation_therapist_patient_table.id AS relation \
                                   FROM user_table INNER JOIN relation_therapist_patient_table \
                                   ON user_table.id = relation_therapist_patient_table.idPatient \
                                   INNER JOIN patient_table ON user_table.id = patient_table.id \
                                   WHERE idTherapist = ? LIMIT ?, ?', [ 
                                    obj.id,
                                    obj.offset,
                                    obj.rows
                                ]);
        return ans;
    }

    setData ( obj ) {
        const ans = this.db.query('UPDATE user_table SET\
                                    fullname = ?, email = ?, passcode = ?,\
                                    docnum = ?, doctype = ? WHERE id = ? and rol = ?',[
                                        obj.fullname,
                                        obj.email,
                                        obj.passcode,
                                        obj.docnum,
                                        obj.doctype,
                                        obj.id,
                                        'paciente'
                                    ]);
        return ans;
    }

    setPatientData ( obj ) {
        const ans = this.db.query('UPDATE patient_table SET \
                                   gender = ?, leftHAID = ?, rightHAID = ?, dateofBirth = ? \
                                   WHERE id = ?', [
                                    obj.gender, 
                                    obj.leftHAID,
                                    obj.rightHAID,
                                    obj.dateofBirth,
                                    obj.id
                                   ]);
        return ans;
    }

    setState ( obj ) {
        return super.setUserState( Object.assign(obj, { rol: 'paciente' }));
    }

}

export default PatientRepository;