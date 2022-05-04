import React, {useEffect, useState} from 'react';
import OrderCounter from "../../components/counter/OrderCounter";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import "./Product.css";
import weed from "../../assets/Stawbarry Shake Klein.png";

const Product = () => {
    const [product, setProduct] = useState("");
    const [stateCounter, setStateCounter] = useState(0)
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false)
    const {productId} = useParams();

    useEffect(() => {
    getProductData()
    }, []);

    async function getProductData() {
        toggleLoading(true);
        toggleError(false);

        try{
        const result = await axios.get(`http://localhost:8080/products/${productId}`);
        console.log(result);
        setProduct(result.data);
        }catch(e) {
            console.error(e);
        }
        toggleLoading(false);
    }
    return (
        <>
        <div className="outer-container product-page">
            {error && <span>Er is iets misgegaan.</span>}
            {loading && <span>Loading...</span>}
            <h1 className="title">{product.name}</h1>
            <h2 className="subtitle">{product.kind}</h2>
            {product &&
                <div className="inner-container" id="product-container">
                        <img src={weed} alt="weed-top"/>
                        <div className="product-info">
                            <div className="legend">

                            </div>
                            <h2 className="product-detail">Omschrijving</h2>
                            <p className="product-description">
                                {product.description}
                            </p>
                            <div className="package-container" id="package-container">
                                {/*<input*/}
                                {/*    htmlFor="three"*/}
                                {/*    name="seeds-package"*/}
                                {/*    type="radio"*/}
                                {/*    value="package3"*/}
                                {/*    id="three"*/}
                                {/*    nameRegister="threeSeeds"*/}
                                {/*    inputName={`3st / ${product.priceThreeSeeds}€`}*/}

                                {/*/>*/}
                                {/*<Input*/}
                                {/*    htmlFor="six"*/}
                                {/*    name="seeds-package"*/}
                                {/*    type="radio"*/}
                                {/*    value="seeds"*/}
                                {/*    id="six"*/}
                                {/*    nameRegister="sixSeeds"*/}
                                {/*    inputName={`5st / ${product.priceFiveSeeds}€`}*/}
                                {/*/>*/}
                                {/*<Input*/}
                                {/*    htmlFor="ten"*/}
                                {/*    name="seeds-package"*/}
                                {/*    type="radio"*/}
                                {/*    value="seeds"*/}
                                {/*    id="ten"*/}
                                {/*    nameRegister="tenSeeds"*/}
                                {/*    inputName={`10st / ${product.priceTenSeeds}€`}*/}
                                {/*/>*/}
                            </div>
                            <OrderCounter
                                id="order-counter"
                                idCart="order-cart"
                                counter={stateCounter}
                                minusOne={() => setStateCounter(stateCounter -1)}
                                plusOne={() => setStateCounter(stateCounter +1)}
                            />
                            <Button
                                id="product-button"
                                className="button"
                                disabled={stateCounter === 0}
                                type="button"
                                buttonName="Bestel"
                            />
                    </div>


            </div>}
            <p>Terug naar de <Link to="/seeds">SEED COLLECTION</Link></p>





        </div>
        </>

    );
};

export default Product;