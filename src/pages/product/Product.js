import React, {useContext, useEffect, useState} from 'react';
import OrderCounter from "../../components/counter/OrderCounter";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import "./Product.css";
import weed from "../../assets/Stawbarry Shake Klein.png";
import PackageOptions from "../../components/package-options/PackageOptions";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {useForm} from "react-hook-form";

const Product = () => {
    const [product, setProduct] = useState("");
    const [stateCounter, setStateCounter] = useState(0)
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false)
    const {productId} = useParams();
    const {addItemToCart} = useContext(ShoppingCartContext);
    const {handleSubmit} = useForm();


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

    function submitHandler() {
        addItemToCart(product)
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
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <PackageOptions product={product}/>
                                <Button
                                    className="button"
                                    disabled={false}
                                    type="submit"
                                    buttonName="Tovoegen"
                                />
                            </form>

                            {/*<div className="package-container" id="package-container">*/}
                            {/*    <Input*/}
                            {/*        htmlFor="three"*/}
                            {/*        name="seeds-package"*/}
                            {/*        type="radio"*/}
                            {/*        value="package3"*/}
                            {/*        id="three"*/}
                            {/*        nameRegister="threeSeeds"*/}
                            {/*        inputName={`3st / ${product.priceThreeSeeds}€`}*/}

                            {/*    />*/}
                            {/*    <Input*/}
                            {/*        htmlFor="five"*/}
                            {/*        name="seeds-package"*/}
                            {/*        type="radio"*/}
                            {/*        value="seeds"*/}
                            {/*        id="five"*/}
                            {/*        nameRegister="fiveSeeds"*/}
                            {/*        inputName={`5st / ${product.priceFiveSeeds}€`}*/}
                            {/*    />*/}
                            {/*    <Input*/}
                            {/*        htmlFor="ten"*/}
                            {/*        name="seeds-package"*/}
                            {/*        type="radio"*/}
                            {/*        value="seeds"*/}
                            {/*        id="ten"*/}
                            {/*        nameRegister="tenSeeds"*/}
                            {/*        inputName={`10st / ${product.priceTenSeeds}€`}*/}
                            {/*    />*/}
                            {/*</div>*/}

                    </div>


            </div>}
            <p>Terug naar de <Link to="/seeds">SEED COLLECTION</Link></p>





        </div>
        </>

    );
};

export default Product;