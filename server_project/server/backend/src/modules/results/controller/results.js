import Controller from "../../../models/controller";
import ResultsService from "../service/results";
import { DTO_REQUEST_STORE_CARD_RESULT } from "../models/dto.in";
import {
    dtoValidator,
    integerValidator
} from "../../../lib/validator";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";

class ResultsController extends Controller {

    constructor () {
        super('results', 'Results', new ResultsService());
    }

    storeResult () {
        return async ( req, res ) => {

            // Get the body request and params
            let body = req.body;
            let params = { idTherapy: req.params.idTherapy, type: req.params.qType, idQuestion: req.params.idQuestion };

            // Doing the required validations
            try {
                
                switch (params.type) {
                    case 'Carta':
                        dtoValidator(body, DTO_REQUEST_STORE_CARD_RESULT);
                        if (!(body.correct in {'yes': '', 'no': ''}))
                            throw new Error('el valor de correct es incorrecto')
                        break;
                    default:
                        throw new Error("no existe ese tipo de pregunta");
                }
                params.idTherapy = integerValidator(params.idTherapy);
                params.idQuestion = integerValidator(params.idQuestion);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            let response = this.service.storeResult(res, Object.assign(Object.assign({}, body), params));

            res.json(response);

        }
    }

    getResults () {
        return async ( req, res ) => {

            // Get request params
            let body = { idTherapy: req.params.idTherapy }

            // Doing the required validations
            try {
                
                body.idTherapy = integerValidator(body.idTherapy);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of results service
            let response = await this.service.getResults(req, res, body);

            res.json(response);

        }
    }

}

const resultsController = new ResultsController();

export default resultsController;