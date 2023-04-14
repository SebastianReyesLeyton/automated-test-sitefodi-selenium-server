import { results } from "../../../conf/databases";
import Repository from "../../../models/repository";

class ResultsRepository extends Repository {

    constructor () {
        super (results, 'Results', 'results');
    }

    storeCardQuestionResult (obj) {
        const ans = this.db.query('INSERT INTO card_answer_table (idQuestion, idTherapy, correct, answer) VALUES (?, ?, ?, ?)', [
            obj.idQuestion,
            obj.idTherapy,
            obj.correct,
            obj.answer
        ]);
        return ans;
    }

    getCardQuestionResult (obj) {
        const ans = this.db.query('SELECT * FROM card_answer_table \
                                   INNER JOIN sitefodi_tests.card_question_table ON card_answer_table.idQuestion = sitefodi_tests.card_question_table.id\
                                   WHERE card_answer_table.idQuestion = ? AND card_answer_table.idTherapy = ?', [obj.id, obj.idTherapy]);
        return ans;
    }

}

export default ResultsRepository;