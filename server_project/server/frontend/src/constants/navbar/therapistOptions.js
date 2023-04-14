import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faUserGroup,
    faCalendarCheck,
    faCalendarDays,
    faSquarePollVertical
} from '@fortawesome/free-solid-svg-icons';

export const TherapistOptions = {
    Paciente: [
        {
            option: "Registrar",
            icon: <FontAwesomeIcon icon={faUser} className="icon" />,
            link: "/register/patient"
        },
        {
            option: "Ver, editar y modificar",
            icon: <FontAwesomeIcon icon={faUserGroup} className="icon" />,
            link: "/show/patient"
        }
    ],
    Terapia: [
        {
            option: "Agendar",
            icon: <FontAwesomeIcon icon={faCalendarCheck} className="icon" />,
            link: "/add-therapy"
        },
        {
            option: "Ver",
            icon: <FontAwesomeIcon icon={faCalendarDays} className="icon" />,
            link: "/schedule-therapies"
        },
        {
            option: "Ver resultados",
            icon: <FontAwesomeIcon icon={faSquarePollVertical} className="icon" />,
            link: "/results"
        }
    ],
}