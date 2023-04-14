import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"

import CompleteInput from "../../Input";
import { Avatars } from "../../../constants";

import { Button } from "@mui/material";

import "./show-profile.css";

const ShowProfileContentComponent = ({ infoContent }) => {

    let id = JSON.parse(localStorage.getItem('user'))['id']
    console.log(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.getUser);
    const [ values, setValues ] = useState(infoContent.initialValues);

    useEffect(() => {
        setValues(infoContent.initialValues);
        dispatch(infoContent.action(id, navigate));
    }, []); 

    useEffect(() => {
        let ans = Object.assign({}, userData);
        if (Boolean(ans.gender)) ans.gender = ans.gender[0].toUpperCase() + ans.gender.slice(1)
        if (Boolean(ans.doctype)) ans.doctype = ans.doctype[0].toUpperCase() + ans.doctype.slice(1)
        if (Boolean(ans.dateofBirth)) ans.dateofBirth = new Date(String(ans.dateofBirth).split('T')[0] + "T00:00:00");
        setValues(ans);
    }, [userData])

    const handleBackAction = (e) => {
        navigate(-1);
    }

    console.log(userData);

    return (
        <div className="show-user-container">
            <Button className="back-button" onClick={handleBackAction}>Volver</Button>
            <section className="show-user-content">
                <section className="general-info">
                    <img alt="" src={localStorage.getItem('avatar')} className="avatar" />
                    <h1>{userData.name}</h1>
                    <small>{infoContent.rol}</small>
                </section>
                <section className="specific-info">
                    <h1 className="title">Infomación adicional</h1>
                    <div className="specific-info-content">
                        {
                            infoContent.inputs.map((item, index) => (
                                <div key={index} className="input-group-container">
                                    <CompleteInput 
                                        variant = "standard"
                                        type = {item.type}
                                        name = {item.name}
                                        label = {item.label}
                                        value = {values[item.value]}
                                        className = "input-group"
                                        options = {item.options} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                </section>
            </section>
        </div>
    )

}

export default ShowProfileContentComponent;