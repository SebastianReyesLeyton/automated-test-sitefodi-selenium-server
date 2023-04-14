import AuthController from "../modules/auth/controller/auth";
import UserController from "../modules/users/controller/user";
import { JWT_SECRET_PASSWORD } from "../conf/keys";
import { 
    JWT_USER_HEADER,
    JWT_HEADER_NAME,
    JWT_REFRESH_LENGTH,
    JWT_AUTHENTICATION_WORD
} from "../conf/jwt";
import jwt from "jsonwebtoken";
import ResponseOBJ from "../models/request";
import { integerValidator } from "./validator";
import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from "./httpCodes";
import { SUCCESS } from "./httpCodes";

export const validateAccessToken = ( ) => {

    return async (req, res, next) => {

        // If not exists the header defined
        if (!req.header(JWT_HEADER_NAME)) {
            res.statusCode = BAD_REQUEST;
            res.json({ error: 'no hay token' });
            return ;
        }

        // If not exists the header defined
        if (!req.header(JWT_USER_HEADER)) {
            res.statusCode = BAD_REQUEST;
            res.json({ error: 'no se ha definido el usuario' });
            return ;
        }

        // Obtain the token stored in headerName header
        const token = req.header(JWT_HEADER_NAME).split(' ');

        // If token header is not defined
        if ( token[0] !== JWT_AUTHENTICATION_WORD ) {
            res.statusCode = BAD_REQUEST;
            res.json({ error: 'token no valido' });
            return ;
        } 

        // Get the access and refresh tokens
        let tokenBody = token[1].split('.');
        let refreshToken = tokenBody[1].slice( -JWT_REFRESH_LENGTH );
        tokenBody = `${tokenBody[0]}.${tokenBody[1].slice(0, -JWT_REFRESH_LENGTH)}.${tokenBody[2]}`;
        
        try {
            // Is token valid?
            req.tokenData = jwt.verify( tokenBody, JWT_SECRET_PASSWORD );
            if ( req.tokenData.id !== integerValidator(req.header(JWT_USER_HEADER)) ) throw new Error('access denied');

            // Check if user exists and is available 
            let response = new ResponseOBJ();
            await UserController.available()({ body: { id: String(req.tokenData.id), rol: req.tokenData.rol } }, response);

            // If user exists, check whether is active
            if ( response.statusCode === SUCCESS ) {
                if ( response.data.success === 'no activo' ) {
                    await AuthController.logout()(req, response);
                    res.statusCode = FORBIDDEN;
                    res.json({ error: 'permisos denegados' })
                } else {
                    next();
                }
            } else {
                res.statusCode = FORBIDDEN;
                res.json({ error: 'permisos denegados' })
            }


        } catch (error) {
            
            switch (error.message) {
                case 'jwt expired': 
                    // When token is expired, try to obtain a new access token
                    const body = {
                        id: req.header(JWT_USER_HEADER),
                        token: refreshToken
                    };

                    let response = new ResponseOBJ();
                    
                    // Wait the response of Auth module
                    await AuthController.getAccessToken()( { body }, response );
                    
                    if ( Boolean(response.data.accessToken) ) {
                        // If there is a refresh token related to user, pass to query and continue with the request 
                        res.json(response.data);
                    } else {
                        // Return an access error
                        res.statusCode = response.statusCode;
                        res.json({ error: 'token no valido' });
                    }
                    
                    break;
                case 'access denied':
                    res.statusCode = UNAUTHORIZED;
                    res.json({ error: 'inconsistencia en la petición' });
                    break;
                default:
                    console.log(error);
                    res.statusCode = UNAUTHORIZED;
                    res.json({ error: 'inconsistencia en la petición' });
                    break;
            }
        }

    }
}