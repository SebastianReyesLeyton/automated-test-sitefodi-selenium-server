import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";
import Form from "../../Form/Form";
import { Error, Success } from "../../alert";
import { Button } from "@mui/material";

import { resetAlertState } from "../../../reducers/user";
import "./update.css";

const UpdateContentComponent = ({ infoContent }) => {

    let { id } = useParams();
    const alertRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.getUser);
    const { values, setValues, handleInputChange } = useForm(infoContent.initialValues);
    let alertMessage = useSelector((state) => state.userRequest);

    useEffect(() => {
        dispatch(resetAlertState());
        dispatch(infoContent.getUserAction(id, navigate));
    }, []); 

    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            let user = infoContent.initialization(userData);
            setValues(user);
        }
    }, [userData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(infoContent.action(values, navigate));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
        dispatch(infoContent.getUserAction(id, navigate));
    }

    const handleBackAction = (e) => {
        dispatch(resetAlertState());
        setValues(infoContent.initialValues);
        navigate(-1);
    }

    return (
        <div className='update-container'>
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">{ infoContent.title }</h1>
            <section className="update-content">
                <Form onSubmit={handleSubmit} className="update-form">
                    <section className="update-form-inputs">
                        {
                            infoContent.inputs.map((item, index) => (
                                <div key={index} className="input-group-container">
                                    <CompleteInput 
                                        
                                        type = {item.type}
                                        name = {item.name}
                                        label = {item.label}
                                        value = {values[item.value]}
                                        onChange = {handleInputChange}
                                        className = "input-group"
                                        options = {item.options}
                                        
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
                            onClick={handleBackAction}
                        >
                            Volver
                        </Button>
                    </section>
                </Form>
            </section>
        </div>
    )
}

export default UpdateContentComponent;