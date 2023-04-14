import UTF8 from "utf8";
import Service from "../../../models/service";
import PatientController from "../../users/controller/patient";
import TherapyRepository from "../repository/therapy";
import UserController from "../../users/controller/user";
import { DTO_ADD_THERAPY, DTO_GET_NOT_FINISHED_THERAPIES, DTO_GET_FINISHED_THERAPIES } from "../models/dto.out";
import ResponseOBJ from "../../../models/request";
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR  } from "../../../lib/httpCodes";

class TherapyService extends Service {

    constructor ( repository = new TherapyRepository, name = 'therapy' ) {
        super({
            modules: {
                patient: PatientController,
                user: UserController
            },
            repository,
            module: 'Therapy',
            name
        });
    }

    async schedule ( req, res, obj ) {

        // Define the default response
        let ans = { message: 'agendado con éxito' };
        res.statusCode = SUCCESS;

        let response = new ResponseOBJ();

        // Get the relation id
        await this.connections.patient.getRelation()(req, response);
        if (response.statusCode !== SUCCESS) {
            res.statusCode = BAD_REQUEST;
            return response.data;
        }

        const idRelation = response.data.relation.id;

        // Map the obj to DTO_ADD_THERAPY format
        this.mapper.map(obj, DTO_ADD_THERAPY, (dto) => {

            dto.urlTherapy = dto.url;
            dto.dateT = dto.date;
            dto.idRelation = idRelation;
            dto.idTest = dto.test;

            delete dto.url;
            delete dto.date;
            delete dto.patient;
            delete dto.test;

            return dto;
        })

        console.log(this.mapper.obj);

        // Wait the response of repository
        response = await this.repository.addTherapy(this.mapper.obj);

        // The register was successful?
        if ( response.affectedRows !== 1 ) {
            res.statusCode = INTERNAL_ERROR;
            ans.message = response.message;
        }

        return ans;

    }

    async getNotFinished ( res, obj ) {

        // Define the default response
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        let response = new ResponseOBJ();

        // Get relation ids
        await this.connections.user.getRelations()({ body: { id: obj.id, rol: obj.rol }}, response);
        if (response.statusCode !== SUCCESS) {
            res.statusCode = BAD_REQUEST;
            return response.data;
        }

        response = await this.repository.getNotFinishedTherapies(Object.assign({ relations: response.data.relations.map((item) => item.id) }, obj));

        response = response.map((item) => {
            
            try {

                this.mapper.map( {}, DTO_GET_NOT_FINISHED_THERAPIES, (dto) => {
                    
                    
                    dto.id = item.id;
                    dto.url = item.urlTherapy;
                    dto.date = item.dateT;
                    dto.test = (item.idTest === null) ? -1 : item.idTest;
                    dto.state = item.stateT;
                    dto.currentQuestion = item.questionLocation;
                    
                    console.log(dto);

                    return dto;
                });
                
            } catch (err) {
                console.log('Error', err);
            }
            
            return this.mapper.obj;

        });

        ans.therapies = response;

        return ans;

    }

    async getFinished ( res, obj ) {

        // Define the default response
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        let response = await this.repository.getFinishedTherapies(obj);

        console.log(response);

        response = response.map((item) => {
            
            try {

                this.mapper.map( {}, DTO_GET_FINISHED_THERAPIES, (dto) => {
                    
                    
                    dto.id = item.id;
                    dto.url = item.urlTherapy;
                    dto.date = item.dateT;
                    dto.test = (item.idTest === null) ? -1 : item.idTest;
                    dto.currentQuestion = item.questionLocation;

                    console.log(dto);

                    return dto;
                });
                
            } catch (err) {
                console.log('Error', err);
            }
            
            return this.mapper.obj;

        });

        ans.therapies = response;

        return ans;

    }

    async updateQuestionLocation ( res, obj ) {

        // Define the default response
        let ans = { message: 'actualizado' };
        res.statusCode = SUCCESS;

        let response = await this.repository.updateQuestionLocation(obj);

        if ( response.affectedRows !== 1 ) {
            ans.message = 'no se pudo actualizar';
            res.statusCode = BAD_REQUEST;
        }

        return ans;
    }

    async finishTherapy ( res, obj ) {
        
        // Define the default response
        let ans = { message: 'actualizado' };
        res.statusCode = SUCCESS;

        let response = await this.repository.finishTherapy(obj);

        if ( response.affectedRows !== 1 ) {
            ans.message = 'no se pudo actualizar';
            res.statusCode = BAD_REQUEST;
        }

        return ans;
    }

    async getTherapy( res, obj ) {

        // Define the default response
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        let response = await this.repository.get(obj);

        if ( response.length !== 1 ) {
            ans.message = 'no se encontró el valor buscado';
            res.statusCode = BAD_REQUEST;
        } else {
            ans.therapy = response[0];
        }

        return ans;

    }

}

export default TherapyService;