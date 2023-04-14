import fs from "fs";
import UTF8 from "utf8";
import Service from "../../../models/service";
import TestRepository from "../repository/test";
import { dtoValidator, integerValidator } from "../../../lib/validator";
import { DTO_ADD_CARD_QUESTION } from "../models/dto.in";
import { DTO_MYSQL_TEST_CREATION, DTO_TESTS_RESPONSE, DTO_QUESTION_TYPES_RESPONSE, DTO_TEST_RESPONSE, DTO_ADD_CARD_QUESTION_MYSQL, DTO_TEST_QUESTIONS_RESPONSE } from "../models/dto.out";
import { SUCCESS, BAD_REQUEST, INTERNAL_ERROR } from "../../../lib/httpCodes";
import { TEST_PATH } from "../../../conf/tests";

class TestService extends Service {

    constructor ( repository = new TestRepository, name = 'test' ) {
        super({
            repository, 
            module: 'Test',
            name
        });
    }

    __create ( res, id ) {
        
        // Set the default response
        let ans = { message: 'creada con éxito' }
        res.statusCode = SUCCESS;

        // Try of create a folder to id
        try {
            if (!fs.existsSync(`${TEST_PATH}/${id}`)){
                fs.mkdirSync(`${TEST_PATH}/${id}`)
                console.log(fs.existsSync(`${TEST_PATH}/${id}`))
            } 
        } catch (err) {
            console.log(err);
            res.statusCode = BAD_REQUEST;
            return { message: 'ya tiene una carpeta asociada' };
        }

        return ans;

    } 

    async create ( res, obj ) {

        // Define the default values
        let ans = { message: 'creada con éxito' };
        res.statusCode = SUCCESS;

        // Map the obj to DTO_MYSQL_TEST_CREATION format
        try {
            this.mapper.map( {}, DTO_MYSQL_TEST_CREATION, (dto) => {
                
                dto.tName = UTF8.encode(obj.name);
                dto.tDescription = UTF8.encode(obj.description);

                return dto;
            })
        } catch (err) {
            res.statusCode = INTERNAL_ERROR;
            ans = err;
            return ans;
        }

        // Validate the existence of the test
        let response = await this.repository.getByName(this.mapper.obj);
        if ( response.length ) {
            res.statusCode = BAD_REQUEST;
            return { message: 'Ya existe un test con ese nombre' };
        }

        // Create the new test
        response = await this.repository.createTest(this.mapper.obj);
        if ( response.affectedRows === 1 ) {
            response = this.__create( res, response.insertId);
            if ( res.statusCode !== SUCCESS ) {
                return { message: response.message };
            }
        }

        return ans;

    }

    async getAll ( res, obj ) {
    
        // Define the default values
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getAll( obj );

        // Map the response to DTO_TESTS_RESPONSE format
        response.map((item) => {
            try {
                this.mapper.map( item, DTO_TESTS_RESPONSE, (dto) => {
                    
                    dto.name = UTF8.decode(dto.tName);
                    dto.description = UTF8.decode(dto.tDescription);

                    delete dto.tName;
                    delete dto.tDescription;
                    delete dto.isEditable;
                    
                    return dto;
                } )
            } catch (err) {
                console.log(err);
            }

            return item;
        })

        // Assign the response to ans
        ans.tests = response;

        return ans;

    }

    async getQuestionTypes ( res ) {

        // Define the default values
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getQuestionTypes();

        // Map the database response to DTO_QUESTION_TYPES_RESPONSE format
        response.map((item) => {

            try {
                
                this.mapper.map( item, DTO_QUESTION_TYPES_RESPONSE, (dto) => {

                    dto.type = UTF8.decode(dto.qtype);
                    dto.description = UTF8.decode(dto.descriptionP);

                    delete dto.qtype;
                    delete dto.descriptionP;

                    return dto;
                })

            } catch (err) {
                console.log(err);
            }
        });

        // Assign the response
        ans.types = response;

        return ans;

    }

    async getTest ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrado' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getById( obj );

        // If test is not found
        if ( !response.length ) {
            ans.message = 'prueba no encontrada';
            res.statusCode = BAD_REQUEST;
        } else {
            this.mapper.map( {}, DTO_TEST_RESPONSE, (dto) => {
                
                dto.id = response[0].id;
                dto.name = UTF8.decode(response[0].tName);
                dto.description = UTF8.decode(response[0].tDescription);

                return dto;
            });
            ans.test = this.mapper.obj;
        }

