import { editPatient, getPatient } from "../../../actions/patient";
import { editSupervisor, getSupervisor } from "../../../actions/supervisor";
import { editTherapist, getTherapist } from "../../../actions/therapist";

const updateContent = {
    supervisor: {
        title: 'Editar supervisor',
        initialValues: {
            name: '',
            email: '',
            newPassword: '',
            docnum: ''
        },
        action: editSupervisor,
        getUserAction: getSupervisor,
        initialization: (userData) => {
            let ans = Object.assign({}, userData);
            
            ans.newPassword = "";
            delete ans.doctype;

            return ans;
        },
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
                type: 'password',
                name: 'newPassword',
                value: 'newPassword',
                label: 'Nueva contraseña',
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
        title: 'Editar terapeuta',
        initialValues: {
            name: '',
            email: '',
            newPassword: '',
            docnum: ''
        },
        action: editTherapist,
        getUserAction: getTherapist,
        initialization: (userData) => {
            let ans = Object.assign({}, userData);
            
            ans.newPassword = "";
            delete ans.doctype;

            return ans;
        },
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
                type: 'password',
                name: 'newPassword',
                value: 'newPassword',
                label: 'Nueva contraseña',
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
        title: 'Editar paciente',
        initialValues: {
            name: '',
            email: '',
            newPassword: '',
            docnum: '',
            doctype: '2',
            gender: 'masculino',
            leftHAID: '',
            rightHAID: '',
            dateofBirth: ''
        },
        action: editPatient,
        getUserAction: getPatient,
        initialization: (userData) => {
            let ans = Object.assign({}, userData);

            ans.newPassword = "";
            ans.doctype = { "registro civil": "2", 
                            "tarjeta de identidad": "3",
                            "otro": "4" }[ans.doctype]

            let df = String(ans.dateofBirth).split('T')[0] + "T00:00:00";

            let d = new Date(df),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            ans.dateofBirth = [year, month, day].join('/');

            return ans;
        },
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
    }
}

export default updateContent;