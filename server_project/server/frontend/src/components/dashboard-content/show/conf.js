import { getPatients, modifyPatientState } from "../../../actions/patient";
import { getSupervisors, modifySupervisorState } from "../../../actions/supervisor";
import { getTherapists, modifyTherapistState } from "../../../actions/therapist";

const showContent = {
    supervisor: {
        title: 'Ver supervisores',
        initialValues: { 
            rows: 10,
            offset: 0
        },
        editRoute: '/edit-user/supervisor',
        showRoute: '/show-user/supervisor',
        getAllAction: getSupervisors,
        modifyStateAction: modifySupervisorState
    },
    therapist: {
        title: 'Ver terapeutas',
        initialValues: { 
            rows: 10,
            offset: 0
        },
        editRoute: '/edit-user/therapist',
        showRoute: '/show-user/therapist',
        getAllAction: getTherapists,
        modifyStateAction: modifyTherapistState
    },
    patient: {
        title: 'Ver mis pacientes',
        initialValues: { 
            rows: 10,
            offset: 0
        },
        editRoute: '/edit-user/patient',
        showRoute: '/show-user/patient',
        getAllAction: getPatients,
        modifyStateAction: modifyPatientState
    },
}


export default showContent;