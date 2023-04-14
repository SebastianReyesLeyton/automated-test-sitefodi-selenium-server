import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsersLine, 
    faHospitalUser, 
    faClipboardList,
    faBoxArchive
} from '@fortawesome/free-solid-svg-icons';

export const SupervisorOptions = {
    Terapeuta: [
        {
            option: "Registrar",
            icon: <FontAwesomeIcon icon={faHospitalUser} className="icon" />,
            link: "/register/therapist"
        },
        {
            option: "Ver, editar y modificar",
            icon: <FontAwesomeIcon icon={faUsersLine} className="icon" />,
            link: "/show/therapist"
        }
    ],
    Pruebas: [
        {
            option: "Crear",
            icon: <FontAwesomeIcon icon={faClipboardList} className="icon" />,
            link: "/create-test"
        },
        {
            option: "Ver y editar",
            icon: <FontAwesomeIcon icon={faBoxArchive} className="icon" />,
            link: "/show-tests"
        }
    ]
}