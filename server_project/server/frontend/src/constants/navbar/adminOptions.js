import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserGear, 
    faUsersGear,
    faHospitalUser,
    faUsersLine
} from '@fortawesome/free-solid-svg-icons';

export const AdminOptions = {
    Supervisor: [
        {
            option: "Registrar",
            icon: <FontAwesomeIcon icon={faUserGear} className="icon" />,
            link: "/register/supervisor"
        },
        {
            option: "Ver, editar y modificar",
            icon: <FontAwesomeIcon icon={faUsersGear} className="icon" />,
            link: "/show/supervisor"
        }
    ],
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
    ]
}