        return ans;
    }

    async publish ( res, obj ) {

        // Define the default values
        let ans = { message: 'publicado' };
        res.statusCode = SUCCESS;

        // Validate that test exists
        let response = await this.repository.getByIdState( Object.assign({isEditable: 1}, obj) );

        // If test does not exists or already is published
        if ( response.length !== 1 ) {
            res.statusCode = BAD_REQUEST;
            return { message: 'prueba no encontrada' };
        }

        // Publish the test
        response = await this.repository.publish( obj );

        return ans;

    }

    async addQuestion ( res, obj, params ) {

        // Define the default values
        let ans = { message: 'agregada con éxito' };
        res.statusCode = SUCCESS;

        // Validate that question type exists
        let response = await this.repository.getQuestionById( { id: params.idQuestionType });
        if ( !response.length ) {
            res.statusCode = BAD_REQUEST;
            return { message: 'ese tipo de prueba no existe' };
        }

        // Assign the question type name
        const questionName = response[0].qtype;

        // Create a new question
        response = await this.repository.createQuestion({ idtype: params.idQuestionType });
        if ( response.affectedRows !== 1 ) {
            res.statusCode = INTERNAL_ERROR;
            console.log(response);
            return { message: 'no se pudo crear la pregunta' };
        }

        console.log(response)

        // Get the new question id
        const questionId = response.insertId;

        // Register the new question into the test
        response = await this.repository.addQuestion({ idTest: params.idTest, idQuestion: questionId });
        if ( response.affectedRows !== 1 ) {
            res.statusCode = INTERNAL_ERROR;
            console.log(response);
            return { message: 'no se pudo registrar la pregunta' };
        }

        console.log(response);

        // Validate the body request according to question type name
        try {
            
            switch (questionName) {
                case 'Carta':
                    dtoValidator( obj, DTO_ADD_CARD_QUESTION );
                    obj.yes = integerValidator(obj.yes);
                    obj.no = integerValidator(obj.no);
                    break;
                default:
                    throw new Error('pregunta no implementada');
            }

        } catch (err) {
            res.statusCode = INTERNAL_ERROR;
            return { message: err };
        }

        switch (questionName) {
            case 'Carta':
                
                // Store the image
                response = await this.repository.storeImage({ imgURL: obj.image });
                if ( response.affectedRows !== 1 ) {
                    res.statusCode = INTERNAL_ERROR;
                    console.log(response);
                    return { message: 'no se pudo almacenar la imagen' };
                }

                console.log(response, questionId);

                // Get the image id
                const imageId = response.insertId;

                // Map the obj to DTO_ADD_CARD_QUESTION_MYSQL format
                try {
                    
                    this.mapper.map( {}, DTO_ADD_CARD_QUESTION_MYSQL, (dto) => {

                        dto.id = questionId;
                        dto.therapistTitle = (obj.therapistTitle);
                        dto.patientTitle = (obj.patientTitle);
                        dto.cardnameT = obj.therapistCardName;
                        dto.cardnameP = (obj.patientCardName);
                        console.log(dto);
                        dto.img = imageId
                        dto.yesValue = obj.yes;
                        dto.noValue = obj.no;

                        console.log('dto',dto);

                        return dto;
                    } );

                } catch (err) {
                    console.log(err);
                }

                console.log(this.mapper.obj);

                // Store the question info
                response = await this.repository.createCardQuestion( this.mapper.obj );
                if ( response.affectedRows !== 1 ) {
                    res.statusCode = INTERNAL_ERROR;
                    console.log(response);
                    return { message: 'no se pudo almacenar la pregunta' };
                }

                break;
            default:
                break;
        }

        return ans;
    }

    async getQuestionsByTest ( res, obj ) {

        // Define the default values
        let ans = { message: 'encontrados' };
        res.statusCode = SUCCESS;

        // Wait the response of repository and map the response
        let response = await this.repository.getQuestions(obj);
        response.map((item) => {

            try {
                this.mapper.map(item, DTO_TEST_QUESTIONS_RESPONSE, (dto) => {
                    
                    dto.test = dto.idTest;
                    dto.question = dto.idQuestion;
                    dto.type = UTF8.decode(dto.qtype);
                    dto.order = dto.questionOrder;

                    delete dto.idTest; 
                    delete dto.idQuestion; 
                    delete dto.questionOrder; 
                    delete dto.qtype

                    return dto;
                })    
            } catch (err) {
                console.log(err);
            }

            return item
        });

        ans.questions = response;

        return ans;

    }

    async getNumberOfQuestionsByTest ( res, obj ) {

        // Define the default values
        let ans = { message: 'valor encontrado' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getNumberOfQuestions( obj );

        if ( response.length === 0 ) {
            ans.message = 'prueba no encontrada';
            res.statusCode = BAD_REQUEST;
        } else {
            ans.quantity = response[0]['MAX(questionOrder)'];
        }

        return ans;

    }

    async getQuestion ( res, obj ) {

        // Define the default values
        let ans = { message: 'pregunta encontrada' };
        res.statusCode = SUCCESS;

        // Wait the response of repository
        let response = await this.repository.getTestQuestion(obj);

        if ( response.length === 0 ) {
            res.statusCode = BAD_REQUEST;
            return { message: 'error en los parámetro suministrados' }
        } 

        const questionType = response[0].qtype;

        switch (response[0].qtype) {
            case 'Carta':
                response = await this.repository.getCardQuestion({ id: response[0].idQuestion })
                break;
            default:
                break;
        }

        if ( response.length === 0 ) {
            res.statusCode = INTERNAL_ERROR;
            return { message: 'error en la base de datos' }
        } 

        ans.question = Object.assign({type: questionType}, response[0]);

        return ans;

    }

}

export default TestService;