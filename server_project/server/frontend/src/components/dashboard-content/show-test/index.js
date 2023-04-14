import ShowTestContentComponent from "./show-test";

const ShowTestComponent = (props) => {

    let content;

    switch (props.user.rol) {
        case 'supervisor':
            content = <ShowTestContentComponent />
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ShowTestComponent