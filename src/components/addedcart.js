import React from "react";
import { connect } from "react-redux";
import { useState,useRef,useEffect } from "react";

import { Delfun } from "../redux/addedaction";

const Addedcart = ({ addeddata, Delfun }) => {
  console.log("data cart added ad", addeddata);

  console.log("images", addeddata[0]?.recipe);

  const totalAmount = addeddata.reduce((acc, current) => acc + current.recipe.totalWeight, 0);

  console.log('total amount', totalAmount)



  const total_amt={
    width:'190px',
    border:'2px solid red',
    display:'flex',
    margin:'20px auto',
    justifycontent:'center'
  }

const delclick = (delparam) =>{
 
    Delfun(delparam)

}






console.log('ttotaaaaaaaaaaaaaaaaaaaaal',totalAmount.toFixed(0) !==0)






  return (
    <div>
      <div className="row">
        {addeddata.map((each, index) => (
          <div className="col-md-4">
            <img src={each.recipe.image} alt="" />
            <h4>{each.recipe.totalWeight.toFixed(0)} Rs</h4>
            <h5 className="btn btn-danger" onClick={()=>delclick(index)}>delete</h5>
          </div>
        ))}
      </div>

      {totalAmount.toFixed(0) > 0 &&

        <h5 className="btn btn-primary" style={total_amt} > total amount: {totalAmount.toFixed(0)}</h5>

        }
       
    </div>
  );
};

const mapStateToProps = (state) => {
  return { addeddata: state.Addedcart };
};

const mapDispatchToProps = { Delfun };

export default connect(mapStateToProps, mapDispatchToProps)(Addedcart);
