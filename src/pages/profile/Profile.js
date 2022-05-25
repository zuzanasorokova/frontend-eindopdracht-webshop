import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const {user} = useContext(AuthContext);


    return (
        <div className="outer-container profile-page">
            {Object.keys(user).length > 0 &&
                <div className="inner-container">
                    <h1 className="title">WELKOM {user.customer.firstname}!</h1>
                    <article className="detail-container">
                        <h2 className="detail-title">Jouw gegevens</h2>
                        <p className="detail">Gebruikersnaam: {user.username}</p>
                        <p className="detail">Email: {user.email}</p>
                        <p className="detail">Naam: {user.customer.firstname}</p>
                        <p className="detail">Achternaam: {user.customer.lastname}</p>
                        <p className="detail">Adres: {user.customer.address}</p>
                    </article>
                    <article>
                        <h2>Jouw bestellingen</h2>

                    </article>
                    <p>Terug naar de <Link to="/">Homepagina</Link></p>

                </div>
            }
        </div>
    );

};

export default Profile;