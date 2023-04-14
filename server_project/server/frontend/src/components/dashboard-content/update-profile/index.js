import updateContent from "./conf"; 
import UpdateProfileContentComponent from "./update-profile";

const UpdateProfileComponent = (props) => {

    let content;

    switch (props.user.rol) {
        case "supervisor":
            content = <UpdateProfileContentComponent infoContent={updateContent.supervisor}/>
            break;
        case "terapeuta":
            content = <UpdateProfileContentComponent infoContent={updateContent.therapist}/>
            break;
        case "paciente":
            content = <UpdateProfileContentComponent infoContent={updateContent.patient}/>
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default UpdateProfileComponent;