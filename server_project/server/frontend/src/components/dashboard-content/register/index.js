import RegisterContentComponent from "./register";
import registerContent from './conf';

const RegisterComponent = (props) => {

    let content;
    
    switch (props.type) {
        case "supervisor":
            if (props.user.rol === 'admin') content = <RegisterContentComponent infoContent={registerContent.supervisor} />;
            break;
        case "therapist":
            if (props.user.rol in {"admin": 1, "supervisor": 1}) content = <RegisterContentComponent infoContent={registerContent.therapist} />;
            break;
        case "patient":
            if (props.user.rol in {"terapeuta": 1}) content = <RegisterContentComponent infoContent={registerContent.patient} />;
            break;
        case "create-test":
            if (props.user.rol === "supervisor") content = <RegisterContentComponent infoContent={registerContent.test} />;
            break;
        default:
            break;
    }

    return (
        content
    )

}

export default RegisterComponent;
