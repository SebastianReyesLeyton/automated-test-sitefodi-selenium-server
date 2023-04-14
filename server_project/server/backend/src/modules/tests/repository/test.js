import Repository from "../../../models/repository";
import { tests } from "../../../conf/databases";

class TestRepository extends Repository {

    constructor (name = 'test') {
        super(tests, 'Test', name);
    }

    getById ( obj ) {
        const ans = this.db.query('SELECT * FROM test_table WHERE id = ?', [ obj.id ]);
        return ans;
    }

    getByIdState ( obj ) {
        const ans = this.db.query('SELECT * FROM test_table WHERE id = ? AND isEditable = ?', [ 
            obj.id,
            obj.isEditable
        ]);
        return ans;
    }

    getByName ( obj ) {
        const ans = this.db.query('SELECT * FROM test_table WHERE tName = ?', [obj.tName]);
        return ans;
    }

    createTest ( obj ) {
        const ans = this.db.query('INSERT INTO test_table (tName, tDescription) VALUES (?, ?)',[
            obj.tName, 
            obj.tDescription
        ]);
        return ans;
    }

    getAll ( obj ) {
        const ans = this.db.query('SELECT * FROM test_table WHERE isEditable = ? LIMIT ?, ?', [
            obj.isEditable,
            obj.offset,
            obj.rows
        ]);
        return ans;
    }

    getQuestionById ( obj ) {
        const ans = this.db.query('SELECT * FROM question_type_table WHERE id = ?', [ obj.id ]);
        return ans;
    }

    getQuestionTypes ( ) {
        const ans = this.db.query('SELECT * FROM question_type_table');
        return ans;
    }

    getQuestions ( obj ) {
        const ans = this.db.query('SELECT idTest, idQuestion, questionOrder, qtype FROM test_questions_table\
                                   INNER JOIN question_table ON question_table.id = test_questions_table.idQuestion\
                                   INNER JOIN question_type_table ON question_type_table.id = question_table.idtype\
                                   WHERE idTest = ? ORDER BY questionOrder', [ obj.idTest ]);
        return ans;
    }

    publish ( obj ) {
        const ans = this.db.query('UPDATE test_table SET isEditable = ? WHERE id = ?', [
            0,
            obj.id
        ]);
        return ans;
    }

    createQuestion ( obj ) {
        const ans = this.db.query('INSERT INTO question_table (idtype) VALUES (?)', [ obj.idtype ]);
        return ans;
    }

    createCardQuestion ( obj ) {
        const ans = this.db.query(`INSERT INTO card_question_table (id, therapistTitle, patientTitle, cardnameT, cardnameP, img, yesValue, noValue)\
                                   VALUES (?, ${obj.therapistTitle !== '' ? `'${obj.therapistTitle}'` : 'DEFAULT'}, ${obj.patientTitle !== '' ? `'${obj.patientTitle}'` : 'DEFAULT'}, ?, ?, ?, ?, ?)`, [
                                    obj.id,
                                    obj.cardnameT,
                                    obj.cardnameP,
                                    obj.img,
                                    obj.yesValue,
                                    obj.noValue
                                   ]);
        return ans;
    }

    addQuestion ( obj ) {
        const ans = this.db.query('INSERT INTO test_questions_table (idTest, idQuestion) VALUES (?, ?)',[
            obj.idTest,
            obj.idQuestion
        ]);
        return ans;
    }

    storeImage ( obj ) {
        const ans = this.db.query('INSERT INTO images_table (imgURL) VALUES (?)', [ obj.imgURL ]);
        return ans;
    }

    getNumberOfQuestions ( obj ) {
        const ans = this.db.query('SELECT MAX(questionOrder) FROM test_questions_table WHERE idTest = ?', [obj.idTest]);
        return ans;
    }

    getTestQuestion ( obj ) {
        const ans = this.db.query('SELECT idQuestion, qtype FROM test_questions_table\
                                   INNER JOIN question_table ON test_questions_table.idQuestion = question_table.id\
                                   INNER JOIN question_type_table ON question_table.idtype = question_type_table.id\
                                   WHERE idTest = ? AND questionOrder = ?', [
                                    obj.idTest,
                                    obj.currentQuestion
                                   ]);
        return ans;
    }

    getCardQuestion ( obj ) {
        const ans = this.db.query('SELECT * FROM card_question_table INNER JOIN images_table\
                                   ON card_question_table.img = images_table.id\
                                   WHERE card_question_table.id = ?', [obj.id]);
        return ans;
    }

}

export default TestRepository;