import FileBase64 from 'react-file-base64';

const InputFile = (props) => {
    return (
        <FileBase64 
            multiple={props.multiple}
            onDone={props.onChange}
        />
    )
}

export default InputFile;
