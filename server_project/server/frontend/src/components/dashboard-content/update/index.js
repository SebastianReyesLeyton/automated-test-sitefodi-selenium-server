import updateContent from "./conf"; 
import UpdateContentComponent from "./update";

const UpdateComponent = (props) => {

    let content;

    switch (props.type) {
        case "supervisor":
            if (props.user.rol === 'admin') content = <UpdateContentComponent infoContent={updateContent.supervisor}/>
            break;
        case "therapist":
            if (props.user.rol === 'admin' || props.user.rol === 'supervisor' ) content = <UpdateContentComponent infoContent={updateContent.therapist}/>
            break;
        case "patient":
            if (props.user.rol === 'terapeuta') content = <UpdateContentComponent infoContent={updateContent.patient}/>
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default UpdateComponent;