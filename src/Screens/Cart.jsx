import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {useSelector,useDispatch} from 'react-redux'

import { addTocart,ClearCart,RemoveProduct,calculateTotal} from '../Redux/ProductSlice';
import './Cart.css';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
const Cart = () => {
    const[items,setItems]=useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [clearcart,setClearCart] = useState(true)
    const { product,amount } = useSelector(state => state.products);
    const { user } = useContext(UserContext)
    useEffect(() => {
        dispatch(calculateTotal());
    },[product])
    const ContinueShopping = () => {
         navigate('/')
    }
   
    console.log(product)
    console.log(items)
    const CheckOut = () => {
        if (user) {
            navigate('/checkout')  
        } else {
            navigate('/register')
          }
    }
    const clearCart=() => {
        dispatch(ClearCart())
        setClearCart(false)
    }
    const RemoveItem = (id) => {
         dispatch(RemoveProduct(id))
    }
    
    console.log(product)
    if (product.length === 0) {
        return (            
                <div className='empty-cart'>
                <h2 className='mb-4'>Your Cart is Empty</h2>
                <div>
                     <Button variant='dark'  onClick={ContinueShopping}>Continue Shopping</Button>
                    </div>
                </div>
        )
    }
  return (
      <Container className='mt-5'>
          { !clearcart ?(<h2 className='text-center'>Your Cart is empty</h2>):!product ? (<Spinner animation="border" role='status'><span className="visually-hidden">Loading...</span></Spinner>) : (
                    product?.map((items) => (
                 
          <Row className='align-items-center  bg-lightgrey  position-relative shadow'>      
              <Col>  
         <div className="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="25" height="25" className='icon-remove' onClick={()=>RemoveItem(items?.id)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </div>

                  <img src={ items?.image} className='cart-image'/>
              </Col>
              <Col>
                  <p className='cart-title'>{items?.title.length > 20 ? `${items?.title.substring(0, 20)}...` : items?.title}</p>
              </Col>
    
              <Col>
                  <p className='cart-subtotal'>Subtotal</p>
                  <p className='cart-price'>Ksh:{items?.price}</p>
              </Col>
          </Row>
                    )))}
             <Row className='items-total'>
                <Col>
                  <h5>Total:Ksh <span className='amount-total'>{amount }</span></h5>
                </Col>

                </Row>
          <Row className='mt-5'>
              <Col className='text-center'>
                   <Button variant='danger' onClick={clearCart}>Clear Cart</Button>
              </Col>
          </Row>
          <Row className='align-items-center mt-5'>
              <Col>
                    <Button variant='dark' onClick={ContinueShopping}>Continue Shopping</Button>
              </Col>
              <Col>
                  {clearcart &&  <Button variant='success' onClick={CheckOut}>Proceed To CheckOut</Button>}
              </Col>
            
          </Row>
    </Container>
  )
}

export default Cart