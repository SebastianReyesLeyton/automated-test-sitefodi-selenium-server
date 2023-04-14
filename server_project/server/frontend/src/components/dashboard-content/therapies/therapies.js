import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getNotFinishedTherapy } from "../../../actions/therapy";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClock
} from '@fortawesome/free-solid-svg-icons';

import "./therapies.css";

const TherapiesContentComponent = () => {

    const therapies = useSelector((state) => state.items);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getNotFinishedTherapy({ rows: 10, offset: 0 }, navigate));
    }, [])

    const handleFinishAction = (e) => {

    } 

    const handleEntryAction = (therapy, test, question) => (e) => {
        navigate(`/therapy/${therapy}/test/${test}/question/${question}`);
    }

    console.log(therapies);

    return (
        <div className="therapies-container">
            <h1 className="title">Sesiones programadas</h1>
            <section className="therapies-content">
                {  therapies.therapies &&
                    therapies.therapies.map((item, index) => (
                        <div className="therapy-card">
                            <section className="therapy-content">
                                <span className="card-title">Sesión {item.id}</span>
                                <div className="therapy-time">
                                    <FontAwesomeIcon icon={faClock} className="icon" />
                                    <span>{(new Date(item.date)).toLocaleDateString('es-ES', options)}</span>
                                </div>
                                <span className="state">{item.state[0].toUpperCase() + item.state.slice(1)}</span>
                            </section>
                            <section className="therapy-tooltip">
                                {
                                    ( item.url || item.test !== -1) ? 
                                        <>
                                            <span className="therapy-tooltip-title">Información adicional</span>
                                            <div className="therapy-tooltip-content">
                                                { 
                                                    item.url && <a className="button" href={item.url}>Reunión</a> 
                                                }
                                                { item.test !== -1 ? 
                                                        new Date(item.date) < new Date() && 
                                                        <Button className="button" onClick={handleEntryAction(item.id, item.test, item.currentQuestion)}>Entrar</Button> :
                                                    <Button className="button" onClick={handleFinishAction}>Finalizar</Button>
                                                }
                                            </div>
                                        </>
                                        :
                                        <Button className="button" onClick={handleFinishAction}>Finalizar</Button>
                                }
                            </section> 
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default TherapiesContentComponent;