import React from 'react'

const Databaseallordersdata = () => {


const orderapi = fetch('http://localhost:3001/payment')
.then(res=>res.json())
.then(data=>console.log("ddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaafrom db",data))

  return (
    <div>


        


    </div>
  )
}

export default Databaseallordersdata