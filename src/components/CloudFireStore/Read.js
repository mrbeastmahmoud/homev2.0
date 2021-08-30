import "firebase/firestore";
import result from "../CloudFireStore/result";
import "firebase/storage";
import { getSession, useSession } from "next-auth/client";
import { ToastProvider, useToasts } from "react-toast-notifications";

function Read() {
  const { addToast } = useToasts();
  const [session] = useSession();
  let trans = "";
  let fund = "";
  const sendData = async () => {
    if (session) {
      try {
        result
          .get(`/fund/${session.user?.name}/-MdLTPbdynFi5QcpRxu8.json`)
          .then((snapshot) => {
            console.log(snapshot.data);
            trans = snapshot.data.repoted;
            fund = snapshot.data.funds;
            if (trans == "pending") {
              const name = `hello ${session.user?.name} your have ${fund}$ wating for admin approve`;
              addToast(name, { appearance: "error" });
            } else {
              fund = snapshot.data.funds;
              const name = `hello ${session.user?.name} your have ${fund} wating for admin approve`;
              addToast(name, {
                appearance: "success",
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("PLEASE LOG IN TO VIEW YOUR FUNDS");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold mx-8 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={sendData}
      >
        get data
      </button>
    </div>
  );
}

export default Read;
