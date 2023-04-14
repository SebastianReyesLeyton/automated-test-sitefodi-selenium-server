import TherapiesContentComponent from "./therapies";

const TherapistComponent = (props) => {

    let content;

    switch (props.user.rol) {

        case "terapeuta": 
            content = <TherapiesContentComponent />
            break;
        case "paciente": 
            content = <TherapiesContentComponent />
            break;
        default:
            break;
    }

    return (
        content
    )

}

export default TherapistComponent;