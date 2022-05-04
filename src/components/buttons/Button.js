import React from 'react';
import "./Button.css";

const Button = ({claasName, disabled,type, buttonName, buttonValue, clickHandler, id }) => {
    return (
        <button
            id={id}
            className={claasName}
            disabled= {disabled}
            type={type}
            name={buttonName}
            value={buttonValue}
            onClick={clickHandler}
        >
            {buttonName}
        </button>
    );
};

export default Button;