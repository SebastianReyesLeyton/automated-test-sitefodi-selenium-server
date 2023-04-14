import UTF8 from "utf8";
import Controller from "../../../models/controller";
import SupervisorService from "../service/supervisor";
import { DTO_REGISTER, DTO_UPDATE_SUPERVISOR } from "../models/supervisor/dto.in";
import { docNumValidator, dtoValidator, emailValidator, integerValidator, isActiveValidator, passwordValidator } from "../../../lib/validator";
import { DTO_SUPERVISOR_RESPONSE, DTO_SUPERVISORS_RESPONSE } from "../models/supervisor/dto.out";
import { SUCCESS, BAD_REQUEST, FORBIDDEN } from "../../../lib/httpCodes";
import Permissions from "../../../lib/permissions"; 

class SupervisorController extends Controller {

    constructor () {
        super ('supervisor', 'User', new SupervisorService());
    }

    register () {

        const permission = Permissions('admin');

        return async ( req, res ) => {
            
            // Get the body request from
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

            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.json( Boolean(err.message) ? { error: err.message } : { error: err.error } );
                return ;

            }

            // Wait the response of supervisor service
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

        const permission = Permissions('admin and the same supervisor');

        return async ( req, res ) => {
            
            // Get the params
            let body = { id: req.params.id, rol: 'supervisor' }

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
                
                this.mapper.map( response.user, DTO_SUPERVISOR_RESPONSE, (dto) => {

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

        const permission = Permissions('admin');

        return async ( req, res ) => {

            // Get request params
            let body = { rows: req.params.rows, offset: req.params.offset, rol: 'supervisor' };

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

                    this.mapper.map( element, DTO_SUPERVISORS_RESPONSE, (dto) => {

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

        const permission = Permissions('admin and the same supervisor');

        return async ( req, res ) => {

            // Get request body
            let body = req.body;

            // Doing the required validations
            try {

                dtoValidator( body, DTO_UPDATE_SUPERVISOR );
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
            let response = await this.service.id( res, { id: body.id, rol: 'supervisor' } );
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

        const permission = Permissions('admin');

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

            // Validate if id user is a supervisor
            let response = await this.service.id( res, { id: body.id, rol: 'supervisor' } );
            if ( res.statusCode !== SUCCESS ) {
                res.json({ error: response.message });
                return ;
            }

            response = await this.service.modifyState( res, body );

            if ( res.statusCode === SUCCESS ) res.json({ success: response.message});
            else res.json({ error: response.message })
        }
    }

}

const supervisorController = new SupervisorController();

export default supervisorController;