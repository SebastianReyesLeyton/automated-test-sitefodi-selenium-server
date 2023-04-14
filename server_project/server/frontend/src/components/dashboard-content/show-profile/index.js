import ShowProfileContentComponent from "./show-profile";
import showUserContent from "./conf";

const ShowProfileComponent = (props) => {
    
    let content;

    switch (props.user.rol) {
        case "supervisor":
            content = <ShowProfileContentComponent infoContent={showUserContent.supervisor}/>;
            break;
        case "terapeuta":
            content = <ShowProfileContentComponent infoContent={showUserContent.therapist}/>;
            break;
        case "paciente":
            content = <ShowProfileContentComponent infoContent={showUserContent.patient}/>;
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ShowProfileComponent;