import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import "./UserRegistration.css"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../components/inputs/Input";


const schema = yup.object().shape({
    username: yup.string().required("Deze veld mag niet leeg zijn!"),
    email: yup.string().email("Dit is niet geldige e-mail adres.").required("Deze veld mag niet leeg zijn!"),
    password: yup.string().required("Deze veld mag niet leeg zijn!"),
});


function UserRegistration() {
    const {register, handleSubmit, formState:{errors} } = useForm({mode: "onBlur", resolver: yupResolver(schema)});
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
            // console.log(userData.data)
            sendToNextPage(userData);
        }catch(e){
            console.error(e);
            toggleError(true);
        }
    }

    function sendToNextPage(data){
        console.log(data)
        history.push("/login")
    }

    return (
        <>
            <div className="outer-container user-register-page">
                {error && <span>Er is iets misgegaan tijdens sturen van data.</span>}
                <h1 className="title">REGISTREREN</h1>
                <div className="inner-container">
                    <form className="form" onSubmit={handleSubmit(registerUser)}>
                        <Input
                            name="username"
                            id="username"
                            type="text"
                            register={register}
                            inputName="Username"
                            inputError= {errors.username?.message}
                        />
                        <Input
                            name="email"
                            id="email"
                            type="text"
                            register={register}
                            inputName="E-mail"
                            inputError= {errors.email?.message}
                        />
                        <Input
                            name="password"
                            id="password"
                            type="password"
                            register={register}
                            inputName="Wachtwoord"
                            inputError= {errors.password?.message}
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