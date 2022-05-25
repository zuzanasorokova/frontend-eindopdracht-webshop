import React, {useContext, useState} from 'react';
import OrderCounter from "../counter/OrderCounter";
import "./ProductInfo.css";
import image from "../../assets/Stawbarry Shake Klein.png"
import Button from "../buttons/Button";
import {Link} from "react-router-dom";
import descriptionBreak from "../../helpers/descriptionBreak";
import PackageOptions from "../package-options/PackageOptions";
import {useForm} from "react-hook-form";





const ProductInfo = ({product, addItemToCart}) => {
    const [statePackage, setStatePackage] = useState("");
    const {handleSubmit} = useForm();

    function submitHandler(){
        console.log(statePackage);
        addItemToCart(product, statePackage);
    }

    return (
        <div>
            <article key={product.id} className="product">

                <img className="weed-top" src={image} alt="weed-top"/>

                <div id="product-info-container">
                    <Link to={`/seeds/:${product.id}`} className="link"><h2>{product.name}</h2></Link>
                    <h3>{product.kind}</h3>
                    <h4>Omschrijving</h4>
                    <p className="description">{descriptionBreak(product.description)}</p>
                    <h4>Verpakking</h4>
                    <form onSubmit={handleSubmit(submitHandler)}>
                            {/*<PackageOptions product={product}/>*/}
                        {/*    <Button*/}
                        {/*        className="button"*/}
                        {/*        disabled={false}*/}
                        {/*        type="submit"*/}
                        {/*        buttonName="Tovoegen"*/}
                        {/*    />*/}
                        {/*</form>*/}

                        <div className="package-container" id="package-container">
                            <label htmlFor="three">
                                <input
                                    name="seeds-package"
                                    type="radio"
                                    value={`${product.priceThreeSeeds}`}
                                    checked={statePackage === `${product.priceThreeSeeds}`}
                                    id="three"
                                    onChange={(e) => setStatePackage(e.target.value)}
                                />
                                3st / {product.priceThreeSeeds}€
                            </label>
                            <label htmlFor="five">
                                <input
                                    name="seeds-package"
                                    type="radio"
                                    value={`${product.priceFiveSeeds}`}
                                    checked={statePackage === `${product.priceFiveSeeds}`}
                                    id="five"
                                    onChange={(e) => setStatePackage(e.target.value)}
                                />
                                5st / {product.priceFiveSeeds}€
                            </label>
                            <label htmlFor="ten">
                                <input
                                    name="seeds-package"
                                    type="radio"
                                    value={`${product.priceTenSeeds}`}
                                    checked={statePackage === `${product.priceTenSeeds}`}
                                    id="ten"
                                    onChange={(e) => setStatePackage(e.target.value)}
                                />
                                10st / {product.priceTenSeeds}€
                            </label>

                        </div>
                        {/*<div>*/}
                        {/*    <OrderCounter*/}
                        {/*        counter={stateCounter}*/}
                        {/*        minusOne={() => setStateCounter(stateCounter -1)}*/}
                        {/*        plusOne={() => setStateCounter(stateCounter +1)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<Button*/}
                        {/*    className="button"*/}
                        {/*    disabled={false}*/}
                        {/*    type="button"*/}
                        {/*    buttonName="Tovoegen"*/}
                        {/*    clickHandler={() => addItemToCart(product)}*/}
                        {/*/>*/}
                            <Button
                                className="button"
                                disabled={false}
                                type="submit"
                                buttonName="Tovoegen"
                            />




                        </form>
                </div>

            </article>

        </div>
);
};

export default ProductInfo;