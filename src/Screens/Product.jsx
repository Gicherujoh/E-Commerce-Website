import React, { useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyRating from '../HomeScreen/Rating';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { ProductContext } from '../Context/ProductContext';
import { useDispatch,useSelector } from 'react-redux';
import { addTocart} from '../Redux/ProductSlice';
import axios from 'axios';
import './Product.css';
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, setProduct } = useContext(ProductContext)
  
  const AddToCart = (items) => {
    dispatch(addTocart(items))
      navigate('/cart')
   }
  
  return (
<Container className='mt-5 justify-content-center align-items-center'>
  <Container>
  
      <Row key={product?.id}> 
        <img src={product?.image} className='product-image' alt={product?.name} />
        <Col>
          <h3>{product?.name}</h3>
          {/* Add item description if available */}
          {product?.description && <p>{product?.description}</p>}
          <p className='price'>Price: <span className='price'>{product?.price}</span></p>
          <div className='rating'>
            <p className='price'>Reviews:</p>
            <span><MyRating value={ product?.rating.rate} /></span> {/* Assuming there's a component or value for reviews */}
          </div>
          <Button variant="dark" style={{ width: '200px' }} onClick={()=>AddToCart(product)}>Add To Cart</Button>
        </Col>
      </Row>
  </Container>

</Container>
  )
}

export default Cart