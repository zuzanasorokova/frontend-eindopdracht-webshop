import React from 'react';
import "./Button.css";

const Button = ({claasName, disabled,type, buttonName, buttonValue, clickHandler }) => {
    return (
        <button
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