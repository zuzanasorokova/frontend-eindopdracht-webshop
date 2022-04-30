import React from 'react';
import "./OrderCounter.css";
import Button from "../buttons/Button";
import Badge from "@material-ui/core/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const OrderCounter = ({counter, minusOne, plusOne }) => {
    return (
        <div>
            <Button
                claasName="amount-button"
                disabled={counter <= 0}
                type="button"
                buttonName="-"
                clickHandler={minusOne}
            />

            <Badge overlap="rectangular" className="amount" badgeContent={counter}>
                <FontAwesomeIcon icon={faShoppingCart} id="icon"/>{" "}
            </Badge>

            <Button
               claasName="amount-button"
               disabled={false}
               type="button"
               buttonName="+"
               clickHandler={plusOne}
            />
        </div>
    );
};

export default OrderCounter;