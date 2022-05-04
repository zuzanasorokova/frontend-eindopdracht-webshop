import React, {useContext, useEffect, useState} from 'react';
import "./PersonInfoForm.css";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const PersonInfoForm = () => {

    const {register, handleSubmit} = useForm();
    const [error, toggleError] = useState(false);
    const history = useHistory();
    const source = axios.CancelToken.source();
    const {user} = useContext(AuthContext);


    useEffect(() => {
        return function cleanup(){
            source.cancel();
    }}, []);

    async function registerCustomer(info){
        toggleError(false)
        try{
            const userData = await axios.post(`http://localhost:8080/users/customer/${user.username}`, {
                firstname: info.firstname,
                lastname: info.lastname,
                address: info.address,
            }, {
                cancelToken: source.token,
            });
            console.log(userData.data)
            sendToNextPage(userData.data)
        }catch(e){
            console.error(e);
            toggleError(true);
        }
    }

    function sendToNextPage(data){
        console.log(data)
        history.push("/")
    }


    return (
        <>
            <div className="outer-container person-register-page">
                {error && <span>Oops! Er is iets missgegaan!</span>}
                <h1 className="title">GEGEVENS</h1>
                <div className="inner-container">
                    <form className="form" onSubmit={handleSubmit(registerCustomer)}>
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
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>

        </>





    );
}

export default PersonInfoForm;