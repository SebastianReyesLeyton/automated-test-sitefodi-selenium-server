import ShowContentComponent from "./show-tests";
import showContent from "./conf";

const ShowTestsComponent = (props) => {

    let content;
    switch (props.user.rol) {
        case "supervisor":
            content = <ShowContentComponent infoContent={showContent.supervisor} />;
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ShowTestsComponent;