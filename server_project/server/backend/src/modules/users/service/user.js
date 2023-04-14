import Service from "../../../models/service";
import UserRepository from "../repository/user";
import { PasswordCipher } from "../../../lib/encrypt";
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";

class UserService extends Service {

    constructor ( repository = new UserRepository(), name = 'user') {
        super({
            repository, 
            module: 'User', 
            name
        });
        this.cipher = PasswordCipher.getInstance();
    }

    async id ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        let response;

        // Wait the response of repository
        if ( Boolean(obj.rol) ) response = await this.repository.idRol( obj );
        else response = await this.repository.id( obj );

        // Check if user exists, and built the corresponding answers
        if ( response.length ) { ans.user = response[0]; } 
        else {
            ans.message = (Boolean(obj.rol)) ? `no existe un ${obj.rol} con ese id` : 'no existe un usuario con ese id';
            res.statusCode = BAD_REQUEST;
        }

        return ans;
    }

    async available ( res, obj ) {

        // Define the default values
        let ans = { message: 'activo' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.available(obj);

        // If the user exists
        if ( response.length ) {
            ans.message = ( response[0].isActive ) ? ans.message : 'no activo';
        } else {
            ans.message = `no existe un ${obj.rol} con id: ${obj.id} y email: ${obj.email}`;
            res.statusCode = BAD_REQUEST;
        }

        return ans;
    }

    async email ( res, obj ) {
        
        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.email(obj);

        // Check if user exists, and built the corresponding answers
        if ( response.length ) { ans.user = response[0]; } 
        else {
            ans.message = 'no existe un usuario con ese correo';
            res.statusCode = BAD_REQUEST;
        }

        return ans;

    }

    async docnum ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado'}
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.docnum(obj);

        // Check if user exists, and built the corresponding answers
        if ( response.length ) { ans.user = response[0]; }
        else {
            ans.message = 'no existe un usuario con ese número de documento';
            res.statusCode = BAD_REQUEST;
        }

        return ans;

    }

    async emailPassword ( res, obj ) {

        // Calls the email method and wait its response
        let ans = await this.email( res, obj );

        // If response is successful, compare the passwords and assign the result values depending on result
        if ( res.statusCode === SUCCESS ) {

            if ( ans.user.isActive === 0 ) {
                res.statusCode = BAD_REQUEST;
                ans.message = 'cuenta deshabilitada';
                delete ans.user;
            } else if ( !this.cipher.compare( obj.password, ans.user.passcode )) {
                res.statusCode = BAD_REQUEST;
                ans.message = 'las contraseñas no coinciden';
                delete ans.user;
            }
            
        }

        return ans;
    }

    async checkUserExists ( res, obj ) {

        // Define the default values
        let ans = { message: 'usuario no encontrado' };
        res.statusCode = SUCCESS;

        // Check that not exists an user with the same email
        await this.email( res, obj );
        
        // If exists an user with the same email
        if ( res.statusCode === SUCCESS ) {
            res.statusCode = BAD_REQUEST;
            return { message: "ya existe un usuario con ese correo" }
        }

        // Check that not exists an user with the same docnum
        await this.docnum( res, obj );

        // If exists an user with the same docnum
        if ( res.statusCode === SUCCESS ) {
            res.statusCode = BAD_REQUEST;
            return { message: "ya existe un usuario con ese número de documento" }
        }

        // Reset status code response
        res.statusCode = SUCCESS;

        return ans;
    }

    async registerUser ( res, obj ) {

        // Define the default values
        let ans = { message: 'registrado con éxito' };
        res.statusCode = SUCCESS;

        // Check if exists an user with the same data
        let check = await this.checkUserExists( res, obj );
        if ( res.statusCode != SUCCESS ) return check;

        // Reset status code response
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.register(obj);

        // The register was successful?
        if ( response.affectedRows === 1 ) { 
            ans.id = response.insertId;
        } else {
            res.statusCode = INTERNAL_ERROR;
            ans.message = response.message;
        }

        return ans;

    }

    async modifyState ( res, obj ) {

        // Define the default values
        let ans = { message: 'estado actualizado' };
        res.statusCode = SUCCESS;

        // Modify the user state
        let response = await this.repository.setState( obj );

        if ( response.affectedRows !== 1 ) {
            ans.message = 'el usuario no se ha podido actualizar';
            res.statusCode = BAD_REQUEST;
        }

        return ans;

    }

    async getRelation ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        // Get user relation
        let response = await this.repository.getRelation( obj );

        // If relation does not exists return an error message
        if ( response.length !== 1 ) {
            ans.message = 'la relación no existe';
            res.statusCode = BAD_REQUEST;
        } else {
            ans.relation = response[0];
        }

        return ans;

    }

    async getRelations ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;
        
        // Wait the response of user repository
        let response = await this.repository.getUserRelations({ id: obj.id }, obj.rol);

        // Add the response to answer
        ans.relations = response;

        return ans;

    }

}

export default UserService;