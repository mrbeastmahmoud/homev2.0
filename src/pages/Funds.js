import Header from "../components/Header";

import Write from "../components/CloudFireStore/Write";
import Read from "../components/CloudFireStore/Read";
import "firebase/firestore";


function Funds() {
  return (
    <div >
      <Header />
      <p className="ml-11"> Here you can select the amount you want :</p>

      <Write />
     
      <br />
    </div>
  );
}
export default Funds;
