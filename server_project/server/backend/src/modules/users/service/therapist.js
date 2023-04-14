import UTF8 from "utf8";
import UserService from "./user";
import TherapistRepository from "../repository/therapist";
import { DTO_REGISTER_MYSQL, DTO_THERAPIST_MYSQL_RELATION, DTO_UPDATE_THERAPIST_MYSQL } from "../models/therapist/dto.out";
import { SUCCESS, INTERNAL_ERROR, BAD_REQUEST } from "../../../lib/httpCodes";
import { PasswordCipher } from "../../../lib/encrypt";

class TherapistService extends UserService {

    constructor () {
        super ( new TherapistRepository(), 'therapist' );
        this.cipher = PasswordCipher.getInstance();
    }

    async register ( res, obj ) {

        // Define the default values
        let ans = { message: 'registrado con éxito' };
        res.statusCode = SUCCESS;

        // Map the entry obj to DTO_REGISTER_MYSQL format and encrypt the password
        try {
            this.mapper.map( obj, DTO_REGISTER_MYSQL, (dto) => {

                dto.fullname = UTF8.encode(dto.name);
                dto.passcode = this.cipher.encrypt(dto.password);

                delete dto.name;
                delete dto.password;

                return dto;
            });
        } catch (err) {
            res.statusCode = INTERNAL_ERROR;
            ans = err;
            return ans;
        }

        // Wait to UserService register the user
        let response = await this.registerUser( res, Object.assign(this.mapper.obj,{ rol: 'terapeuta', doctype: 1 }));

        // Is it ok?
        if ( res.statusCode !== SUCCESS ) ans.message = response.message;

        return ans;

    }

    async getAll ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getAll( obj );

        // Assign the users to response
        ans.users = response;

        return ans;

    }

    async edit ( res, obj, user ) {

        // Define the default values
        let ans = { message: 'datos actualizados' };
        res.statusCode = SUCCESS;

        let response

        if ( obj.email !== user.email ) {

            // Check that not exists an user with the same email
            response = await this.email( res, obj );
            
            // If exists an user with the same email
            if ( res.statusCode === SUCCESS ) {
                res.statusCode = BAD_REQUEST;
                return { message: "ya existe un usuario con ese correo" }
            }

        }

        if ( obj.docnum !== user.docnum ) {

            // Check that not exists an user with the same docnum
            response = await this.docnum( res, obj );

            // If exists an user with the same docnum
            if ( res.statusCode === SUCCESS ) {
                res.statusCode = BAD_REQUEST;
                return { message: "ya existe un usuario con ese número de documento" }
            }

        }

        // Reset status code response
        res.statusCode = SUCCESS;

        // Map the entry obj to  format
        try {
            this.mapper.map( obj, DTO_UPDATE_THERAPIST_MYSQL, (dto) => {

                dto.fullname = UTF8.encode(dto.name);
                dto.passcode = (dto.newPassword === '') ? user.passcode : this.cipher.encrypt(dto.newPassword);

                delete dto.name;
                delete dto.newPassword;

                return dto;
            } );

        } catch (err) {
            res.statusCode = INTERNAL_ERROR;
            ans = err;
            return ans;
        }

        // Wait the response of repository
        response = await this.repository.setData(this.mapper.obj);

        // If not modify a register
        if ( response.affectedRows !== 1 ) {
            res.statusCode = 400;
            ans.message = "no se pudo actualizar el usuario";
        }

        return ans;

    }

    async relatePatient ( res, obj ) {

        // Define the default values
        let ans = { message: 'relación creada' };
        res.statusCode = SUCCESS;

        // Map the entry obj to format
        try {
            this.mapper.map( obj, DTO_THERAPIST_MYSQL_RELATION, (dto) => {

                dto.idTherapist =  dto.therapist;
                dto.idPatient = dto.patient;

                delete dto.therapist;
                delete dto.patient;

                return dto;
            } );

        } catch (err) {
            res.statusCode = INTERNAL_ERROR;
            ans = err;
            return ans;
        }

        // Validate that relation does not exist
        let response = await this.getRelation( res, this.mapper.obj );
        
        if ( res.statusCode === SUCCESS ) {
            res.statusCode = BAD_REQUEST;
            return { message: 'la relación ya existe' };
        }

        // Reset the res status code
        res.statusCode = SUCCESS;

        // Register the new relation
        response = await this.repository.registerRelation( this.mapper.obj );

        // The register was successful?
        if ( response.affectedRows === 1 ) { 
            ans.id = response.insertId;
        } else {
            res.statusCode = INTERNAL_ERROR;
            ans.message = response.message;
        }

        return ans;

    }

}

export default TherapistService;