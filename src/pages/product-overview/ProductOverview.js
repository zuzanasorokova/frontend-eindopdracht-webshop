import React, {useEffect, useState} from 'react';
import "./ProductOverview.css"
import axios from "axios";
import ProductInfo from "../../components/product-detail/ProductInfo";

const ProductOverview = () => {

    const [loading, toggleLoading] = useState();
    const [error, toggleError] = useState();
    const [products, setProducts] = useState(null);

    useEffect(() => {

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try{
                const result = await axios.get(`http://localhost:8080/products`);
                console.log(result.data);
                setProducts(result.data);
            }catch(e){
                console.log(e);
                toggleError(true)
            }
            toggleLoading(false);
        }
        fetchData();

    }, []);

    return (
        <>
            <main className="outer-container product-body">
                {error && <span>Er is iets misgegaan.</span>}
                {loading && <span>Loading...</span>}
                <h1 className="title">SEED COLLECTION</h1>
                <div className="inner-container">
                    <div className="product-view">
                        {products && products.map((product) => {
                            return (
                                <ProductInfo
                                key={product.id}
                                name={product.name}
                                kind={product.kind}
                                description={product.description}
                                price1={product.priceThreeSeeds}
                                price2={product.priceFiveSeeds}
                                price3={product.priceTenSeeds}
                                link={`/seeds/:${product.id}`}
                                />
                            )
                        })}

                    </div>
                </div>
            </main>
            
        </>
    );
};

export default ProductOverview;