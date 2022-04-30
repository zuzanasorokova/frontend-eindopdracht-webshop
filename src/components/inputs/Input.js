import React from 'react';
import "./Inputs.css";
import {useForm} from "react-hook-form";

const Input = ({labelClassName, htmlFor, type, id, nameRegister, inputName, value, name, onChange}) => {
    const {register} = useForm();

    return (
        <div className="input-container">
            <label className={labelClassName} htmlFor={htmlFor}>
                <input
                    type={type}
                    value={value}
                    name={name}
                    id={id}
                    onChange={onChange}
                    {...register(`${nameRegister}`)}
                />
                {inputName}
            </label>
        </div>

    );
};

export default Input;