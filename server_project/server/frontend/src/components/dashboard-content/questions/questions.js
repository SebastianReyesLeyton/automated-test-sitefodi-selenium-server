import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";
import Form from "../../Form/Form";
import { Error, Success } from "../../alert";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

import { resetAlertState } from "../../../reducers/user";
import { addQuestion } from "../../../actions/test";

import "./questions.css";

const initialValues = {
    therapistTitle: String(),
    patientTitle: String(),
    therapistCardName: String(),
    patientCardName: String(),
    image: String(),
    yes: String(),
    no: String()
}

const QuestionFormContentComponent = () => {

    const { idQuestion, idTest } = useParams();
    const { values, setValues, handleInputChange } = useForm(initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    let alertMessage = useSelector((state) => state.userRequest);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addQuestion(idTest, idQuestion, values, navigate));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
    }

    const handleBackAction = () => {
        setValues(initialValues);
        navigate(-1);
    }

    useEffect(() => {
        dispatch(resetAlertState());
    }, []);

    console.log(values, idQuestion, idTest);

    return (
        <div className="question-container">
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">Adicionar pregunta tipo carta</h1>
            <section className="question-content">
                <Form onSubmit={handleSubmit} className="question-form">
                    <div className="question-form-content">

                        <section className="patient-section">
                            <h2 className="section-title">Paciente</h2>
                            <div className="section-content">
                                <CompleteInput 
                                    type = "text"
                                    name = "patientTitle"
                                    value = {values.patientTitle}
                                    label = "Nombre de la pregunta"
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                />
                                <CompleteInput 
                                    type = "text"
                                    name = "patientCardName"
                                    value = {values.patientCardName}
                                    label = "Nombre de la carta"
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                />
                                <div className="input-group-file">
                                    <CompleteInput 
                                        type = "file"
                                        multiple ={ false }
                                        onChange={(e) => {
                                            handleInputChange({ target: { name: 'image', value: e.base64 } });
                                        }}
                                    />
                                    <img src={values.image} className="image-visualizator" alt="" />
                                </div>
                            </div>
                        </section>
                        <section className="therapist-section">
                            <h2 className="section-title">Terapeuta</h2>
                            <div className="section-content">
                                <CompleteInput 
                                    type = "text"
                                    name = "therapistTitle"
                                    value = {values.therapistTitle}
                                    label = "Nombre de la pregunta"
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                />
                                <CompleteInput 
                                    type = "text"
                                    name = "therapistCardName"
                                    value = {values.therapistCardName}
                                    label = "Nombre de la carta"
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                />
                                <CompleteInput 
                                    type = "number"
                                    name = "yes"
                                    value = {values.yes}
                                    label = "Puntaje para sí"
                                    min = {0}
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                />
                                <CompleteInput 
                                    type = "number"
                                    name = "no"
                                    value = {values.no}
                                    label = "Puntaje para no"
                                    onChange = {handleInputChange}
                                    className = "input-group"
                                    min = {-10}
                                />
                            </div>
                        </section>
                    </div>
                    <div className="buttons-section">
                        <Button
                            variant = "contained"
                            type = "submit"
                            className="send-button"
                        >
                            <span>Enviar</span>
                        </Button>
                        <Button 
                            variant = "contained"
                            className = "back-button"
                            onClick={handleBackAction}
                        >
                            Volver
                        </Button>
                    </div>
                </Form>
            </section>
        </div>
    )
}

export default QuestionFormContentComponent;