import { registerSupervisor } from "../../../actions/supervisor";
import { registerTherapist } from "../../../actions/therapist";
import { registerPatient } from "../../../actions/patient";
import { createTest } from "../../../actions/test";

const registerContent = {
    supervisor: {
        title: 'Registrar supervisor',
        initialValues: {
            name: String(),
            email: String(),
            password: String(),
            docnum: String()
        },
        action: registerSupervisor,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre',
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'password',
                name: 'password',
                value: 'password',
                label: 'Contraseña',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de cédula',
            }
        ]
    },
    therapist: {
        title: 'Registrar terapeuta',
        initialValues: {
            name: String(),
            email: String(),
            password: String(),
            docnum: String()
        },
        action: registerTherapist,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre',
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'password',
                name: 'password',
                value: 'password',
                label: 'Contraseña',
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de cédula',
            }
        ]
    },
    patient: {
        title: 'Registrar paciente',
        initialValues: {
            name: String(),
            email: String(),
            password: String(),
            docnum: String(),
            doctype: String(),
            gender: String(),
            leftHAID: String(),
            rightHAID: String(),
            dateofBirth: String()
        },
        action: registerPatient,
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
                type: 'select',
                name: 'gender', 
                value: 'gender', 
                label: 'Genero', 
                labelID: 'gender-label',
                options: [
                    {
                        value: "masculino",
                        text: "Masculino"
                    },
                    {
                        value: "femenino",
                        text: "Femenino"
                    },
                    {
                        value: "no binario",
                        text: "No binario"
                    }
                ]
            },
            {
                type: 'text',
                name: 'docnum',
                value: 'docnum',
                label: 'Número de documento',
            },
            {
                type: 'select',
                name: 'doctype',
                value: 'doctype',
                label: 'Tipo de documento',
                labelID: 'tipo-doc',
                options: [
                    {
                        value: "2",
                        text: "Registro civil"
                    }, 
                    {
                        value: "3",
                        text: "Tarjeta de identidad"
                    }, 
                    {
                        value: "4",
                        text: "Otro"
                    }
                ]
            },
            {
                type: 'text',
                name: 'email',
                value: 'email',
                label: 'Correo electrónico',
            },
            {
                type: 'password',
                name: 'password',
                value: 'password',
                label: 'Contraseña',
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
    },
    test: {
        title: 'Crear prueba',
        initialValues: {
            name: String(),
            description: String()
        },
        action: createTest,
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'name',
                label: 'Nombre',
            },
            {
                type: 'multiline',
                name: 'description',
                value: 'description',
                maxRows: 4,
                label: 'Descripción',
            }
        ]
    }
}

export default registerContent;