import { Alert, Grow } from "@mui/material";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faXmark,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';



import "./index.css";

const Error = forwardRef((props, ref) => {
    const [ show, setShow ] = useState(Boolean(props.children));
    const message = props.children[0].toUpperCase() + props.children.slice(1);

    useImperativeHandle(ref, () => ({
        hiddenAlert(bool) {
            setShow(bool);
        }
    }))

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 4200);
    });

    return (
        <Grow in={show} timeout={500}>
            <Alert
                iconMapping={{
                    error: <FontAwesomeIcon icon={faCircleXmark} className="error-left-icon"/>
                }}
                action={
                    <FontAwesomeIcon className="error-icon-close" onClick={() => {
                        setShow(false);
                    }} icon={faXmark} ></FontAwesomeIcon>
                }
                severity="error"
                className="error-alert-message"
            >
                <div className="error-content">
                    <span className="error-title">Error: </span>
                    <span>{message}</span>
                </div>
            </Alert>
        </Grow>
    )
})

export default Error;