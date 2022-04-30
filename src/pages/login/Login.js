import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const [error, toggleError] = useState(false);
    const source = axios.CancelToken.source();


    //console.log(isAuth);

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }

    }, []);

    async function sendData(info,source){
        toggleError(false);
        try{
            const result = await axios.post("http://localhost:8080/authenticate", {
                username: info.username,
                password: info.password,
            },
            {cancelToken: source.token},
                );
            console.log(result.data.jwt);
            login(result.data.jwt);
        }catch(e){
        console.error(e)
            toggleError(true);
    }};

    return (
        <>
            <div className="outer-container login-body">
                {error && <span>Er is iets misgegaan.</span>}
                <h1 className="login-title">LOG IN</h1>
                <div className="inner-container">
                    <form className="login-form" onSubmit={handleSubmit(sendData)}>
                        <label className="label-text" htmlFor="text">Username</label>
                        <input
                            className="input"
                            type="text"
                            id="login-username"
                            {...register("username")}
                        />

                        <label className="label-text" htmlFor="signin-password">Wachtwoord</label>
                        <input
                            className="input"
                            type="password"
                            id="signin-password"
                            {...register("password")}
                        />

                        <button type="submit">Inloggen</button>

                        <p className="register-link">Nog geen account? Click <Link to="/registration">hier</Link>!</p>
                    </form>
                </div>
            </div>

        </>
    );
}



export default Login;