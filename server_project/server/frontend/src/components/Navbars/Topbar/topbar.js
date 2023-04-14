import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGear,
    faArrowRightFromBracket,
    faEye,
    faMarker
} from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { logout } from '../../../actions/auth';

import "./topbar.css";

const Topbar = (props) => {

    const [ show, setShow ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShow = () => {
        setShow(!show);
    }

    const handleShowProfile = () => {
        navigate('/show-profile');
    }

    const handleEditProfile = () => {
        navigate('/edit-profile');
    }

    const handleLogout = () => {
        dispatch(logout(navigate));
    }

    return (
        <div className="topbar">
            <section className="profile-container">
                <div className="profile-avatar" >
                    <img alt="" src={localStorage.getItem('avatar')} className="avatar" />
                </div>
                <section className="profile-info">
                    <span className="name">{props.user.name}</span>
                    <small className="rol">{`${props.user.rol[0].toUpperCase()}${props.user.rol.slice(1)}`}</small>
                </section>
                <FontAwesomeIcon icon={faGear} className="icon" onClick={handleShow} />
                <Collapse in={show} className="collapse-menu">
                    <ul>
                        {
                            props.user.rol !== "admin" &&
                            <>
                                <li onClick={handleShowProfile}>
                                    <FontAwesomeIcon icon={faEye} className="icon" />
                                    <span>Ver perfil</span>
                                </li>
                                <li onClick={handleEditProfile}>
                                    <FontAwesomeIcon icon={faMarker} className="icon" />
                                    <span>Editar perfil</span>
                                </li>
                            </>
                        }
                        <li onClick={handleLogout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />
                            <span>Salir</span>
                        </li>
                    </ul>
                </Collapse>
            </section>
        </div>
    )
}

export default Topbar;