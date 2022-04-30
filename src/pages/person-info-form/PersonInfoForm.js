import React, {useEffect, useState} from 'react';
import "./PersonInfoForm.css";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";

const PersonInfoForm = () => {

    const {register, handleSubmit} = useForm();
    const [error, toggleError] = useState(false);
    const history = useHistory();
    const source = axios.CancelToken.source()

    useEffect(() => {
        return function cleanup(){
            source.cancel();
    }}, []);

    async function registerCustomer(info){
        toggleError(false)
        try{
            const userData = await axios.post("http://localhost:8080/customers", {
                firstname: info.firstname,
                lastname: info.lastname,
                address: info.address,
            }, {
                cancelToken: source.token,
            });
            console.log(userData.data)
            history.push("/profile")
        }catch(e){
            console.error(e);
            toggleError(true);
        }
    }


    return (
        <>
            <div className="outer-container person-info-body">
                {error && <span>Oops! Er is iets missgegaan!</span>}
                <h1 className="person-info-title">GEGEVENS</h1>
                <div className="inner-container">
                    <form className="person-info-form" onSubmit={handleSubmit(registerCustomer)}>
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