import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Form from "../../Form/Form";
import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";

import "./therapist.css";

const CardQuestionTherapistView = ({ infoContent }) => {

    const { values, setValues, handleInputChange } = useForm({ correct: 'yes', answer: ''});
    const handleSubmit = (e) => {
        e.preventDefault();
        infoContent.nextAction(values);
        infoContent.action();
    }

    return (
        <div className="card-question-container">
            <section className="info-question">
                <h1 className="title">{infoContent.therapistTitle}</h1>
                <img className="image" src={infoContent.imgURL}/>
                <span>{infoContent.cardnameT[0].toUpperCase() + infoContent.cardnameT.slice(1)}</span>
            </section>
            <section className="answer-container">
                <Form onSubmit={handleSubmit} className="answer-form">

                    <div className="input-radio-buttons">

                        <div className="correct-button">
                            <input type="radio" name="correct" value="yes" id="yes" defaultChecked onChange={handleInputChange}/>
                            <label for="yes">Si</label>
                        </div>
                        
                        <div className="correct-button">
                            <input type="radio" name="correct" value="no" id="no" onChange={handleInputChange}/>
                            <label for="no">No</label>
                        </div>
                    </div>

                    <CompleteInput 
                        type="multiline"
                        name="answer"
                        label="Respuesta del paciente"
                        value={values.answer}
                        onChange={handleInputChange}
                        className="input-group"
                        maxRows={4}
                    />

                    <Button 
                        type="submit"
                        className="submit-button"
                    >
                        {(infoContent.cur < infoContent.numOfQuestions) ? 'Siguiente' : 'Finalizar'}
                    </Button>
                </Form>
            </section>
        </div>
    )
}

export default CardQuestionTherapistView;