import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import "./Registration.css"


function Registration() {
    const {register, handleSubmit} = useForm();
    return (
        <>
            <div className="outer-container registration-body">
                <h1 className="registration-title">Registreren</h1>
                <div className="inner-container">
                    <form className="registration-form" onSubmit={handleSubmit()}>
                        <label className="label-text" htmlFor="username">Username</label>
                        <input
                            className="input"
                            type="text"
                            id="username"
                            {...register("username")}
                        />
                        <label className="label-text" htmlFor="firstname">Naam</label>
                        <input
                            className="input"
                            type="text"
                            id="firstname"
                            {...register("firstname")}
                        />
                        <label className="label-text" htmlFor="lastname">Achternaam</label>
                        <input
                            className="input"
                            type="text"
                            id="lastname"
                            {...register("lastname")}
                        />
                        <label className="label-text" htmlFor="address">Adres</label>
                        <input
                            className="input"
                            type="text"
                            id="address"
                            {...register("address")}
                        />
                        <label className="label-text" htmlFor="email">E-mail</label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            {...register("email")}
                        />
                        <label className="label-text" htmlFor="password">Wachtwoord</label>
                        <input
                            className="input"
                            type="password"
                            id="password"
                            {...register("password")}
                        />
                        <label className="label-text" htmlFor="password-repeat">Wachtwoord herhalen</label>
                        <input
                            className="input"
                            type="password"
                            id="password-repeat"
                            {...register("password-repeat")}
                        />
                        <button type="submit">Register</button>
                        <label htmlFor=""></label>
                    </form>
                    <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
                </div>
            </div>
        </>
    );
}

export default Registration;