import React from 'react';
import "./OrderCounter.css";
import Button from "../buttons/Button";
import Badge from "@material-ui/core/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const OrderCounter = ({counter, minusOne, plusOne, id, idBadge, idCart }) => {
    return (
        <div>
            <Button
                id={id}
                claasName="amount-button"
                disabled={counter <= 0}
                type="button"
                buttonName="-"
                clickHandler={minusOne}
            />

            <span>{counter}</span>

            {/*<Badge overlap="rectangular" className="amount" badgeContent={counter} id={idBadge}>*/}
            {/*    <FontAwesomeIcon icon={faShoppingCart} className="icon-cart" id={idCart}/>{" "}*/}
            {/*</Badge>*/}

            <Button
                id={id}
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