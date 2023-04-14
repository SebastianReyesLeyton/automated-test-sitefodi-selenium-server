import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error, Success } from "../../alert";

import { resetAlertState } from "../../../reducers/user";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleCheck, 
    faCircleXmark,
    faPen,
    faEye
} from '@fortawesome/free-solid-svg-icons';


import "./show.css";

const ShowContentComponent = ({ infoContent }) => {

    const [ pagRows, setPagRows ] = useState(infoContent.initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    let alertMessage = useSelector((state) => state.userRequest);
    let users = useSelector((state) => state.usersRequest);

    const handleChangeState = (id, newState) => (e) => {
        e.preventDefault();
        dispatch(infoContent.modifyStateAction({id, newState}));
        if (alertRef.current != null) alertRef.current.hiddenAlert(Boolean(alertMessage.error) || Boolean(alertMessage.success));
    }

    const handleEditAction = (id) => () => {
        navigate(`${infoContent.editRoute}/${id}`);
    }

    const handleShowAction = (id) => () => {
        navigate(`${infoContent.showRoute}/${id}`);
    }

    useEffect(() => {
        dispatch(infoContent.getAllAction(pagRows, navigate));
    }, [alertMessage])

    useEffect(() => {
        dispatch(resetAlertState());
        dispatch(infoContent.getAllAction(pagRows, navigate));
    }, [infoContent]);

    return (
        <div className="show-container">
            {  ( Boolean(alertMessage.error) ) && <Error ref={alertRef}>{alertMessage.error}</Error>}
            {  ( Boolean(alertMessage.success) ) && <Success ref={alertRef}>{alertMessage.success}</Success>}
            <h1 className="title">{infoContent.title}</h1>
            <section className="show-content">
                <table className="show-table">
                    <thead className="show-table-head">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Número de documento</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="show-table-content">
                        {
                            users.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <span>
                                            {item.name}    
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {item.email}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {item.docnum}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={item.active === 'activo' ? "active-state" : "disabled-state"} onClick={handleChangeState(item.id, (item.active === 'activo') ? "disabled" : "active")}>
                                            {item.active[0].toUpperCase() + item.active.slice(1)}
                                            {<FontAwesomeIcon icon={item.active === 'activo' ? faCircleCheck : faCircleXmark} />}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button className="buttons-actions" onClick={handleShowAction(item.id)}><FontAwesomeIcon icon={faEye} /></button>
                                            <button className="buttons-actions" onClick={handleEditAction(item.id)}><FontAwesomeIcon icon={faPen} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default ShowContentComponent;