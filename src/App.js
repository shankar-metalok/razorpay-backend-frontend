import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Cart from './components/cart'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './components/home';
import Header from './components/header';
import Addedcart from './components/addedcart';

import { Provider } from 'react-redux';
import store from './redux/store'
import Demorazorpay from './components/demorazorpay'
import Fromdb from './components/databaseallordersdata'

const App = () => {
  return (

  <Provider store={store}>
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/addedcart' element={<Addedcart/>}/>
        <Route path='/demorazorpay' element={<Demorazorpay/>}/>


        <Route path='/databaseallordersdata' element={<Fromdb/>}/>
      </Routes>
   
   </BrowserRouter>
  </Provider>

  )
}

export default App