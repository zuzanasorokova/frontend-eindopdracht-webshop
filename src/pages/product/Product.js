import React, {useEffect, useState} from 'react';
import OrderCounter from "../../components/counter/OrderCounter";
import axios from "axios";
import {useParams} from "react-router-dom";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";

const Product = () => {
    const [product, setProduct] = useState();
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
    }
    return (
        <div className="outer-container">
            {error && <span>Er is iets misgegaan.</span>}
            {loading && <span>Loading...</span>}
            {product &&
            <article className="inner-container">
                <h1>{product.name}</h1>
                <h2>{product.kind}</h2>
                <section className="product-info">
                    <div className="legend">

                    </div>
                    <p className="product-description">
                        {product.description}
                    </p>
                    <div className="package-container" id="package-container">
                        <Input
                            htmlFor="three"
                            name="seeds-package"
                            type="radio"
                            value="package3"
                            id="three"
                            nameRegister="threeSeeds"
                            inputName={`3st / ${product.priceThreeSeeds}€`}

                        />
                        <Input
                            htmlFor="six"
                            name="seeds-package"
                            type="radio"
                            value="seeds"
                            id="six"
                            nameRegister="sixSeeds"
                            inputName={`5st / ${product.priceFiveSeeds}€`}
                        />
                        <Input
                            htmlFor="ten"
                            name="seeds-package"
                            type="radio"
                            value="seeds"
                            id="ten"
                            nameRegister="tenSeeds"
                            inputName={`10st / ${product.priceTenSeeds}€`}
                        />
                    </div>
                    <OrderCounter
                        counter={stateCounter}
                        minusOne={() => setStateCounter(stateCounter -1)}
                        plusOne={() => setStateCounter(stateCounter +1)}
                    />
                    <Button
                        className="button"
                        disabled={stateCounter === 0}
                        type="button"
                        buttonName="Bestel"
                    />

                </section>
            </article>}






        </div>

    );
};

export default Product;