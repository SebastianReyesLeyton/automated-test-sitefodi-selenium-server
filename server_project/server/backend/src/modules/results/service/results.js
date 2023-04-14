import Service from "../../../models/service";
import ResultsRepository from "../repository/results";
import { DTO_CARD_QUESTION_RESULT } from "../models/dto.out";
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";
import TestController from "../../tests/controller/test";
import ResponseOBJ from "../../../models/request";
import TherapyController from "../../therapy/controller/therapy";

class ResultsService extends Service {

    constructor () {
        super({
            modules: {
                test: TestController,
                therapy: TherapyController
            },
            repository: new ResultsRepository(),
            module: 'Results',
            name: 'results'
        });
    }

    async storeResult (res, obj) {

        // Define the default response
        let ans = { message: 'almacenado' };
        res.statusCode = SUCCESS;

        let response;

        switch (obj.type) {
            case 'Carta':
                response = await this.repository.storeCardQuestionResult(obj);
                break;
            default:
                res.statusCode = INTERNAL_ERROR;
                return { message: 'este tipo de pregunta no esta implementado' };
        }

        if ( response.affectedRows !== 1 ) {
            ans.message = 'no se pudo guardar la respuesta';
            res.statusCode = BAD_REQUEST;
        }

        return ans;

    }

    async getResults (req, res, obj) {

        // Define the default response
        let ans = { message: 'resultados' };
        res.statusCode = SUCCESS;

        // Create a new ResponseOBJ object
        let response = new ResponseOBJ();

        // Get the test related to request therapy and store its result
        await this.connections.therapy.getTherapy()( { params: { id: obj.idTherapy } }, response);
        const test = response.data.therapy.test;

        // Get the question types of test and store the response
        await this.connections.test.getQuestionsByTest()( Object.assign(req, { params: { id: test } }), response );
        const questions = response.data.questions;
        
        console.log(questions);

        ans.results = []

        for (const element of questions) {
            
            switch (element.type) {
                case 'Carta':
                    response = await this.repository.getCardQuestionResult({ id: element.question, idTherapy: obj.idTherapy });
                    this.mapper.map(response[0], DTO_CARD_QUESTION_RESULT, (dto) => {

                        dto.therapy = dto.idTherapy;
                        dto.patientCardName = dto.cardnameP;
                        dto.therapistCardName = dto.cardnameT;
                        dto.points = (dto.correct === 'yes') ? dto.yesValue : dto.noValue;
                        dto.maxPoints = dto.yesValue ;
                        dto.order = element.order;
                        dto.type = element.type;

                        for (const attr of [ 'cardnameP', 'cardnameT', 'therapistTitle', 'patientTitle', 'idQuestion', 'idTherapy', 'img', 'yesValue', 'noValue' ]) {
                            delete dto[attr];
                        }

                        return dto;
                    });

                    ans.results.push(this.mapper.obj);

                    break;
                default:
                    break;
            }

        }


        return ans;

    }

}

export default ResultsService;