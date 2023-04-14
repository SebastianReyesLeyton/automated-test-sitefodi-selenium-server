import UTF8 from "utf8";
import Controller from "../../../models/controller";
import TherapistService from "../service/therapist";
import { DTO_REGISTER_THERAPIST, DTO_UPDATE_THERAPIST } from "../models/therapist/dto.in";
import Permissions from "../../../lib/permissions";
import { SUCCESS, BAD_REQUEST, FORBIDDEN } from "../../../lib/httpCodes";
import { dtoValidator, emailValidator, passwordValidator, docNumValidator, integerValidator, isActiveValidator } from "../../../lib/validator";
import { DTO_THERAPISTS_RESPONSE, DTO_THERAPIST_RESPONSE } from "../models/therapist/dto.out";

class TherapistController extends Controller {

    constructor () {
        super ('therapist', 'User', new TherapistService());
    }

    register () {

        const permission = Permissions('admin and supervisor');

        return async ( req, res ) => {
            
            // Get the body form
            let body = req.body

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Doing the required validations
            try {
                
                dtoValidator( body, DTO_REGISTER_THERAPIST );
                emailValidator( body.email );
                passwordValidator( body.password);
                docNumValidator( body.docnum );

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of therapist service
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

        const permission = Permissions('admin, supervisor, and the same therapist');

        return async ( req, res ) => {

            // Get request params
            let body = { id: req.params.id, rol: 'terapeuta' };

            // Doing the required validations
            try {
                
                body.id = integerValidator(body.id);

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol, req.tokenData, body);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Validate if id user is a supervisor
            let response = await this.service.id( res, body );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            // Map user data to DTO_SUPERVISOR_RESPONSE format
            try {
                
                this.mapper.map( response.user, DTO_THERAPIST_RESPONSE, (dto) => {

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

        const permission = Permissions('admin and supervisor');

        return async ( req, res ) => {
        
            // Get request params
            let body = { rows: req.params.rows, offset: req.params.offset, rol: 'terapeuta' };

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

                    this.mapper.map( element, DTO_THERAPISTS_RESPONSE, (dto) => {

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
            })

            // Return the response
            res.json(response);

        }
    }

    edit () {

        const permission = Permissions('admin, supervisor, and the same therapist');

        return async ( req, res ) => {

            // Get body request
            let body = req.body;

            // Doing the required validations
            try {

                dtoValidator( body, DTO_UPDATE_THERAPIST );
                body.id = integerValidator( body.id );
                emailValidator( body.email );
                if ( body.newPassword !== '' ) passwordValidator( body.newPassword );
                docNumValidator( body.docnum );

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol, req.tokenData, body);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Validate if id user is a supervisor
            let response = await this.service.id( res, { id: body.id, rol: 'terapeuta' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            // Wait the response of supervisor service
            response = await this.service.edit( res, body, response.user );

            res.json( Boolean(res.statusCode !== 200) ? { error: response.message } : { success: response.message } );

        }
    }

    modifyState () {

        const permission = Permissions('admin and supervisor');

        return async ( req, res ) => {
            
            // Get the request params
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

            // Permissions
            let check = permission(req.tokenData.rol);
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Validate if id user is a therapist
            let response = await this.service.id( res, { id: body.id, rol: 'terapeuta' } );
            console.log(res.statusCode)
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ; 
            }

            response = await this.service.modifyState( res, body );
            console.log('e',response);

            if ( res.statusCode === SUCCESS ) res.json({ success: response.message});
            else res.json({ error: response.message })
        }
    }

    relatePatient () {
        
        const permission = Permissions('supervisor and the same therapist');
        
        return async ( req, res ) => {

            // Get request params
            let body = { therapist: req.params.therapist, patient: req.params.patient };

            // Doing the required validations
            try {

                body.therapist = integerValidator( body.therapist );
                body.patient = integerValidator( body.patient );

            } catch (error) {
                
                res.statusCode = BAD_REQUEST;
                res.json({ error: err.message });
                return ;

            }

            // Permissions
            let check = permission(req.tokenData.rol, req.tokenData, { id: body.therapist });
            if ( Boolean(check) ) {
                res.statusCode = FORBIDDEN;
                res.json(check);
                return ;
            }

            // Validate if body.therapist is a therapist
            let response = await this.service.id( res, { id: body.therapist, rol: 'terapeuta' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ; 
            }

            // Validate if body.patient is a patient
            response = await this.service.id( res, { id: body.patient, rol: 'paciente' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ; 
            }

            // Wait the response of therapist service
            response = await this.service.relatePatient( res, body );
            
            res.json(( res.statusCode === SUCCESS ) ? { success: response.message } : { error: response.message });
            
        }
    }
}

const therapistController = new TherapistController();

export default therapistController;