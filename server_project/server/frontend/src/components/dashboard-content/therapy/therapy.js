import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";
import Form from "../../Form/Form";
import { Error, Success } from "../../alert";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { resetAlertState } from "../../../reducers/user";
import { getPatients } from "../../../actions/patient";
import { getAvailableTests } from "../../../actions/test";
import { scheduleTherapy } from "../../../actions/therapy";

import "./therapy.css";

const initialValues = {
    url: String(),
    date: String(),
    patient: String(),
    test: String(),
}

const TherapyContentComponent = () => {

    const { values, setValues, handleInputChange } = useForm(initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    let alertMessage = useSelector((state) => state.userRequest);
    const patients = useSelector((state) => state.usersRequest);
    const tests = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(resetAlertState());
        dispatch(getPatients({rows: 10, offset: 0}, navigate));
        dispatch(getAvailableTests({rows: 10, offset: 0}, navigate));
    }, []);

    console.log(values);

    const handleClear = (e) => {
        e.preventDefault();
        setValues(initialValues);
        dispatch(resetAlertState()); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(scheduleTherapy(values, navigate));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
    }

    return (
        <div className="register-container">
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">Agendar terapia</h1>
            <section className="register-content">
                <Form onSubmit={handleSubmit} className="register-form">
                    <section className="register-form-inputs">
                        <div className="input-group-container">
                            <CompleteInput 
                                type = 'select'
                                name = 'patient'
                                value = {values.patient}
                                label = "Paciente"
                                onChange = {handleInputChange}
                                className = "input-group"
                                options = {[...patients].map((item) => {
                                    return { value: item.id, text: item.name}
                                })}
                            />
                        </div>
                        <div className="input-group-container">
                            <CompleteInput 
                                type = 'select'
                                name = 'test'
                                value = {values.test}
                                label = "Prueba"
                                onChange = {handleInputChange}
                                className = "input-group"
                                options = {[...tests, { id: -1, name: 'Ninguno' }].map((item) => {
                                    return { value: item.id, text: item.name}
                                })}
                            />
                        </div>
                        <div className="input-group-container">
                            <CompleteInput 
                                type = "datetime"
                                name = "date"
                                label = "Fecha y hora"
                                value = {values.date}
                                onChange = {handleInputChange}
                                className="input-group"
                            />
                        </div>
                        <div className="input-group-container">
                            <CompleteInput 
                                type = "multiline"
                                maxRows={4}
                                name="url"
                                label="Link de la reunión"
                                value={values.url}
                                onChange={handleInputChange}
                                className="input-group"
                            />
                        </div>
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

export default TherapyContentComponent;