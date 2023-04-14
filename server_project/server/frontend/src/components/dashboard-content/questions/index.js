import QuestionFormContentComponent from "./questions";

const QuestionFormComponent = (props) => {
    
    let content;

    switch (props.user.rol) {
        case "supervisor":
            content = <QuestionFormContentComponent />
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default QuestionFormComponent;