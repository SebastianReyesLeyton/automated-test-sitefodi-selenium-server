import UTF8 from "utf8";
import Controller from '../../../models/controller';
import UserService from '../service/user';
import { DTO_LOGIN_RESPONSE } from '../models/user/dto.out';
import { DTO_EMAIL_REQUEST, DTO_LOGIN_REQUEST, DTO_AVALIABLE_REQUEST } from '../models/user/dto.in';
import { emailValidator, dtoValidator, passwordValidator, integerValidator } from '../../../lib/validator'; 
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";
class UserController extends Controller {

    constructor () {
        super('user', 'User', new UserService());
    }

    email () { 
        return async (req, res) => {
            
            // Get the body request form
            let body = req.body;
            
            try {

                dtoValidator( body, DTO_EMAIL_REQUEST );
                emailValidator( body.email );
                
            } catch (err) {
                res.statusCode = BAD_REQUEST;
                res.send({ error: err.message });
                return ;
            }

            let response = await this.service.email( res, body );
            res.json(response);
        }
    }

    available () {
        return async (req, res) => {

            // Get the body request 
            let body = req.body;

            try {
                dtoValidator( body, DTO_AVALIABLE_REQUEST );
                body.id = integerValidator( body.id );
                
            } catch (err) {
                res.statusCode = BAD_REQUEST;
                res.send({ error: err.message });
                return ;
            }

            let response = await this.service.available(res, body);
            
            res.json( (res.statusCode === SUCCESS) ? { success: response.message } : { error: response.message });
        }
    }

    emailPassword () {
        return async (req, res) => {

            // Get body form
            let body = req.body;

            // Doing the validations required
            try {

                dtoValidator( body, DTO_LOGIN_REQUEST );
                emailValidator( body.email );
                passwordValidator( body.password );
                
            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.send({ error: err.message });
                return ;

            }

            // Wait the response of user service
            let response = await this.service.emailPassword(res, body);

            if ( res.statusCode == SUCCESS ) {

                // Map user info to DTO_LOGIN_RESPONSE
                try {
    
                    this.mapper.map( response.user, DTO_LOGIN_RESPONSE, (dto) => {
                        return {
                            id: dto.id,
                            name: UTF8.decode(dto.fullname),
                            rol: dto.rol
                        };
                    });
    
                    response.user = this.mapper.obj;
                    res.json(response);
    
                } catch (err) {
                    
                    res.statusCode = INTERNAL_ERROR;
                    res.json(err);
    
                }
            } else {
                if (Boolean(response.message)) {
                    response.error = response.message;
                    delete response.message;
                }
                res.json(response);
            }

        }
    }

    getRelations () {
        return async ( req, res ) => {

            // Get the body request
            let body = req.body;

            // Doing the validations required
            try {

                body.id = integerValidator(body.id);
                
            } catch (err) {

                res.statusCode = BAD_REQUEST;
                res.send({ error: err.message });
                return ;

            }

            // Wait the response of user service
            let response = await this.service.getRelations(res, body);

            res.json(response);

        }
    }
}

const userController = new UserController();

export default userController;