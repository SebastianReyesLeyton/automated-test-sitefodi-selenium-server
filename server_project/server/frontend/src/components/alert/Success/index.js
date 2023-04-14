import { Alert, Grow } from "@mui/material";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faXmark,
    faCircleCheck
} from '@fortawesome/free-solid-svg-icons'


import "./index.css";

const Success = forwardRef((props, ref) => {
    const [ show, setShow ] = useState(Boolean(props.children));
    const message = props.children[0].toUpperCase() + props.children.slice(1);

    useImperativeHandle(ref, () => ({
        hiddenAlert(bool) {
            setShow(bool);
        }
    }));

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 4200);
    });

    return (
        <Grow in={show} timeout={500}>
            <Alert
                iconMapping={{
                    success: <FontAwesomeIcon icon={faCircleCheck} className="success-left-icon"/>
                }}
                action={
                    <FontAwesomeIcon className="success-icon-close" onClick={() => {
                        setShow(false);
                    }} icon={faXmark} ></FontAwesomeIcon>
                }
                severity="success"
                className="success-alert-message"
            >
                <div className="success-content">
                    <span className="success-title">Éxito: </span>
                    <span>{message}</span>
                </div>
            </Alert>
        </Grow>
    )
})

export default Success;