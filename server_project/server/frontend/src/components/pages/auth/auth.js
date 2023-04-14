import { useForm, Form } from "../../Form";
import { Button } from "@mui/material";
import CompleteInput from "../../Input";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../actions/auth";
import { Error } from "../../alert";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./auth.css";
import AvatarsComponent from "../../avatars/avatars";

const LoginPage = () => {

    const { values, handleInputChange} = useForm({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorRef = useRef(null);
    
    let apiError = useSelector((state) => state.auth);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(values, navigate));
        if (errorRef.current != null) errorRef.current.hiddenAlert(Boolean(apiError.error));
    }
    
    const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));
    
    if ( Boolean(user) ) return <Navigate to="/home" replace />;

    return (
        <div className="auth-container">
            { Boolean(apiError.error) && <Error ref={errorRef}>{apiError.error}</Error> }
            <div className="auth-card">
                <section className="auth-form">
                    <Form onSubmit={handleSubmit} className="login-form">
                        <label className="title">Ingresar</label>
                        <CompleteInput 
                            type = "text"
                            label= "Correo electronico"
                            name = "email"
                            value = {values.email}
                            onChange={handleInputChange}
                            className="input-group"
                        />
                        <CompleteInput 
                            type = "password"
                            label= "Contraseña"
                            name = "password"
                            value = {values.password}
                            onChange={handleInputChange}
                            className="input-group"
                        />
                        <Button 
                            variant = "contained"
                            type = "submit"
                            className="login-button"
                        >
                            Ingresar
                        </Button>
                    </Form>
                </section>
                <section className="auth-complement">
                    <AvatarsComponent />
                </section>
            </div>
        </div>
    )
    
}

export default LoginPage;