import React, {useContext, useState} from 'react';
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {Button} from "@material-ui/core";
import OrderCounter from "../../components/counter/OrderCounter";

const Order = () => {
    //const [stateCounter, setStateCounter] = useState(0);
   const {cart, addItemsToCart, removeItemsFromCart, itemPrice3, itemPrice5, itemPrice10} = useContext(ShoppingCartContext);

    console.log(cart);
    return (
        <>
            <h1>Jouw bestelling</h1>
            <div>
                {cart.length === 0 && <div>Mandje is leeg!</div>}
            </div>
            {cart.map((item) => (
            <div key={item.id}>
                <div>{item.name}</div>
                <div>
                    <OrderCounter
                        counter={cart.qty}
                        addItem={addItemsToCart}
                        removeItem={{removeItemsFromCart}}>
                    </OrderCounter>
                </div>
                { item.id === 1 &&
                    <>
                        {itemPrice3 &&
                            <div>{item.qty} x €{item.priceThreeSeeds}</div>
                        }
                        {itemPrice5 &&
                            <div>{item.qty} x €{item.priceFiveSeeds}</div>
                        }
                        {itemPrice10 &&
                            <div>{item.qty} x €{item.priceTenSeeds}</div>
                        }
                    </>
                    }
                { item.id === 2 &&
                    <>
                        {itemPrice3 &&
                            <div>{item.qty} x €{item.priceThreeSeeds}</div>
                        }
                        {itemPrice5 &&
                            <div>{item.qty} x €{item.priceFiveSeeds}</div>
                        }
                        {itemPrice10 &&
                            <div>{item.qty} x €{item.priceTenSeeds}</div>
                        }
                    </>
                }
                { item.id === 3 &&
                <>
                    {itemPrice3 &&
                        <div>{item.qty} x €{item.priceThreeSeeds}</div>
                    }
                    {itemPrice5 &&
                        <div>{item.qty} x €{item.priceFiveSeeds}</div>
                    }
                    {itemPrice10 &&
                        <div>{item.qty} x €{item.priceTenSeeds}</div>
                    }
                </>
            }


            </div>
                ))}
        </>


    );
};

export default Order;