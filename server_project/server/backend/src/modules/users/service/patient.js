import UTF8 from "utf8";
import UserService from "./user";
import PatientRepository from "../repository/patient";
import { PasswordCipher } from "../../../lib/encrypt";
import { DTO_REGISTER_MYSQL, DTO_UPDATE_PATIENT_MYSQL } from "../models/patient/dto.out";
import { SUCCESS, INTERNAL_ERROR, BAD_REQUEST } from "../../../lib/httpCodes";

class PatientService extends UserService {

    constructor () {
        super( new PatientRepository(), 'patient' );
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
        let response = await this.registerUser( res, Object.assign(this.mapper.obj,{ rol: 'paciente'}));

        // If the user could be registered, add the rest of data into the patient space
        if ( res.statusCode === SUCCESS ) {
            
            obj = this.mapper.obj;
            obj.id = response.id;

            response = await this.repository.registerPatient( obj );
            
            // The register was successful?
            if ( response.affectedRows !== 1 ) {
                res.statusCode = INTERNAL_ERROR;
                ans.message = response.message;
            } else {
                ans.id = obj.id;
            }

        } else ans = response;

        return ans;

    } 

    async get ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        // Wait the response of the repository
        let response = await this.repository.getPatient(obj);

        // If found the patient
        if ( response.length ) ans.user = Object.assign(obj, response[0]);
        else {
            res.statusCode = INTERNAL_ERROR;
            ans.message = 'paciente no encontrado';
        }

        return ans;

    }
    
    async getAll ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getPatients( obj );

        // Assign the users from obtained response
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
            this.mapper.map( obj, DTO_UPDATE_PATIENT_MYSQL, (dto) => {

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
            return { message: "no se pudo actualizar el usuario" };
        }

        // Wait the response of repository
        response = await this.repository.setPatientData(this.mapper.obj);

        // If not modify a register
        if ( response.affectedRows !== 1 ) {
            res.statusCode = 400;
            ans.message = "no se pudo actualizar el usuario" ;
        }

        return ans;

    }

}

export default PatientService;