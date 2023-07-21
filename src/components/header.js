import React from 'react'
import { Link } from 'react-router-dom'
import cartimg from '..//images/cart-logo.jpg'
import { connect } from 'react-redux'


const Header = ({itemsadded}) => {

  console.log('header items', itemsadded.length)
  return (
    <div className='d-flex justify-content-around align-items-center mb-3' style={{border:'2px solid grey'}}>

       <Link to='/'>Home</Link>
       <Link to='/cart'>cart</Link>

       <Link to='/addedcart'><h3 className='items-added'>{itemsadded.length}</h3><img src={cartimg} alt="" width={90} /></Link>

    </div>
  )
}

const mapStateToProps = (state) => {return {itemsadded:state.Addedcart}}


export default connect(mapStateToProps) (Header)