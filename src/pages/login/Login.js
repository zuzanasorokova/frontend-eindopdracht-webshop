import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import "./Login.css";
import Input from "../../components/inputs/Input"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    username: yup.string().required("Deze veld mag niet leeg zijn!"),
    password: yup.string().required("Deze veld mag niet leeg zijn!"),
});

const Login = () => {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit, formState:{errors}} = useForm({mode: "onBlur", resolver: yupResolver(schema)});
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
            <div className="outer-container login-page">
                {error && <span>Er is iets misgegaan.</span>}
                <h1 className="title">LOG IN</h1>
                <div className="inner-container">
                    <form className="form" onSubmit={handleSubmit(sendData)}>
                        <Input
                            name="username"
                            id="username"
                            type="text"
                            register={register}
                            inputName="Username"
                            inputError= {errors.username?.message}
                        />
                        <Input
                            name="password"
                            id="password"
                            type="password"
                            register={register}
                            inputName="Password"
                            inputError= {errors.password?.message}
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