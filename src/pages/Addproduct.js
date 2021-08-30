import Header from "../components/Header";
import { useSession } from "next-auth/client";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { storage } from "../../firebase";
import result from "../components/CloudFireStore/result";
import { useRouter } from "next/router";
import { async } from "regenerator-runtime";
import Firebase from 'firebase'

import database from "../../firebase";
// import example from "../components/CloudFireStore/example";
function Addproduct() {
  const router = useRouter();
  const [session] = useSession();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setcategory] = useState("");
  const [used, setUsed] = useState(0);
  const [price, setPrice] = useState(0);
  const [tel, setTel] = useState(0);
  const [pay, setPay] = useState("");
  const [mess, setMess] = useState("");
  const [state, setState] = useState("");
  const [term, setTerm] = useState(false);
  const allInputs = { imageUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  console.log(imageAsFile);

  const postData = (e) => {
    e.preventDefault();
    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = Firebase.storage()
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        Firebase.storage()
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((imageAsUrl) => {
            setImageAsUrl(imageAsUrl);
            console.log("image as url is here mahmpoud ");
            console.log(imageAsUrl);
            const data = {
              names: name,
              usedTime: used,
              tell: tel,
              message: mess,
              company : company,
              category: category,
              price:price,
              image: imageAsUrl,
              statue: "pending"
            };
            result.post("/product.json", data).then((response) => {
              console.log("the response", response);
            });
          });
      }
    );
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  return (
    <div>
      <Header />

      <form onSubmit={postData} className=" text-cyan-600 p-10">
        <div className="text-lg text-cyan-600 mx-auto">
          <span class="text-lg font-semibold text-cyan-600">
            {!session
              ? "SIGN IN TO ADD PRODUCT "
              : `Hello, ${session.user.name}`}
          </span>
        </div>
        <div className="flex-1 m-3">
          <label className="m-3" for="name">
            Product Name
          </label>
          <input
            className="m-5"
            type="text"
            id="name"
            placeholder="Your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="used">
            used time
          </label>
          <input
            className="m-5"
            type="number"
            id="used"
            placeholder="Your number"
            required
            onChange={(e) => setUsed(e.target.value)}
          />
        </div> <div>
          <label className="m-5" for="price">
            price 
          </label>
          <input
            className="m-5"
            type="number"
            id="price"
            placeholder="Your price"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="tel">
            Telephone
          </label>
          <input
            className="m-5"
            type="number"
            id="tel"
            placeholder="Your contact no."
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="company">
            Company
          </label>
          <input
            className="m-5"
            type="text"
            id="company"
            placeholder="company name goes here."
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="category">
          category
          </label>
          <input
            className="m-5"
            type="text"
            id="category"
            placeholder="company name goes here."
            onChange={(e) => setcategory(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="favFramework">
            Payment type?
          </label>
          <select
            onChange={(e) => setPay(e.target.value)}
            className="m-5"
            id="favFramework"
          >
            <option value="react">Cash</option>
            <option value="vue">desposite</option>
          </select>
        </div>
        <div>
          <label className="m-5" for="comment">
            Message
          </label>
          <textarea
            className="m-5"
            id="comment"
            placeholder="Leave a message"
            onChange={(e) => setMess(e.target.value)}
          />
        </div>
        <div>
          <label className="m-5" for="Image">
            set image
          </label>
          <input
            id="Image"
            className="m-5"
            type="file"
            onChange={handleImageAsFile}
          />
        </div>
        <div>
          <label className="m-5" for="terms">
            <input
              className="m-5"
              id="terms"
              type="checkbox"
              onChange={(e) => setTerm(e.target.value)}
            />
            I agree to the terms and privacy policy.
          </label>
        </div>
        <div>
          <button
            onSubmit={postData}
            disabled={!session}
            className={`button mt-2 ${
              !session &&
              `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
            }`}
            type="submit"
          >
            {!session ? "Sign in to add" : "Proceed to add"}
          </button>
        </div>
        <p class="text-sm via-amazon_blue">Needs admin approval.</p>
      </form>
    </div>
  );
}

export default Addproduct;
