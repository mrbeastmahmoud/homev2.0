import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import {
  selectItems,
  selectTotal,
  selectTotalItems,
} from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";
import Firebase from 'firebase'
import firebase, { db } from "../../firebase";
import database from "../../firebase";
import result from "../components/CloudFireStore/result";
import { buffer } from "micro";

 import app from "../../firebase"
import { array } from "prop-types";
import router from "next/router";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout({ products }) {
  const [session] = useSession();
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);
  const selectTotalItem = useSelector(selectTotalItems);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    // Redirect

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };
  //funds knoledgment
  let totalfund = 0;
  var totalpending = 0;
  const getFunds = () => {

    var ref = Firebase.database().ref(`fund/${session?.user.name}`);
    ref.on('value', getFund, errord);
    function getFund(data) {
      if (data.val() != null && data.val() !== undefined) {
        var score = data.val();
        var key = Object.keys(score);
        let i = key.length;
        for (let index = 0; index < key.length; index++) {
          var k = key[index];
          var report = score[k].repoted;
          var funds = score[k].funds
          if (report == "pending") {
            console.log(report)
            totalpending += funds;
            console.log(funds)

            console.log("totalpending", totalpending)
          }
          else { funds=parseInt(funds)
            totalfund += funds
           totalfund= parseInt(totalfund) }
        }
      }
    }



    function errord(err) {
      console.log("error here");
      console.log(err);
    }

  };

  getFunds();
  console.log(totalfund< totalPrice/100 ,"walla ya 5eee")
  let remaning = 0;
  const waletpayout = () => {
    let total = totalPrice / 100;
    if (totalfund < total) {
      alert("you dont have much price");

    } else {
      remaning = totalfund - total;
      var ref = Firebase.database().ref(`fund/${session?.user.name}`);
      ref.remove().then(function () {
        console.log("removed")
        const url = `/fund/${session.user?.name}.json`;
        const data = {
          name: session.user?.name,
          email: session.user?.email,
          funds: remaning,
          repoted: "remaning",
        };
        try {
          //send data
          result.post(url, data).then((response) => {
            console.log("the response", response);
            console.log("updated the data");
          
            
             
        
          });
        } catch (error) {
          console.log(error);
        }
        const urls = `/orders/${session.user?.name}.json`;
        const order = {
          amount: totalPrice/1000,
          amount_shipping: 100,
          images: JSON.parse(image),
          title: JSON.parse(title),
          timestamp:Date. now(),
        };
        try {
          //send data
          result.post(urls,order).then((response) => {
            console.log("the response of addding to db", response);
           router.push("./waletorders")
          });
        } catch (error) {
          console.log(error);
        }
      })
   
    }
  }
 let image= JSON.stringify(items.map((item) => item.image));
      
  let title= JSON.stringify(items.map((item) => item.title));
  
  

  return (
    <>
      <Head>
        <title>Checkout | Home v2.0</title>
      </Head>
      <div className="bg-gray-100">
        <Header products={products} />

        <main className="md:flex max-w-screen-2xl mx-auto">
          {/* Left */}
          <div className="flex-grow m-5 shadow-sm">
            <Image
              className="mx-auto"
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
              alt=""
            />

            <div className="flex flex-col border-b py-5 px-5 mt-3 bg-white">
              <h1 className="text-3xl pb-4 font-semibold">
                {!!items.length ? "Your Shopping Cart" : "Your Cart is emty"}
              </h1>

              {!!items.length &&
                items.map((item) => (
                  <CheckoutProduct key={item.id} {...item} />
                ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col bg-white p-7 shadow-md">
            {!!items.length && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({selectTotalItem} items):{" "}
                  <span className="font-bold text-gray-500">
                    {totalPrice} Sp
                  </span>
                </h2>
                <button
                  onClick={createCheckoutSession}
                  role="link"
                  disabled={!session}
                  className={`button mt-2 ${!session &&
                    `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
                    }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
                <button
                  onClick={waletpayout}
                  role="link"
                  disabled={!session}
                  className={`button mt-2 ${!session &&
                    `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
                    }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed with your walet "}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Checkout;

export async function getServerSideProps(context) {
  const products = await fetch(
    "https://course-api.com/react-store-products"
  ).then((response) => response.json());

  return {
    props: {
      products,
    },
  };
}
