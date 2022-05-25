import React from 'react';
import {set, useForm} from "react-hook-form";

const PackageOptions = ({product}) => {
    const {register} = useForm()

    return (
        <div className="package-container" id="package-container">
            <label htmlFor="three">
                <input
                    {...register("seedsPackage")}
                    type="radio"
                    value="ThreeSeeds"
                    id="three"
                    className="form-check-input"
                />
                3st / {product.priceThreeSeeds}€
            </label>
            <label htmlFor="five">
                <input
                    {...register("seedsPackage")}
                    type="radio"
                    value="fiveSeeds"
                    id="five"
                    className="form-check-input"
                />
                5st / {product.priceFiveSeeds}€
            </label>
            <label htmlFor="ten">
                <input
                    {...register("seedsPackage")}
                    type="radio"
                    value="tenSeeds"
                    id="ten"
                    className="form-check-input"
                />
                10st / {product.priceTenSeeds}€
            </label>
        </div>
    );
};

export default PackageOptions;