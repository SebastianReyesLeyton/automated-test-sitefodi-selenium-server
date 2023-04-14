import Controller from "../../../models/controller";
import TherapyService from "../service/therapy";
import { DTO_SCHEDULE_THERAPY_REQUEST } from "../models/dto.in";
import { dtoValidator, integerValidator, stringValidator, dateValueValidator } from "../../../lib/validator";
import { SUCCESS, BAD_REQUEST, FORBIDDEN } from "../../../lib/httpCodes";
import Permissions from "../../../lib/permissions"; 
import { DTO_THERAPY_RESPONSE } from "../models/dto.out";

class TherapyController extends Controller {

    constructor () {
        super('therapy', 'Therapy', new TherapyService());
    }

    schedule () {

        const permission = Permissions('therapist');

        return async ( req, res ) => {

            // Get body request
            let body = req.body;

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {

                dtoValidator(body, DTO_SCHEDULE_THERAPY_REQUEST);
                body.patient = integerValidator(body.patient);
                body.test = integerValidator(body.test);
                dateValueValidator(body.date);
                
            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.schedule( req, res, body );

            res.json((res.statusCode === SUCCESS) ? { success: response.message } : { error: response.message });

        }
    }

    getNotFinished () {
        return async (req, res) => {

            // Get the request params
            let body = { 
                rows: req.params.rows, 
                offset: req.params.offset,
                rol: req.tokenData.rol,
                id: req.tokenData.id
            };

            // Doing the required validations
            try {
                
                body.rows = integerValidator(body.rows);
                body.offset = integerValidator(body.offset);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.getNotFinished( res, body );

            res.json(response);

        }
    }

    getFinished () {
        return async (req, res) => {

            // Get the request params
            let body = { 
                rows: req.params.rows, 
                offset: req.params.offset,
                rol: req.tokenData.rol,
                id: req.tokenData.id
            };

            if (Boolean(req.params.relation)) body.idRelation = req.params.relation;

            // Doing the required validations
            try {
                
                body.rows = integerValidator(body.rows);
                body.offset = integerValidator(body.offset);
                if (Boolean(body.idRelation)) body.idRelation = integerValidator(body.idRelation);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.getFinished( res, body );

            res.json(response);

        }
    }

    updateQuestionLocation () {
        return async ( req, res ) => {

            // Get request params
            let body = { id: req.params.idTherapy, questionLocation: req.params.questionLocation };

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);
                body.questionLocation = integerValidator(body.questionLocation);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.updateQuestionLocation( res, body );

            res.json( res.statusCode === SUCCESS ? { success: response.message} : { error: response.message});

        }
    }

    finishTherapy () {
        return async ( req, res ) => {
            
            // Get the request params
            let body = { id: req.params.idTherapy };

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.finishTherapy( res, body );

            res.json(response);

        }
    }

    getTherapy () {
        return async ( req, res ) => {

            // Get the request params
            let body = { id: req.params.id };

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapy service
            let response = await this.service.getTherapy( res, body );

            this.mapper.map({}, DTO_THERAPY_RESPONSE, (dto) => {
                dto.id = response.therapy.id;
                dto.test = response.therapy.idTest;
                return dto;
            });

            response.therapy = this.mapper.obj;

            res.json(response);

        }
    }

}

const therapyController = new TherapyController();

export default therapyController;