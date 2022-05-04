import React from 'react';
import "./Inputs.css";


const Input = ({labelClassName, id, type, name, register, inputName, error }) => {


    return (
        <div className="input-container">
            <label className={labelClassName} htmlFor={id}>
                <input
                    type={type}
                    id={id}
                    {...register(name)}
                />
                {inputName}
            </label>
            {error && <p> error.message </p>}
        </div>

    );
};

export default Input;