import React, { useEffect, useRef, useState } from "react";

import "../App.css";

import "../order.css";

const Cart = () => {
  const [data, setData] = useState("");
  const [orders, setOrders] = useState(false);
  const rzpButtonRef = useRef(null);
  const [payment_id, setpayment_id] = useState("");
  const [razorpay_signature, setrazorpay_signature] = useState("");
  const [itemamount, setitemamount] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectimage, setselectimage] = useState("");
  const [addedcart, setaddedcart] = useState([]);


  const eventchange = (e) => {
    setitemamount(e.target.value);
  };

  useEffect(() => {
    rzpButtonRef.current.onclick = async function (e) {
      e.preventDefault();

      const response = await fetch("http://localhost:3001/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: itemamount * 100,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log("response data", responseData.order);

        setData(responseData.order);

        const { success, order, amount } = responseData;
        // Use the data as needed
      } else {
        console.error("Error:", response.status);
      }

      // let orderData = data;
    };

    if (data !== "") {
      const options = {
        key: "rzp_test_AsieLfVYqPqP2J",
        amount: data?.amount,
        currency: "INR",
        name: "Metalok.io",
        description: "Test Transaction",
        image: "https://www.metalok.io/images/website-logo.png",
        order_id: data?.id,
        prefill: {
          name: "Shankar",
          email: "shankar@metalok.io",
          contact: "99639901869",
        },
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);

          console.log("razorpay orderrrrrrrrrrrrrrrrrrrrrrdata", response);

          setpayment_id(response.razorpay_payment_id);

          setrazorpay_signature(response.razorpay_signature);
        },
        notes: {
          address: "hitech city",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  }, [data, itemamount]);

  const orderClick = (each) => {
    setOrders(true);
  };
  const timestamp = data.created_at;
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const [fooddata, setfooddata] = useState("");

  console.log("order dataaaaaaaaaaaaaa", data);

  //----------------------------------------------- cart

  const YOUR_APP_ID = "82e453da";
  const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

  useEffect(() => {
    const apidata = () => {
      const apidata = fetch(
        `https://api.edamam.com/search?q=g&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
        .then((response) => response.json())
        .then((fooddata) => {
          setfooddata(fooddata.hits);
        });
    };
    apidata();
  }, []);

  //------------------------------------------------- end cart

  const Foodfun = (each, index) => {
    const orderClick = (item, index) => {
      setitemamount(item.index + 150);
      setOrders(true);
      // console.log('chosed item', item)
      setSelectedItem(item.each.recipe.label);
      setselectimage(item.each.recipe.image);
    };

    return (
      <div className="col-md-4 text-center">
        <img src={each.each.recipe.image} alt="" />
        <h6 className="text-center">{each.each.recipe.label}</h6>
        <div className="d-flex align-items-center justify-content-center gap-3 mt-2 mb-5">
          <h3>{150 + each.index} Rs</h3>
          <h3 onClick={() => orderClick(each)} className="btn btn-primary">
            buy now
          </h3>
          {/* <h5 className="btn btn-success" onClick={() => { addcart(each);}} >
            add cart
          </h5> */}
        </div>
      </div>
    );
  };

  const close = () => {
    setOrders(false);

    // console.log("hellllllllloooooo");
  };

  if (payment_id !== "") {
    setTimeout(() => {
      setOrders(false);
    }, 3000);
  }

  console.log("payyyyyyyyyyyyyyyyyyyyyyyyyment", payment_id);

  // -----------------------------------------add to cart section

  const addcart = (each, index) => {
    setaddedcart([...addedcart, each]);
  };

  console.log("addedcart data", addedcart);

  // ------------------------------------------add to cart section end

  return (
    <div className="container">
      <div className="payment-btns" style={{ display: orders ? "" : "none" }}>
        <h1 className="close-btn" onClick={close}>
          X
        </h1>
        <img src={selectimage} width={150} alt="" />
        <h4>{selectedItem}</h4>
        <h4>order amount: {itemamount} Rs </h4>
        <h4 className="btn btn-success pl-5" ref={rzpButtonRef}>
          Make Payment
        </h4>

        <div style={{ display: orders ? "block" : "none" }}>
          <h1 style={{ display: payment_id ? "block" : "none" }}> thank you</h1>
          <h5 style={{ display: payment_id ? "block" : "none" }}>
            {" "}
            order id:- {razorpay_signature}
          </h5>
          <h6 style={{ display: payment_id ? "block" : "none" }}>
            {" "}
            date of order: {day} {month} {year}{" "}
          </h6>
        </div>
      </div>

      {/* <div className="d-flex gap-3 justify-content-center mt-4">
        <input
          type="number"
          value={itemamount}
          onChange={eventchange}
          style={{ display: orders ? "none" : "block" }}
        />
        <h3
          onClick={orderClick}
          className="btn btn-outline-primary p-2"
          style={{ display: orders ? "none" : "block" }}
        >
          order now
        </h3>
      </div> */}

      <div></div>

      <div className="row">
        {fooddata !== "" &&
          fooddata.map((each, index) => (
            <Foodfun each={each} key={index} index={index} />
          ))}
      </div>

      
    </div>
  );
};

export default Cart;
