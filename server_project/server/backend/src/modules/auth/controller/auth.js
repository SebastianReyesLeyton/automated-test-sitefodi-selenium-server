import Controller from "../../../models/controller";
import AuthService from "../services/auth";
import { 
    DTO_LOGIN_REQUEST, 
    DTO_GET_ACCESS_TOKEN_REQUEST,
    DTO_DELETE_REFRESH_TOKEN
} from "../models/dto.in";
import { 
    dtoValidator, 
    emailValidator, 
    integerValidator, 
    passwordValidator 
} from "../../../lib/validator";
import ResponseOBJ from "../../../models/request";
import { JWT_USER_HEADER, JWT_HEADER_NAME } from "../../../conf/jwt";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";

class AuthController extends Controller {

    constructor () {
        super('auth', 'Auth', new AuthService());
    }

    login () {
        return async ( req, res ) => {
            
            // Get body form
            let body = req.body;  

            // Doing the required validations
            try {
                
                dtoValidator( body, DTO_LOGIN_REQUEST );
                emailValidator( body.email );
                passwordValidator( body.password );

            } catch (err) {
                console.log(err)
                res.statusCode = BAD_REQUEST;
                res.json(!Boolean(err.message) ? { error: err.error } : { error: err.message });
                return ;

            }

            // Wait the response of the auth service
            let response = await this.service.login( res, new ResponseOBJ(), body );

            res.json(response);
        }

    }


    getAccessToken () {

        return async ( req, res ) => {

            // Get body form
            let body = req.body

            // Doing the required validations
            try {
                
                dtoValidator( body, DTO_GET_ACCESS_TOKEN_REQUEST );
                body.id = integerValidator( body.id );

            } catch (err) {
                
                res.statusCode = BAD_REQUEST;
                res.json( { error: err.message } )
                return ;

            }

            // Waiting the response of the auth service
            let response = await this.service.getAccessToken( res, body );

            res.json( response );

        }
    }

    logout () {

        return async (req, res) => {

            // Get params and token data
            let body = {
                user: req.header(JWT_USER_HEADER),
                token: req.header(JWT_HEADER_NAME)
            };

            let tokenData = req.tokenData;

            // Validations
            try {
                body.user = integerValidator(body.user);
                dtoValidator(body, DTO_DELETE_REFRESH_TOKEN);
                if ( tokenData.id !== body.user ) throw new Error('access denied');
            } catch (error) {
                
                switch (error.message) {
                    case 'access denied':
                        res.statusCode = UNAUTHORIZED;
                        res.json({ error: 'inconsistencia en la petición' });
                        return ;
                    case 'no es un número entero':
                        res.statusCode = BAD_REQUEST;
                        res.json({ error: 'el encabezado de usuario no tiene el tipo adecuado' });
                        return ;
                    default:
                        res.statusCode = INTERNAL_ERROR;
                        res.json({ error: error.message });
                        return ;
                }

            }

            // Wait the response of the auth service
            let response = await this.service.deleteRefreshToken( res, body );
            response.message = 'sesión cerrada con exito';

            res.json( response );

        }

    }

}

const authController = new AuthController();

export default authController;