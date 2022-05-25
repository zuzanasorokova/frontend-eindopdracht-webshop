import React, {useEffect, useState} from 'react';
import "./ProductForm.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/inputs/Input";
import {yupResolver} from "@hookform/resolvers/yup";


const schema = yup.object().shape({
    name: yup.string().required("Deze veld mag niet leeg zijn!"),
    kind: yup.string().required("Deze veld mag niet leeg zijn!"),
    description: yup.string().required("Deze veld mag niet leeg zijn!").max(200, "Er mogen maximaal 200 karakters gebruikt worden!"),
    priceThreeSeeds: yup.string().required("Deze veld mag niet leeg zijn!").matches(/\d+[.]\d{2}/g, "Gebruik punt ipv komma!"),
    priceFiveSeeds: yup.string().required("Deze veld mag niet leeg zijn!").matches(/\d+[.]\d{2}/g, "Gebruik punt ipv komma!"),
    priceTenSeeds: yup.string().required("Deze veld mag niet leeg zijn!").matches(/\d+[.]\d{2}/g, "Gebruik punt ipv komma!"),
    vatPercentage: yup.string().required("Deze veld mag niet leeg zijn!"),
});

const ProductForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur", resolver: yupResolver(schema)});
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
                <Input
                id="product-name"
                inputName="Product naam"
                type="text"
                register={register}
                name="name"
                inputError={errors.name?.message}
                />
                <Input
                    id="kind"
                    inputName="Soort"
                    type="text"
                    register={register}
                    name="kind"
                    inputError={errors.kind?.message}
                />

                <label htmlFor="description" className="textarea-label">Omschrijving</label>
                <textarea
                    className="input"
                    rows="4"
                    cols="40"
                    id="description"
                    {...register("description")}
                />
                <p className="input-error">{errors.description?.message}</p>

                <Input
                    id="three"
                    inputName="Prijs voor 3 zaden"
                    type="text"
                    register={register}
                    name="priceThreeSeeds"
                    inputError={errors.priceThreeSeeds?.message}
                />

                <Input
                    id="five"
                    inputName="Prijs voor 5 zaden"
                    type="text"
                    register={register}
                    name="priceFiveSeeds"
                    inputError={errors.priceFiveSeeds?.message}
                />

                <Input
                    id="ten"
                    inputName="Prijs voor 10 zaden"
                    type="text"
                    register={register}
                    name="priceTenSeeds"
                    inputError={errors.priceTenSeeds?.message}
                />

                <Input
                    id="vat"
                    inputName="BTW"
                    type="text"
                    register={register}
                    name="vatPercentage"
                    inputError={errors.vatPercentage?.message}
                />

                <Input
                    id="photo"
                    inputName="Foto"
                    type="file"
                    register={register}
                    name="photo"
                    inputError={errors.photo?.message}
                />

                <button type="submit">Product toevogen</button>

            </form>
        </div>
</>
    );
};

export default ProductForm;