import Header from "../../components/Header";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import Head from "next/head";
import styles from "../../styles/Product.module.css";
import Product from "../../components/Product";
import Footer from "../../components/Footer";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import QuantityCount from "../../components/QuantityCount";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Firebase from 'firebase'
import {database} from "../../../firebase"
import result from "../../components/CloudFireStore/result";
import { ToastProvider, useToasts } from "react-toast-notifications";
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});
function Details({ product, products }) {
  //add rating methode
  const [value, setValue] = useState(2);
  const [session] = useSession();
  const [hover, setHover] = useState(-1);
  const classes = useStyles();
  const { addToast } = useToasts();
  /*const addToDatabase=()=>{let data ={
    productName : product.name,
    userName :session?.user.name,
    rate :value
                 }
e.preventDefault();
const rootRef =database.ref("ratings");
rootRef.child(product.name).set({
  Productname: product.name,
  user: session?.user.name,
  rate:value
});
    }
    
    */
    let ratedvalue  ;
    let sum =0;
    let i=0;
    const getRatedVlaue=()=>{
      var ref =Firebase.database().ref(`rating/${product.name}`);
      ref.on('value',getRate,errord);
      function getRate(data){
        if (data.val() != null && data.val()!== undefined){
           var score = data.val();
          var key = Object.keys(score);
           i =key.length;
          ratedvalue =0;
          for (let index = 0; index < key.length; index++) {
            var k =key[index];
            var name =score[k].name;
           var rates = score[k].rate;
           
            console.log(rates)
            sum=sum+rates;
            
          }
          ratedvalue=sum/i;
          ratedvalue =ratedvalue.toFixed(1);
          console.log(name,i,ratedvalue);
          console.log("*********");}
        else{ console.log("nulla");
        ratedvalue =0;
      
      }
       
      }
      function errord(err){
        console.log("error here");
        console.log(err);
      }
    }
 
    getRatedVlaue(); 
    
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const {
    name,
    price,
    images,
    description,
    colors,
    company,
    stock,
    reviews,
    category,
    shipping,
  } = product;
  const [activeImage, setActiveImage] = useState(
    images[0].thumbnails.large.url
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );


let len=(e)=>{
  e.preventDefault();
  let data ={
    name : product.name,
    rate: value,
    user: session.user?.name 
  }
  const url = `/rating/${data.name}.json`;
    if (isNaN(data.rate)){alert("not a number !")}
    else{ try {
      //send data
      result.post(url, data).then((response) => {
        console.log("the response", response);
        addToast("Thanks for your Rating !", { appearance: "success" });
      });
    } catch (error) {
      console.log(error);
    }}
   
  
};
  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, title: product.name, quantity }));
    setShowCart(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{name} | Home v2.0</title>
      </Head>
      <Header
        products={products}
        setShowCart={setShowCart}
        showCart={showCart}
      />
      <div className="bg-gray-200 p-10 mb-10">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{" "}
          /{" "}
          <span className="font-medium">
            <Link href="/product">Product</Link>
          </span>{" "}
          / <span className="text-yellow-500">{product.name}</span>
        </div>
        

      </div>
      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4">
              <Image
                className={"w-full rounded-lg " + styles.product_image}
                width={700}
                height={500}
                objectFit="cover"
                src={activeImage}
                alt=""
              />
            </div>
            <div className="flex items-center">
              {images &&
                images.map((image) => (
                  <div
                    className="mr-3 mb-3 cursor-pointer"
                    key={image.id}
                    onClick={() => setActiveImage(image.thumbnails.large.url)}
                  >
                    <Image
                      className="rounded-md"
                      width={100}
                      height={100}
                      objectFit="cover"
                      src={image.thumbnails.large.url}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="px-5 mb-10 w-full md:w-5/12">
            <p className="font-serif text-xl text-black">{category}</p>
            <h1 className="my-2 text-5xl text-yellow-500 mb-7">{name}</h1>
            <p className="text-gray-600 text-base mb-5">{description}</p>
            <p className="flex items-center">
            <b className="mr-1">Rating:</b> {ratedvalue} 
              <StarIcon className="h-5 text-yellow-500" />
              <span> ({i})</span>
            </p>
            <p>
              <b>Company:</b> {company}
            </p>
            <p>
              <b>Stock:</b> {stock > 0 ? "Available in stock" : "Stock out!"}
            </p>

            <div className="flex items-center my-4 cursor-pointer">
              {colors &&
                colors.map((color) => (
                  <div
                    key={Math.random()}
                    className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`}
                    style={{ background: color }}
                  />
                ))}
            </div>
            <p className="text-yellow-500 text-2xl mb-7">
               {price} SP
            </p>
            
            {shipping && (
              <div className="flex items-center space-x-2">
                <img
                  className="w-12"
                  src="https://links.papareact.com/fdw"
                  alt=""
                />
                <p className="text-xs text-gray-500">Free Next-day delivery</p>
              </div>
            )}
            <QuantityCount setQuantity={setQuantity} quantity={quantity} />
            <button onClick={addItemToBasket} className="w-full button mt-4">
              {added ? "Added" : "Add to chart"}
            </button>
            <div className="rounded-sm mt-2">
           <p>Rate this Product :</p>
           <Rating
             name="hover-feedback"
             value={value}
             precision={0.5}
             onChange={(event, newValue) => {
               setValue(newValue);
               
             }}
             onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
             
           />
           <p className="mr-9">{value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}</p>
           <button 
           disabled={!session}
           onClick={len} 
           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
            hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2">submit</button>
           
           
           </div>
           
          </div>
        </div>
      </main>
      <div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-yellow-500 text-3xl mb-7">Related Projects</h1>
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products
                .slice(0, 4)
                .map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    category,
                    image,
                    shipping,
                    colors,
                  }) => (
                    <Product
                      products={products}
                      setShowCart={setShowCart}
                      key={id}
                      id={id}
                      name={name}
                      title={name}
                      shipping={shipping}
                      price={price}
                      description={description}
                      category={category}
                      image={image}
                      colors={colors}
                    />
                  )
                )}
          </div>
        </div>
        <Footer />
       
      </div>
    </>
  );
}

export default Details;

export const getStaticPaths = async () => {
  const products = await fetch(
    "https://course-api.com/react-store-products"
  ).then((response) => response.json());

  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const product = await fetch(
    "https://course-api.com/react-store-single-product?id=" + id
  ).then((response) => response.json());
  const products = await fetch(
    "https://course-api.com/react-store-products"
  ).then((response) => response.json());

  return {
    props: { product, products },
  };
};
