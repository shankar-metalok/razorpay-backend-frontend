import React, { useEffect, useRef, useState } from "react";

import "../App.css";

import "../order.css";
import { connect } from "react-redux";
import {Addedfun} from '../redux/addedaction'




const Home = ({addedcart,Addedfun}) => {
  console.log('redux', addedcart)


  const [fooddata, setfooddata] = useState("");
  //----------------------------------------------- cart

  const YOUR_APP_ID = "82e453da";
  const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

  useEffect(() => {
    const apidata = () => {
      const apidata = fetch(
        `https://api.edamam.com/search?q=h&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
        .then((response) => response.json())
        .then((fooddata) => {
          setfooddata(fooddata.hits);
        });
    };
    apidata();
  }, []);

  //------------------------------------------------- end cart

  const eventadd = (addedval)=>{
    const afteradded = addedval.each

    console.log('addeddata' , afteradded)
    Addedfun(addedval.each)
    console.log('rrrrrrrrrrrrrrrrrrrrrredux', addedcart)


  }

  const Foodfun = (each, index) => {

    return (
      <div className="col-md-4 text-center">
        <img src={each.each.recipe.image} alt=""/>
        <h6 className="text-center">{each.each.recipe.label}</h6>
        <div className="d-flex align-items-center justify-content-center gap-3 mt-2 mb-5">
          <h3>{each.each.recipe.totalWeight.toFixed(0)} Rs</h3>
          <h3 className="btn btn-primary" onClick={()=>eventadd(each)}>
            add cart
          </h3>
      
        </div>
      </div>
    );
  };








  return (
    <div className="container">
    
      <div className="row">
        {fooddata !== "" &&
          fooddata.map((each, index) => (
            <Foodfun each={each} key={index} index={index} />
          ))}
      </div>
    </div>
  );
};


const mapStateToProps = (state) =>{ return {addedcart:state.Addedcart}}
const mapDispatchToProps = {Addedfun}

export default connect(mapStateToProps,mapDispatchToProps) (Home);
