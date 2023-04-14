import Repository from "../../../models/repository";
import { therapy } from "../../../conf/databases";

class TherapyRepository extends Repository {

    constructor ( name = "therapy" ) {
        super(therapy, 'Therapy', name);
    }

    get ( obj ) {
        const ans = this.db.query('SELECT * FROM therapy_table WHERE id = ?', [ obj.id ]);
        return ans;
    }

    getNotFinishedTherapies ({ rows, offset, relations }) {
        console.log(relations)
        const ans = this.db.query(`SELECT * FROM therapy_table WHERE stateT != 'finalizada'\
                                   AND idRelation IN (${relations.join()}) ORDER BY dateT LIMIT ?, ?`, [
                                    offset,
                                    rows
                                ]);
        return ans;
    }

    getFinishedTherapies ({ rows, offset, idRelation }) {
        const ans = (!Boolean(idRelation)) ? this.db.query("SELECT * FROM therapy_table WHERE stateT = 'finalizada'\
                                   ORDER BY dateT DESC LIMIT ?, ?", [
            offset, 
            rows
        ]) : 
        this.db.query("SELECT * FROM therapy_table WHERE stateT = 'finalizada' AND idRelation = ? ORDER BY dateT DESC\
                       LIMIT ?, ?", [ idRelation, offset, rows ]);
        return ans;
    }

    addTherapy (obj) {
        const ans = this.db.query(`INSERT INTO therapy_table (urlTherapy, dateT, idRelation, idTest) VALUES(?, ?, ?, ${(obj.idTest != -1) ? obj.idTest: 'NULL'})`, [
            obj.urlTherapy,
            obj.dateT,
            obj.idRelation
        ]);
        return ans;
    }

    updateQuestionLocation (obj) {
        const ans = this.db.query(`UPDATE therapy_table SET questionLocation = ? WHERE id = ?`, [
            obj.questionLocation,
            obj.id
        ]);
        return ans;
    }

    deleteTherapy ( obj ) {
        const ans = this.db.query('DELETE FROM therapy_table WHERE id = ? AND stateT != ?', [
            'finalizada'
        ]);
        return ans;
    } 

    finishTherapy ( obj ) {
        const ans = this.db.query('UPDATE therapy_table SET stateT = ? WHERE id = ?', [
            'finalizada',
            obj.id
        ]);
        return ans;
    }

}

export default TherapyRepository;