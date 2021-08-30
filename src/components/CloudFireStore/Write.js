import firebase from "firebase/app";
import "firebase/firestore";
import result from "../CloudFireStore/result";

import { useState } from "react";
import { getSession, useSession } from "next-auth/client";
import { ToastProvider, useToasts } from "react-toast-notifications";
function Write() {
  const { addToast } = useToasts();
  const [fund, setFund] = useState(6);
  const [session] = useSession();
  const sendData = () => {
    
    const url = `/fund/${session.user?.name}.json`;
    const data = {
      name: session.user?.name,
      email: session.user?.email,
      funds: fund,
      repoted: "pending",
    };
    try {
      //send data
      result.post(url, data).then((response) => {
        console.log("the response", response);
        addToast("done perfectly", { appearance: "success" });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ml-11">
      <label htmlFor="name">Funds amount</label>
      <input
        id="name"
        type="number"
        required
        onChange={(e) => setFund(e.target.value)}
      />
      <button
        onClick={sendData}
        disabled={!session}
        className={`button mt-2 ${
          !session &&
          `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
        }`}
        type="submit"
      >
        {!session ? "SignIn to charge" : "Proceed to charge"}
      </button>
    </div>
  );
}

export default Write;
