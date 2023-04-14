import TherapyContentComponent from "./therapy";

const TherapyComponent = (props) => {

    let content;
    
    switch (props.user.rol) {
        
        case "terapeuta":
           content = <TherapyContentComponent />;
            break;
        default:
            break;
    }

    return (
        content
    )

}

export default TherapyComponent;
