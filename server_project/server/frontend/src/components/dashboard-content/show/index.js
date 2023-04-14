import ShowContentComponent from "./show";
import showContent from "./conf";

const ShowComponent = (props) => {

    let content;
    switch (props.type) {
        case "supervisor":
            if (props.user.rol === 'admin') content = <ShowContentComponent infoContent={showContent.supervisor} />;
            break;
        case "therapist":
            if (props.user.rol in {"admin": 1, "supervisor": 1}) content = <ShowContentComponent infoContent={showContent.therapist} />;
            break;
        case "patient":
            if (props.user.rol === "terapeuta") content = <ShowContentComponent infoContent={showContent.patient} />;
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ShowComponent;