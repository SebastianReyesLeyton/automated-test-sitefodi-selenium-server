
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../../actions/patient';
import { getFinishedTherapy } from '../../../actions/therapy';
import { getResults } from '../../../actions/results';
import { resetItems } from '../../../reducers/items';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle,
    faCircleCheck,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

import './results.css';
import { resetQuestions } from '../../../reducers/getQuestions';

const ResultContentComponents = () => {

    const [ usersPagRows, setUsersPagRows ] = useState({ rows: 10, offset: 0 });
    const [ therapiesPagRows, setTherapiesPagRows ] = useState({ rows: 10, offset: 0 });
    const [ show, setShow ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.usersRequest);
    const therapies = useSelector((state) => state.items);
    const results = useSelector((state) => state.questionsRequest);

    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }

    const handlePatientAction = (relation) => () => {
        dispatch(getFinishedTherapy(Object.assign({ idRelation: relation }, therapiesPagRows)));
    }

    const handleTherapyAction = (therapy) => () => {
        dispatch(getResults(therapy, navigate));
    }
    console.log(therapies, results)

    useEffect(() => {
        dispatch(resetItems());
        dispatch(resetQuestions());
        dispatch(getPatients(usersPagRows, navigate));
    }, []);

    return (
        <div className='results-container'>
            <div className='tables'>

                <section className='results-patients'>
                    <table className='show-users-table'>
                        <thead className='show-users-table-header'>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody className='show-users-table-content'>
                            {
                                users.map((item, index) => (
                                    <tr key={index}>

                                        <td>{usersPagRows.offset + index + 1}</td>
                                        <td><button onClick={handlePatientAction(item.relation)}>{item.name}</button></td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
                <section className='results-therapies'>
                    <table className='show-therapies-table'>
                        <thead className='show-therapies-table-header'>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody className='show-therapies-table-content'>
                            { (therapies.therapies) && 
                                therapies.therapies.map((item, index) => (
                                    <tr key={index}>

                                        <td>{usersPagRows.offset + index + 1}</td>
                                        <td><button onClick={handleTherapyAction(item.id)}>Terapia {item.id}</button></td>
                                        <td>{(new Date(item.date)).toLocaleDateString('es-ES', dateOptions)}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </div>
            <div className="results">
                <h1>Resultados</h1>
                <div className='results-content'>
                   {    results.map((item) => (

                            item.type === 'Carta' ? 
                            <div className='question-container'>
                                <h3 className="question-title">{item.order}.</h3>
                                <div className='question-content'>
                                    <div className='question-group'>
                                        <h4>Tipo: </h4>
                                        <p>{item.type}</p>
                                    </div>
                                    <div className='question-group'>
                                        <h4>Palabra preguntada: </h4>
                                        <p>{item.therapistCardName}</p>
                                    </div>
                                    <div className='question-group'>
                                        <h4>Puntos: </h4>
                                        <p>{item.points} / {item.maxPoints}</p>
                                    </div>
                                    {
                                        <div className='question-group'>
                                            <h4>Respuesta: </h4>
                                            <p>{ (item.correct === 'yes' && item.answer === '') ? item.therapistCardName : item.answer}</p>
                                        </div>
                                    }
                                    <FontAwesomeIcon className={`icon-${item.correct}`} icon={(item.correct === 'yes' ? faCheckCircle : faCircleXmark)} />
                                </div>
                            </div> : <></>
                    
                        )
                   )}
                   
                </div>
            </div>
        </div>
    )
}

export default ResultContentComponents;