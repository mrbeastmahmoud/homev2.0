/*import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import db from "../../firebase";
import Order from "../components/Order";
import Head from "next/head";
import * as admin from "firebase-admin";
import result from "../components/CloudFireStore/result";
import Firebase from 'firebase'
function waletorders({ orders }) {
  const [session] = useSession();


  return (
    <>
      <Head>
        <title>Orders | Home v2.0</title>
      </Head>
      <div className="bg-gray-100 h-screen">
        <Header />

        <main className="max-w-screen-lg mx-auto mt-10 p-10">
          <h1 className="text-3xl border-b mb-3 pb-2 border-yellow-400">
            Your orders
          </h1>

          {session ? (
            <p>{orders && orders?.length} Orders</p>
          ) : (
            <p>Please login to see your orders</p>
          )}

          <div className="mt-5 space-y-4">
            {orders &&
              orders?.map((order) => <Order key={order.id} {...order} />)}
              
          </div>
          <span>hello</span>
        </main>
      </div>
    </>
  );
}

export default waletorders;

export async function getServerSideProps(context) {
  const serviceAccount = require("../../permession.json");
  const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();
  if (db) {
    console.log("NOT DEFINED");
  }
 

  // Get the users login credentials...
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }
  var ref = Firebase.database().ref(`orders/${session?.user.name}`);
  const stripeOrders = await app
ref.get('value', getFund, errord);
function getFund(data) {
  if (data.val() != null && data.val()!== undefined){
  var score = data.val();
  var key = Object.keys(score);
  let i = key.length;
  for (let index = 0; index < key.length; index++) {
    var k = key[index];
    id=1;
    amount=
   
    }}
}


function errord(err) {
  console.log("error here");
  console.log(err);
}
//end of get
  const orders = await Promise.all(
    stripeOrders.map(async (order) => ({
      id: order.id,
     
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
     
      titles: order.data().title,
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
          
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
*/
import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import db from "../../firebase";
import Order from "../components/Order";
import Head from "next/head";
import * as admin from "firebase-admin";

function orders({ orders }) {
  const [session] = useSession();


  return (
    <>
      <Head>
        <title>Orders | Home v2.0</title>
      </Head>
      <div className="bg-gray-100 h-screen">
        <Header />

        <main className="max-w-screen-lg mx-auto mt-10 p-10">
          <h1 className="text-3xl border-b mb-3 pb-2 border-yellow-400">
            Your orders
          </h1>

          {session ? (
            <p>{orders && orders?.length} Orders</p>
          ) : (
            <p>Please login to see your orders</p>
          )}

          <div className="mt-5 space-y-4">
            {orders &&
              orders?.map((order) => <Order key={order.id} {...order} />)}
              
          </div>
         
        </main>
      </div>
    </>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const serviceAccount = require("../../permession.json");
  const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();
  if (db) {
    console.log("NOT DEFINED");
  }
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const moment = require("moment");

  // Get the users login credentials...
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const stripeOrders = await app
    .firestore()
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
     
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
     // timestamp: moment(order.data().timestamp.toDate()).unix(),
      titles: order.data().title,
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
          
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
