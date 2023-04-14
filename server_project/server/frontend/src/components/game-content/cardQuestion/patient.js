import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Form from "../../Form/Form";
import useForm from "../../Form/useForm";
import CompleteInput from "../../Input";

import "./patient.css";

const CardQuestionPatientView = ({ infoContent }) => {

    const [ nextButton, setNextButton ] = useState(false);
    const nextRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        infoContent.action(e);
    }

    useEffect(() => {
        infoContent.socket.on('next', (data) => {
            infoContent.action(data.curQuestion);
        })
    }, [infoContent.socket]);

    return (
        <div className="card-question-container">
            <section className="info-question">
                <h1 className="title">{infoContent.therapistTitle}</h1>
                <img className="image" src={infoContent.imgURL}/>
                <span>{infoContent.cardnameT[0].toUpperCase() + infoContent.cardnameT.slice(1)}</span>
                { nextButton && <Button 
                    className="submit-button"
                    onClick={handleSubmit}
                >
                    {(infoContent.cur < infoContent.numOfQuestions) ? 'Siguiente' : 'Finalizar'}
                </Button>}
            </section>
        </div>
    )
}

export default CardQuestionPatientView;