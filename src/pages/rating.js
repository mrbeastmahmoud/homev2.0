
import Header from '../components/Header';
import Firebase from 'firebase'
import firebase from "../../firebase";
import database from "../../firebase";
import { json } from 'body-parser';



function rating() {
    let jsondata =[{
      names : "",
      image:"",
      company:"",
      message:"",
      category:"",
      status:"",
      tell:"",
      usedTime:""}]
    
    const getFunds = () => {
  
        var ref = Firebase.database().ref("product");
        ref.on('value', getFund, errord);
        function getFund(data) {
           
          if (data.val() != null && data.val()!== undefined){
          var score = data.val();
          var key = Object.keys(score);
          var product= {
           

          }
          let i = key.length;
         
          for (let index = 0; index < key.length; index++) {
            var k = key[index];
            var names= score[k].names;
            var image= score[k].image;
            var company= score[k].company;
            var message= score[k].message;
            var category= score[k].category;
            var statue= score[k].statue;
            var tell= score[k].tell;
            var usedTime= score[k].usedTime;
            console.log(names,image,usedTime,tell,message,category,company,statue)
           jsondata[k] = "name"+":"+ JSON.stringify(names) + "image"+":"+ JSON.stringify(image) +"usedTime"+":"+JSON.stringify(usedTime)+"tell"+":"+JSON.stringify(tell)+"category"+":"+JSON.stringify(category)+"company"+":"+JSON.stringify(company)+"message"+":"+JSON.stringify(message)+"statue"+":"+JSON.stringify(statue)
         
          
             
        }
        console.log(jsondata)
          }
        }
        function errord(err) {
          console.log("error here");
          console.log(err);
        }
    
      };
      
      getFunds();
    return (
        <div>
            <Header/>
        </div>
    )
}

export default rating
export const getStaticProps = async (context) => {
    const producted = await fetch(
      "https://course-api.com/react-store-products"
    ).then((response) => response.json());
    console.log(producted)
  
    return {
      props: { producted },
    };
  };
  