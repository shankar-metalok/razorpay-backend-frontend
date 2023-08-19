import React, { useEffect, useRef, useState } from "react";

const Demorazorpay = () => {



    const [data, setData] = useState("");
    const [orders, setOrders] = useState(false);
    const rzpButtonRef = useRef(null);
    const [payment_id, setpayment_id] = useState("");
    const [razorpay_signature, setrazorpay_signature] = useState("");
    const [itemamount, setitemamount] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectimage, setselectimage] = useState("");
    const [addedcart, setaddedcart] = useState([]);




    useEffect(() => {
        rzpButtonRef.current.onclick = async function (e) {
          e.preventDefault();
          const response = await fetch("http://localhost:3001/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 1 * 100,
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



  return (
    <div>
       


       <h4 className="btn btn-success pl-5" ref={rzpButtonRef}>
          Make Payment
        </h4>


    </div>
  )
}

export default Demorazorpay