import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import styles from "../styles/Product.module.css";
import Link from "next/link";
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { EyeIcon } from "@heroicons/react/outline";
import QuickView from "./QuickView";
import Firebase from 'firebase'
import firebase from "../../firebase";
import database from "../../firebase";
function Product({
  id,
  title,
  price,
  description,
  image,
  shipping,
  colors,
  company,
  setShowCart,
  products,
}) {
  let arr ;
  let ratedvalue  ;
    let sum =0;
    const getRatedVlaue=()=>{
      var ref =Firebase.database().ref(`rating/${title}`);
      ref.on('value',getRate,errord);
      function getRate(data){
        if (data.val() != null && data.val()!== undefined){
           var score = data.val();
          var key = Object.keys(score);
          let i =key.length;
          ratedvalue =0;
          for (let index = 0; index < key.length; index++) {
            var k =key[index];
            var name =score[k].name;
           var rates = score[k].rate;
           
            console.log(rates)
            sum=sum+rates;
            
          }
          ratedvalue=sum/i;
          console.log(name,i,ratedvalue);
          console.log("*********");
          ratedvalue = Math.floor(ratedvalue);
        }
          
        else{ 
          console.log("nulla");
         
      
      }
       
      }
      function errord(err){
        console.log("error here");
        console.log(err);
      }
    }
 
    getRatedVlaue(); 


  const dispatch = useDispatch();
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [showQuick, setShowQuick] = useState(false);
  const [added, setAdded] = useState(false);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      image,
      shipping,
      colors,
      quantity: 1,
    };

    dispatch(addToBasket(product));
    setShowCart(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
   
  return (
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
                src={image}
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
            <Link href={`/product/${id}`}>
              <h4 title={title} className="cursor-pointer my-3 font-bold">
                {title}
              </h4>
            </Link>
            {company}

            <div className="flex">
              {Array(ratedvalue)
                .fill()
                .map((_, index) => (
                  <StarIcon key={index} className="h-5 text-yellow-500" />
                ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-1">
            <p>{price} sp </p> 
            </div>
            
            <div className="flex items-center my-4">
              {colors &&
                colors.map((color) => (
                  <div
                    key={Math.random()}
                    className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`}
                    style={{ background: color }}
                  />
                ))}
            </div>
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
            <button
              title="Please Click MEEEE"
              onClick={addItemToBasket}
              className="mt-auto button"
            >
              {added ? "Added" : "Add to Cart"}
            </button>
          </div>
        </>
      </Fade>
      {showQuick && (
        <QuickView setShowQuick={setShowQuick} id={id} products={products} />
      )}
    </>
  );
}

export default Product;
