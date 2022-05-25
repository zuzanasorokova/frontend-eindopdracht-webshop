import React from 'react';
import "./Inputs.css";


const Input = ({id, type, name, rules, register, inputName, inputError}) => {


    return (
        <div className="input-container">
            <label className="input-label" htmlFor={id}> {inputName}</label>
            <input
                className="input-field"
                type={type}
                id={id}
                {...register(name, rules)}
            />
            <p className="input-error">{inputError}</p>
        </div>

    );
};

export default Input;