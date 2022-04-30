import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import "./UserRegistration.css"


function UserRegistration() {
    const {register, handleSubmit} = useForm();
    const history = useHistory();
    const [error, toggleError] = useState(false);
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup(){
            source.cancel();
        }
    },[]);

    async function registerUser(info){
        toggleError(false)
        try{
            const userData = await axios.post("http://localhost:8080/users", {
                username: info.username,
                email: info.email,
                password: info.password,
                enabled: true,
            }, {
                cancelToken: source.token,
            });
            console.log(userData.data)
            sendToNextPage(userData);
        }catch(e){
            console.error(e);
            toggleError(true);
        }
    }

    function sendToNextPage(data){
        console.log(data)
        history.push("/personinfo")
    }

    return (
        <>
            <div className="outer-container registration-body">
                {error && <span>Er is iets misgegaan tijdens sturen van data.</span>}
                <h1 className="registration-title">Registreren</h1>
                <div className="inner-container">
                    <form className="registration-form" onSubmit={handleSubmit(registerUser)}>
                        <label className="label-text" htmlFor="username">Username</label>
                        <input
                            className="input"
                            type="text"
                            id="username"
                            {...register("username")}
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
                        <button type="submit">Register</button>
                        <p>Heb je al een account?</p>
                        <p>Je kunt je <Link to="/login">hier</Link> inloggen.</p>
                    </form>

                </div>
            </div>
        </>
    );
}

export default UserRegistration;