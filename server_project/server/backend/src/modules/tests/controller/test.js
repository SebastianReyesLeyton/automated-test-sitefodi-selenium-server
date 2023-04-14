import UTF8 from "utf8";
import Controller from "../../../models/controller";
import TestService from "../service/test";
import { DTO_TEST_CREATION } from "../models/dto.in";
import {  } from "../models/dto.out";
import { dtoValidator, integerValidator, stringValidator } from "../../../lib/validator";
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR, FORBIDDEN } from "../../../lib/httpCodes";
import Permissions from "../../../lib/permissions";

class TestController extends Controller {

    constructor () {
        super('test', 'Test', new TestService());
    }

    create () {

        const permission = Permissions('supervisor');
        
        return async (req, res) => {

            // Get the body request form
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
                dtoValidator( body, DTO_TEST_CREATION );
                body.name = stringValidator( body.name, 'nombre' );
            } catch (err) {
                res.statusCode = BAD_REQUEST;
                res.send({ error: err.message });
                return ;
            }

            let response = await this.service.create( res, body );
            
            res.json(res.statusCode === SUCCESS ? { success: response.message } : { error: response.message })
        }

    }

    getEditableTests() {

        const permission = Permissions('supervisor');

        return async ( req, res ) => {
            
            // Get request parameters
            let body = { rows: req.params.rows, offset: req.params.offset, isEditable: 1 };

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {
                
                body.rows = integerValidator(body.rows);
                body.offset = integerValidator(body.offset);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.getAll( res, body );

            res.json(response);
        }

    }

    getPublishedTests() {

        const permission = Permissions('therapist');

        return async ( req, res ) => {
            
            // Get request parameters
            let body = { rows: req.params.rows, offset: req.params.offset, isEditable: 0 };

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {
                
                body.rows = integerValidator(body.rows);
                body.offset = integerValidator(body.offset);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.getAll( res, body );

            res.json(response);
        }

    }

    getQuestionTypes () {
        
        const permission = Permissions('supervisor');

        return async ( req, res ) => {

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Wait the response of test service
            let response = await this.service.getQuestionTypes( res );

            // Send the response
            res.json(response);
        }

    }

    getTest () {

        const permission = Permissions('supervisor');

        return async ( req, res ) => {

            // Get the request parameters
            let body = { id: req.params.id }

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Wait the response of test service
            let response = await this.service.getTest( res, body );

            // Send the response
            res.json(response);

        }
    }

    publish () {

        const permission = Permissions('supervisor');

        return async ( req, res ) => {

            // Get the request parameters
            let body = { id: req.params.test };
            
            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;
                
            }

            // Wait the response of test service
            let response = await this.service.publish( res, body );

            res.json( res.statusCode === SUCCESS ? { success: response.message } : { error: response.message });

        }

    }

    addQuestion () {

        const permission = Permissions('supervisor');

        return async ( req, res ) => {

            // Get the body request and request parameters
            let body = req.body,
                parameters = { idTest: req.params.test, idQuestionType: req.params.questionType };
            
            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing some validations
            try {
                
                parameters.idTest = integerValidator(parameters.idTest);
                parameters.idQuestionType = integerValidator(parameters.idQuestionType);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.addQuestion( res, body, parameters );

            res.json( res.statusCode === SUCCESS ? { success: response.message } : { error: response.message });
        }
    }

    getQuestionsByTest () {

        const permission = Permissions('supervisor and therapist');

        return async ( req, res ) => {

            // Get the request parameters
            let body = { idTest: req.params.id };

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing some validations
            try {
               
                body.idTest = integerValidator(body.idTest);
                
            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.getQuestionsByTest( res, body );

            res.json(response);

        }
    }

    getNumberOfQuestionsByTest () {
        return async ( req, res ) => {

            // Get the request params
            let body = { idTest: req.params.id }

            // Doing some validations
            try {
               
                body.idTest = integerValidator(body.idTest);
                
            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.getNumberOfQuestionsByTest( res, body );

            res.json(response);

        }
    }

    getQuestion () {
        return async ( req, res ) => {

            // Get the request params
            let body = { idTest: req.params.id, currentQuestion: req.params.currentQuestion }

            // Doing some validations
            try {
               
                body.idTest = integerValidator(body.idTest);
                body.currentQuestion = integerValidator(body.currentQuestion);
                
            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Wait the response of test service
            let response = await this.service.getQuestion( res, body );

            console.log(response);

            res.json(response)

        }
    }

}

const testController = new TestController();

export default testController;