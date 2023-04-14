import UTF8 from "utf8";
import Controller from "../../../models/controller";
import PatientService from "../service/patient";
import { DTO_REGISTER, DTO_UPDATE_PATIENT } from "../models/patient/dto.in";
import { DTO_PATIENT_RESPONSE, DTO_PATIENTS_RESPONSE } from "../models/patient/dto.out";
import { dateValidator, dtoValidator, integerValidator, passwordValidator, emailValidator, isActiveValidator, docNumValidator } from "../../../lib/validator";
import { SUCCESS, BAD_REQUEST, FORBIDDEN } from "../../../lib/httpCodes";
import Permissions from "../../../lib/permissions";

class PatientController extends Controller {

    constructor () {
        super ('patient', 'User', new PatientService());
    }

    register () {

        const permission = Permissions('therapist');

        return async ( req, res ) => {
             
            // Get the body request
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

                dtoValidator( body, DTO_REGISTER );
                emailValidator( body.email );
                passwordValidator( body.password );
                docNumValidator( body.docnum );
                body.doctype = integerValidator( body.doctype );
                dateValidator( body.dateofBirth);

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of patient service
            let response = await this.service.register( res, body );

            // Return the response according to statusCode result
            if ( res.statusCode === SUCCESS ) response.success = response.message;                
            else response.error = response.message;

            // Delete the message attribute and send response
            delete response.message;
            res.json(response);
        }
    }

    get () {

        const permission = Permissions('therapist and the same patient');

        return async ( req, res ) => {

            // Get request params
            let body = { id: req.params.id, rol: 'paciente' };

            // Doing the required validations
            try {

                body.id = integerValidator( body.id );

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol, req.tokenData, body);
            
            if ( Boolean(check) ) {
                if ( Boolean(check.message) ) {
                    check = await this.service.getRelation( res, { idTherapist: req.tokenData.id, idPatient: body.id });
                    if ( res.statusCode !== SUCCESS ) {
                        res.statusCode = FORBIDDEN;
                        res.json(check);
                        return ;
                    }
                } else {
                    res.statusCode = FORBIDDEN;
                    res.json(check);
                    return ;
                }
            }
            

            // Validate if id user is a patient
            let response = await this.service.id( res, body );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            // Get the patient
            response = await this.service.get( res, response.user );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            // Map user data to DTO_SUPERVISOR_RESPONSE format
            try {
                
                this.mapper.map( response.user, DTO_PATIENT_RESPONSE, (dto) => {

                    dto.name = UTF8.decode(dto.fullname);
                    dto.doctype = UTF8.decode(dto.doctype);

                    delete dto.fullname;
                    delete dto.passcode;
                    delete dto.rol;

                    return dto;
                } )

                // Return response
                res.json(response)

            } catch (err) {
                console.log(err);
            }

        } 
    }

    getAll () {

        const permission = Permissions('therapist');

        return async ( req, res ) => {

            // Get request params
            let body = { rows: req.params.rows, offset: req.params.offset, id: req.tokenData.id };

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

            // Wait the response of supervisor service
            let response = await this.service.getAll( res, body );

            // Map users to DTO_SUPERVISORS_RESPONSE format
            response.users.map((element) => {
                try {

                    this.mapper.map( element, DTO_PATIENTS_RESPONSE, (dto) => {

                        dto.name = UTF8.decode(dto.fullname);
                        dto.active = ( dto.isActive ) ? 'activo' : 'bloqueado';

                        delete dto.fullname;
                        delete dto.isActive;
                        return dto;
                    } );
                    return element;
                } catch ( err ) {
                    console.log(err);
                }
            });

            // Return the response
            res.json(response);
        }
    }

    edit () {

        const permission = Permissions('therapist and the same patient');

        return async ( req, res ) => {

            // Get request body
            let body = req.body;

            // Doing the required validations
            try {
                
                dtoValidator( body, DTO_UPDATE_PATIENT );
                body.id = integerValidator( body.id );
                emailValidator( body.email );
                if ( body.newPassword !== '' ) passwordValidator( body.newPassword );
                docNumValidator( body.docnum );
                body.doctype = integerValidator( body.doctype );
                dateValidator( body.dateofBirth );

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol, req.tokenData, body);
            
            if ( Boolean(check) ) {
                if ( Boolean(check.message) ) {
                    check = await this.service.getRelation( res, { idTherapist: req.tokenData.id, idPatient: body.id });
                    if ( res.statusCode !== SUCCESS ) {
                        res.statusCode = FORBIDDEN;
                        res.json(check);
                        return ;
                    }
                } else {
                    res.statusCode = FORBIDDEN;
                    res.json(check);
                    return ;
                }
            }

            // Validate if id user is a patient
            let response = await this.service.id( res, { id: body.id, rol: 'paciente' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            // Wait the response of patient service
            response = await this.service.edit( res, body, response.user );

            res.json( Boolean(res.statusCode !== 200) ? { error: response.message } : { success: response.message } );

        }
    }

    modifyState () {

        const permission = Permissions('therapist');

        return async ( req, res ) => {

            // Get request params
            let body = { id: req.params.id, isActive: req.params.state };

            // Doing some validations
            try {
                body.id = integerValidator(body.id);
                body.isActive = isActiveValidator(body.isActive);
            } catch (err) {
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;
            }

            // Permission
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Check that relation exists
            check = await this.service.getRelation( res, { idTherapist: req.tokenData.id, idPatient: body.id } );
            if ( res.statusCode !== SUCCESS ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Validate if id user is a patient
            let response = await this.service.id( res, { id: body.id, rol: 'paciente' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            response = await this.service.modifyState( res, body );

            res.json( ( res.statusCode === SUCCESS ) ? { success: response.message} : { error: response.message });
        }
    }

    getRelation () {

        const permission = Permissions('therapist');

        return async ( req, res ) => {

            // Get the body request
            let body = { patient: req.body.patient };

            // Permission
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {
                
                body.patient = integerValidator(body.patient);

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;
                
            }

            // Wait the response of service
            let response = await this.service.getRelation(res, { idTherapist: req.tokenData.id, idPatient: body.patient } );

            res.json(response);

        }
    }

}

const patientController = new PatientController()

export default patientController;