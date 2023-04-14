import ResultContentComponents from "./results";

const ResultComponent = (props) => {

    let content;
    switch (props.user.rol) {
        case "terapeuta":
            content = <ResultContentComponents />
            break;
        default:
            break;
    }

    return (
        content
    )
}

export default ResultComponent;