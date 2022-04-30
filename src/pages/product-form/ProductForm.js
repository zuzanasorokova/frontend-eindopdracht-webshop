import React, {useEffect, useState} from 'react';
import "./ProductForm.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";



const ProductForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur"});
    const [error, toggleError] = useState(false);
    const source = axios.CancelToken.source();
    const token = localStorage.getItem("token");
    const history = useHistory()

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function addProduct(product){

        toggleError(false);
        try{
            const productData = await axios.post("http://localhost:8080/products", {
                name: product.name,
                kind: product.kind,
                description: product.description,
                priceThreeSeeds: product.priceThreeSeeds,
                priceFiveSeeds: product.priceFiveSeeds,
                priceTenSeeds: product.priceTenSeeds,
                vatPercentage: product.vatPercentage},
                //photo: product.photo,},
                {
                headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                    cancelToken: source.token,
                }
            )
            console.log(productData);
            history.push("/seeds")
        }catch(e){
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <>
        <div className="outer-container body">
            {error && <span>Er is iets misgegaan.</span>}
        <h1 className="title">Product toevogen</h1>
            <form onSubmit={handleSubmit(addProduct)} className="inner container product-form">
                <label htmlFor="product-name">Product naam</label>
                <input
                    className="input"
                    type="text"
                    id="product-name"
                    {...register("name", {required: "Deze veld mag niet leeg zijn"})}
                />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="kind">Soort</label>
                <input
                    className="input"
                    type="text"
                    id="kind"
                    {...register("kind", {required: "Deze veld mag niet leeg zijn!"})}
                />
                {errors.kind && <p>{errors.kind.message}</p>}

                <label htmlFor="description">Omschrijving</label>
                <textarea
                    className="input"
                    rows="4"
                    cols="40"
                    type="text"
                    id="description"
                    {...register("description", {required: "Deze veld mag niet leeg zijn!", maxLength: {value: 200, message: "Er mogen maximaal 200 karakters gebruikt worden!"}})}
                />
                {errors.description && <p>{errors.description.message}</p>}

                <label htmlFor="three">Prijs voor 3 zaden</label>
                <p className="melding">Gebruik geen koma</p>
                <input
                    className="input"
                    type="text"
                    id="three"
                    {...register("priceThreeSeeds", {required: "Deze veld mag niet leeg zijn!"})}
                />
                {errors.priceThreeSeeds && <p>{errors.priceThreeSeeds.message}</p>}

                <label htmlFor="five">Prijs voor 5 zaden</label>
                <p className="melding">Gebruik geen koma</p>
                    <input
                        className="input"
                        type="text"
                        id="five"
                        {...register("priceFiveSeeds", {required: "Deze veld mag niet leeg zijn!"})}
                    />
                {errors.priceFiveSeeds && <p>{errors.priceFiveSeeds.message}</p>}

                <label htmlFor="ten">Prijs voor 10 zaden</label>
                <p className="melding">Gebruik geen koma</p>
                    <input
                        className="input"
                        type="text"
                        id="ten"
                        {...register("priceTenSeeds", {required: "Deze veld mag niet leeg zijn!"})}
                    />
                {errors.priceTenSeeds && <p>{errors.priceTenSeeds.message}</p>}

                <label htmlFor="vat">BTW</label>
                <input
                    className="input"
                    type="text"
                    id="vat"
                    {...register("vat", {required: "Deze veld mag niet leeg zijn!"})}
                />
                {errors.vat && <p>{errors.vat.message}</p>}

                <label htmlFor="photo">Foto</label>
                <input
                    className="input"
                    type="file"
                    id="photo"
                    {...register("photo")}
                />


                    <button type="submit">Product toevogen</button>

            </form>
        </div>
</>
    );
};

export default ProductForm;