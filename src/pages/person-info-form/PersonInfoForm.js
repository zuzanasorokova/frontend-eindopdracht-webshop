import React, {useContext, useEffect, useState} from 'react';
import "./PersonInfoForm.css";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import * as yup from "yup";
import Input from "../../components/inputs/Input";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    firstname: yup.string().required("Deze veld mag niet leeg zijn!"),
    lastname: yup.string().required("Deze veld mag niet leeg zijn!"),
    address: yup.string().required("Deze veld mag niet leeg zijn!"),
});

const PersonInfoForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur", resolver: yupResolver(schema)});
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
                        <Input
                            name="firstname"
                            id="firstname"
                            type="text"
                            register={register}
                            inputName="Naam"
                            inputError= {errors.firstname?.message}
                        />

                        <Input
                            name="lastname"
                            id="lastname"
                            type="text"
                            register={register}
                            inputName="Achternaam"
                            inputError= {errors.lastname?.message}
                        />

                        <Input
                            name="address"
                            id="address"
                            type="text"
                            register={register}
                            inputName="Adres"
                            inputError= {errors.address?.message}
                        />

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>

        </>





    );
}

export default PersonInfoForm;