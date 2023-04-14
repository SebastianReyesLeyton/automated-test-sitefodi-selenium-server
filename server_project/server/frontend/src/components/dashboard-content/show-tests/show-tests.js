import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error, Success } from "../../alert";

import { resetAlertState } from "../../../reducers/user";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSquarePen, 
    faSquareCheck,
    faFileLines
} from '@fortawesome/free-solid-svg-icons';


import "./show-tests.css";
import { Button } from "@mui/material";

const ShowContentComponent = ({ infoContent }) => {

    const [ pagRows, setPagRows ] = useState(infoContent.initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    let alertMessage = useSelector((state) => state.userRequest);
    const tests = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(resetAlertState());
        dispatch(infoContent.action(pagRows, navigate));
    }, []);

    const handleEditAction = (id) => () => {
        navigate(`${infoContent.editRoute}/${id}`);
    }

    const handlePublishAction = (id) => (e) => {
        e.preventDefault();
        dispatch(infoContent.publishAction(id));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
        dispatch(infoContent.action(pagRows, navigate));
    }

    return (
        <div className="show-container">
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">{infoContent.title}</h1>
            <section className="show-content">
                {
                    tests.map((item, index) => (
                        <div className="test-card-container" key={index}>
                            <div className="test-card-content">
                                <section className="test-card-actions">
                                    <Button
                                        className="actions"
                                        onClick={handleEditAction(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faSquarePen} className="action-icon" />
                                        <span>Editar</span>
                                    </Button>
                                    <Button
                                        className="actions"
                                        onClick={handlePublishAction(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faSquareCheck} className="action-icon" /> 
                                        <span>Publicar</span>
                                    </Button>
                                </section>
                                <section className="test-card-info">
                                    <i className="test-icon">
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </i>
                                    <label className="test-title">{item.name}</label>
                                    <span className="test-description">{item.description}</span>
                                </section>
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default ShowContentComponent;