import jwt from 'jsonwebtoken';
import refresh from 'rand-token';
import Service from "../../../models/service";
import UserController from "../../users/controller/user";
import AuthRepository from "../repository/auth";
import { 
    DTO_AUTH_DATABASE_REGISTER,
    DTO_GET_REFRESH_TOKEN
} from "../models/dto.out";
import { 
    JWT_REFRESH_LENGTH, 
    JWT_AUTHENTICATION_WORD 
} from "../../../conf/jwt";
import { JWT_SECRET_PASSWORD } from "../../../conf/keys";
import { DTO_TOKEN_CONTENT } from '../models/dto.in';
import { SUCCESS, UNAUTHORIZED } from "../../../lib/httpCodes";

class AuthService extends Service {

    constructor () {
        super( {
            modules: {
                user: UserController
            },
            repository: new AuthRepository(),
            module: 'Auth',
            name: 'auth'
        });
        this.refreshTime = 5*60*1000;
        this.accessTime = '30s'
    }

    __createAccessToken ( obj ) {
        return jwt.sign(
            obj,
            JWT_SECRET_PASSWORD,
            {
                expiresIn: this.accessTime
            });
    } 

    __createRefreshToken ( ) {
        return refresh.uid(JWT_REFRESH_LENGTH);
    }

    __getAccessToken ( obj ) {

        // Create both access and refresh tokens
        let token = this.__createAccessToken(obj);
        let refresh = obj.refresh;

        // Divide token in its different components
        let slices = token.split('.');

        return `${JWT_AUTHENTICATION_WORD} ${slices[0]}.${slices[1]}${refresh}.${slices[2]}`;
    }

    __extractRefreshToken ( accessToken ) {
        return accessToken.split(' ')[1].split('.')[1].slice( -JWT_REFRESH_LENGTH );
    } 

    async login ( res, response, obj ) {

        // Wait the response of user module
        await this.connections.user.emailPassword()({ body: obj }, response );

        // Define the res.statusCode to obtained
        res.statusCode = response.statusCode;
        if ( res.statusCode == SUCCESS ) {
            response.data.token = await this.createToken(response.data.user);
        }

        return response.data;
    }

    async createToken ( obj ) {

        // Create both access and refresh tokens
        let token = this.__createAccessToken(obj);
        let refresh = this.__createRefreshToken();

        // Divide token in its different components
        let slices = token.split('.');

        // Get date
        let date = new Date();
        date = new Date( date.getTime() + this.refreshTime );

        try {
            // Create auth database register DTO
            this.mapper.map( {}, DTO_AUTH_DATABASE_REGISTER, (dto) => {
                dto.token = refresh;
                dto.expire = date;
                dto.user = obj.id;
                return dto;
            } );

            // Waiting the response from auth repository
            let response = await this.repository.registerRefreshToken( this.mapper.obj );

            // If exists any error, throw an exception
            if ( !('insertId' in response) ) {
                throw new Error('missing data');
            }

            return `${JWT_AUTHENTICATION_WORD} ${slices[0]}.${slices[1]}${refresh}.${slices[2]}`;

        } catch (err) {
            console.log(err);
        }
    }

    async getAccessToken ( res, obj ) {

        // Define the default response
        let ans = { message: 'tiene refresh token' };
        res.statusCode = SUCCESS;

        try {

            // Map new object with DTO_GET_REFRESH_TOKEN format type
            this.mapper.map( {}, DTO_GET_REFRESH_TOKEN, (dto) => {
                dto.user = obj.id;
                dto.token = obj.token;
                return dto;
            });
            
            // Wait the response of repository
            let response = await this.repository.getRefreshToken(this.mapper.obj);
            
            if ( response.length ) {
                
                // Map the repository response to DTO_TOKEN_CONTENT FORM
                this.mapper.map( response[0], DTO_TOKEN_CONTENT, (dto) => {
                    dto.id = dto.user;
                    dto.name = dto.fullname;

                    delete dto.user;
                    delete dto.fullname;
                    return dto;
                } );

                // Assign the mapped object to response and add refresh token feature
                response = this.mapper.obj;
                response.refresh = obj.token;

                // Build the new token
                ans.accessToken = await this.__getAccessToken(Object.assign({}, response));

            }
            else {
                ans.message = 'no existe refresh token';
                res.statusCode = UNAUTHORIZED;
            }

            return ans;

        } catch (err) {
            console.log(err);
        }

    }

    async deleteRefreshToken ( res, obj ) {

        // Define the default values
        let ans = { message: 'eliminado' };
        res.statusCode = SUCCESS;

        obj.token = this.__extractRefreshToken(obj.token);

        // Wait the response of auth repository
        let response = await this.repository.removeRefreshToken( obj );

        return ans;

    }

}

export default AuthService;