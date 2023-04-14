import { getSupervisor } from "../../../actions/supervisor";
import { getTherapist } from "../../../actions/therapist";
import { getPatient } from "../../../actions/patient";

const showUserContent = {
    supervisor: {
        rol: 'Supervisor',
        initialValues: {
            name: '',
            email: '',
            docnum: '',
            doctype: ''
        },
        action: getSupervisor,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre'
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de documento',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Tipo de documento',
            }
        ]
    },
    therapist: {
        rol: 'Terapeuta',
        initialValues: {
            name: '',
            email: '',
            docnum: '',
            doctype: ''
        },
        action: getTherapist,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre'
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de documento',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Tipo de documento',
            }
        ]
    },
    patient: {
        rol: 'Paciente',
        initialValues: {
            name: '',
            email: '',
            docnum: '',
            doctype: '2',
            gender: 'masculino',
            leftHAID: '',
            rightHAID: '',
            dateofBirth: ''
        },
        action: getPatient,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre',
            },
            {
                type: 'date',
                name: 'dateofBirth',
                value: 'dateofBirth',
                label: 'Fecha de nacimiento'
            },
            {
                type: 'text',
                name: 'gender', 
                value: 'gender', 
                label: 'Genero'
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de documento',
            },
            {
                type: 'text',
                name: 'doctype',
                value: 'doctype',
                label: 'Tipo de documento',
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'text',
                name: 'leftHAID',
                value: 'leftHAID',
                label: 'Apoyo izquierdo'
            },
            {
                type: 'text',
                name: 'rightHAID',
                value: 'rightHAID',
                label: 'Apoyo izquierdo'
            }
        ]
    }
}

export default showUserContent;