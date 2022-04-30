import React from 'react';
import Button from "../buttons/Button";

const OrderCoutner = () => {
    return (
        <fieldset>
            <Button
                claasName="amount-button"
                disabled={counter <= 0}
                type="button"
                buttonName="-"
                clickHandler
            />
        </fieldset>
    );
};

export default OrderCoutner;