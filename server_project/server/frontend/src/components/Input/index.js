import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";
import InputFile from "./InputFile";
import InputDateTime from "./InputDateTime";

export default function CompleteInput (props) {

    switch (props.type) {
        case 'text':
            return InputText(props);
        case 'password':
            return InputText(props);
        case 'select':
            return InputSelect(props);
        case 'date':
            return InputDate(props);
        case 'multiline':
            return InputText(props);
        case 'file':
            return InputFile(props);
        case 'number':
            return InputText(props);
        case 'datetime':
            return InputDateTime(props);
        default:
            break;
    }
    
}