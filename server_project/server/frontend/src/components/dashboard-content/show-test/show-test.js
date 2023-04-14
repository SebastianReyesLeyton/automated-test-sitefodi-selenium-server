import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClipboardQuestion,
    faCircleQuestion,
    faCirclePlus
} from '@fortawesome/free-solid-svg-icons';

import "./show-test.css";
import { useEffect } from "react";

import { getQuestionsByTest, getQuestionTypes, getTestById } from "../../../actions/test";
import { resetItems } from "../../../reducers/items";
import { Button } from "@mui/material";

const ShowTestContentComponent = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questions = useSelector((state) => state.questionsRequest);
    const types = useSelector((state) => state.items);
    const test = useSelector((state) => state.getTest);

    const handleBackAction = () => {
        dispatch(resetItems());
        navigate(-1);
    }

    const handleAddAction = (questionTypeId) => () => {
        navigate(`/add-question/${questionTypeId}/${id}`);
    }

    useEffect(() => {
        dispatch(resetItems());
        dispatch(getQuestionsByTest(id, navigate));
        dispatch(getQuestionTypes(navigate));
        dispatch(getTestById(id, navigate))
    }, []);

    console.log(questions)

    return (
        <div className="show-test-container">
            <Button className="back-button" onClick={handleBackAction}>Volver</Button>
            <section className="show-test-header">
                <h1 className="test-name">{test.name}</h1>
                <span className="test-description">{test.description}</span>
            </section>
            <section className="show-test-content">

                <section className="show-test-questions">
                    <h2 className="section-title">Preguntas</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>#</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {
                                    questions.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.order}
                                            </td>
                                            <td>
                                                <span>
                                                    {item.type}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    ))
                                }
                                
                            </tbody>

                        </table>
                    </div>
                </section>

                <section className="show-test-question-types">
                    <h2 className="section-title">Agregar</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {
                                    types.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <span>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions">
                                                    <button className="button-actions">
                                                        <span className="description">{item.description}</span>
                                                        <FontAwesomeIcon icon={faCircleQuestion} />
                                                    </button>
                                                    <button className="button-actions" onClick={handleAddAction(item.id)}><FontAwesomeIcon icon={faCirclePlus} /></button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    ))
                                }
                                
                            </tbody>

                        </table>
                    </div>
                </section>

            </section>
            
        </div>
    )
}

export default ShowTestContentComponent;