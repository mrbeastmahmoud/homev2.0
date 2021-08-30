import { createSlice } from "redux";
let value = 12;
const initialState = {
    rate: 1,
    products: "",
    user:""
  };
  const addRate =()=>{return {type:"ADD"}};
  const counter = (state = 0,action)=>{
    switch(action.type){
      case "ADD": return state+1;
    }
      
    }
    let store = createSlice(counter);
    store.subscribe(()=>console.log(store.getState()));
  
 store.dispatch(addRate);
  //addRate: (state=1, action) => {
   // state.products = action.payload
   // state.rate = 4
  //},