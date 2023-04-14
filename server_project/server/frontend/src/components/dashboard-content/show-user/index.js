import ShowUserContentComponent from "./show-user";
import showUserContent from "./conf";

const ShowUserComponent = (props) => {
    
    let content;

    console.log('asdad')

    switch (props.type) {
        case "supervisor":
            if (props.user.rol === 'admin') content = <ShowUserContentComponent infoContent={showUserContent.supervisor}/>;
            break;
        case "therapist":
            if (props.user.rol === 'admin' || props.user.rol === 'supervisor') content = <ShowUserContentComponent infoContent={showUserContent.therapist}/>;
            break;
        case "patient":
            if (props.user.rol === 'terapeuta') content = <ShowUserContentComponent infoContent={showUserContent.patient}/>;
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ShowUserComponent;