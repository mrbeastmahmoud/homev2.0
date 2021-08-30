import result from "../components/CloudFireStore/result"
import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import styles from "../styles/Product.module.css";
import Link from "next/link";
import Fade from "react-reveal/Fade";


import { EyeIcon } from "@heroicons/react/outline";
import QuickView from "../components/QuickView";
import Firebase from 'firebase'
import firebase from "../../firebase";
import database from "../../firebase";
import { useEffect } from "react";


import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import Head from "next/head";
import Product from "../components/Product";
function used() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        result.get("/product.json").then((response) => {
            let rawData = response.data;
            let keys = Object.keys(rawData);
            let res = [];
            keys.forEach(key => {
                if (rawData[`${key}`].statue === "confirm")
                    res.push({
                        "id": key,
                        ...rawData[`${key}`],
                    })
            });
            setProducts(res);
        })
    });
    console.log("hereeee")
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Home 2.0</title>
            </Head>


            <Header />


            <div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                {!!products?.length && products.map(product => (
                    <>
                        <Fade bottom>
                            <>
                                <div
                                    className={
                                        "relative flex flex-col m-5 z-40 bg-white p-8 rounded-xl " +
                                        styles.loop_product
                                    }
                                >
                                    <div
                                        className={`relative rounded-lg ${styles.product_image_wrapper}`}
                                    >
                                        <Image
                                            className={
                                                "cursor-pointer rounded-lg overflow-hidden w-full " +
                                                styles.loop_product_image
                                            }
                                            loading="lazy"
                                            src={product.image}
                                            width={800}
                                            height={500}
                                            objectFit="cover"
                                        />
                                        <div
                                            onClick={() => setShowQuick(true)}
                                            className={`rounded-lg cursor-pointer ${styles.product_image_overly}`}
                                        >
                                            <div
                                                className={`button rounded-lg ${styles.product_image_overly_button}`}
                                            >
                                                <span>Quick View</span>
                                                <EyeIcon className="h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    <h4 title={product.names} className="cursor-pointer my-3 font-bold">
                                        {product.names}
                                    </h4>

                                    {product.company}


                                    <p className="text-xs my-2 line-clamp-2">Discription :{product.message}</p>
                                    <p className="text-xs my-2 line-clamp-2">Status : {product.statue}</p>
                                    <p className="text-xs my-2 line-clamp-2">Owner's telephone: {product.tell}</p>
                                    <p className="text-xs my-2 line-clamp-2"> Category :{product.category}</p>
                                    <div className="mb-1">
                                        <p>100000 SP </p>
                                    </div>

                                    <div className="flex items-center my-4">
                                        <p>used amount {product.usedTime} month</p>
                                    </div>


                                </div>
                            </>
                        </Fade>

                    </>


                ))}
            </div>

        </div>
    )
}

export default used
