import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarDays
} from '@fortawesome/free-solid-svg-icons';


export const PatientOptions = {
    Terapia: [
        {
            option: "Asistir",
            icon: <FontAwesomeIcon icon={faCalendarDays} className="icon" />,
            link: "/schedule-therapies"
        }
    ]
}