import { useEffect } from "react";
import { Avatars } from "../../constants";

import "./avatars.css";

const AvatarsComponent = () => {

    useEffect(() => {
        if (!Boolean(localStorage.getItem("avatar"))) localStorage.setItem( "avatar", Avatars[0] );
    }, []);

    const handleAvatar = (avatar) => (e) => {
        localStorage.setItem('avatar', avatar);
    }

    return (
        <div className="avatars-container">
            <span className="title">Selecciona un avatar</span>
            <ul className="avatars-options">
                {
                    Avatars.map((item, index) => (
                        <li key={index} className="avatar-option-container" style={{"--i": `${index*100}ms`}} onClick={handleAvatar(item)}>
                            <img src={item} className="avatar-option" alt="" />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AvatarsComponent;