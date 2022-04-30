import React, {useState} from 'react';
import OrderCounter from "../counter/OrderCounter";
import "./ProductInfo.css";
import image from "../../assets/Stawbarry Shake Klein.png"
import Button from "../buttons/Button";
import {Link} from "react-router-dom";
import descriptionBreak from "../../helpers/descriptionBreak";




const ProductInfo = ({productKey, name, kind, description, price1, price2, price3, target, link}) => {
    const [stateCounter, setStateCounter] = useState(0);
    const [statePackage, setStatePackage] = useState("");


    return (
        <div>
            <article key={productKey} className="product">
                <div className="image-container">
                    <img className="weed-top" src={image} alt="weed-top"/>
                </div>
                <div id="product-info-container">
                   <Link to={link} target={target} className="link"><h2>{name}</h2></Link>
                    <h3>{kind}</h3>
                    <h4>Omschrijving</h4>
                    <p className="description">{descriptionBreak(description)}</p>
                    <h4>Verpakking</h4>
                    <div className="package-container" id="package-container">
                        <label htmlFor="three">
                            <input
                            name="seeds-package"
                            type="radio"
                            value="threeSeeds"
                            checked={statePackage === "threeSeeds"}
                            id="three"
                            onChange={(e) => setStatePackage(e.target.value)}
                            />
                            3st / {price1}€
                        </label>
                        <label htmlFor="five">
                        <input
                            name="seeds-package"
                            type="radio"
                            value="sixSeeds"
                            checked={statePackage === "sixSeeds"}
                            id="six"
                            onChange={(e) => setStatePackage(e.target.value)}
                        />
                        5st / {price2}€
                        </label>
                        <label htmlFor="ten">
                        <input
                            name="seeds-package"
                            type="radio"
                            value="tenSeeds"
                            checked={statePackage === "tenSeeds"}
                            id="ten"
                            onChange={(e) => setStatePackage(e.target.value)}
                        />
                            10st / {price3}€
                        </label>
                    </div>
                    <div>
                        <OrderCounter
                            counter={stateCounter}
                            minusOne={() => setStateCounter(stateCounter -1)}
                            plusOne={() => setStateCounter(stateCounter +1)}
                        />
                    </div>
                    <Button
                        className="button"
                        disabled={stateCounter === 0}
                        type="button"
                        buttonName="Bestel"

                    />
                </div>
            </article>

        </div>
    );
};

export default ProductInfo;