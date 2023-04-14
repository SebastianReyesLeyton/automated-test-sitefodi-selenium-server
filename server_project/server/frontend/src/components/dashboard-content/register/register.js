import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";
import Form from "../../Form/Form";
import { Error, Success } from "../../alert";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { resetAlertState } from "../../../reducers/user";

import "./register.css";

const RegisterContentComponent = ({ infoContent }) => {

    const { values, setValues, handleInputChange } = useForm(infoContent.initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    let alertMessage = useSelector((state) => state.userRequest);
    
    useEffect(() => {
        dispatch(resetAlertState());
    }, []);

    const handleClear = (e) => {
        e.preventDefault();
        setValues(infoContent.initialValues);
        dispatch(resetAlertState()); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(infoContent.action(values, navigate));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
    }

    return (
        <div className="register-container">
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">{ infoContent.title }</h1>
            <section className="register-content">
                <Form onSubmit={handleSubmit} className="register-form">
                    <section className="register-form-inputs">
                        {
                            infoContent.inputs.map((item, index) => (
                                <div key={index} className="input-group-container">
                                    <CompleteInput 
                                        
                                        type = {item.type}
                                        name = {item.name}
                                        value = {values[item.value]}
                                        label = {item.label}
                                        onChange = {handleInputChange}
                                        className = "input-group"
                                        options = {item.options}
                                        maxRows = {item.maxRows}
                                    />
                                </div>
                            ))
                        }
                    </section>
                    <section className="buttons-section">
                        <Button
                            variant = "contained"
                            type = "submit"
                            className="login-button"
                        >
                            <span>Enviar</span>
                        </Button>
                        <Button 
                            variant = "contained"
                            className = "clear-button"
                            onClick={handleClear}
                        >
                            Limpiar
                        </Button>
                    </section>
                </Form>
            </section>
        </div>
    )
}

export default RegisterContentComponent;