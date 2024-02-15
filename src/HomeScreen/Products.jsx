import React, { useEffect, useState,useContext } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import MyRating from './Rating';
import Cart from '../Screens/Product';
import { addTocart } from '../Redux/ProductSlice';
import './Products.css';
import { ProductContext } from '../Context/ProductContext';
import {useSelector,useDispatch} from 'react-redux'
const Product = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const {setProduct} = useContext(ProductContext)
 useEffect(() => {
         async function fetchCartData() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                if (response) {
                    setProducts(response.data)
                } else {
                    console.log('Failed to Fetch Cart Data');
                }
            } catch (e) {
                console.log(e)
            }
             
        }
        fetchCartData();
    },[])
    const SingleProduct = (product) => {
        setProduct(product)
        navigate('/product')
   }
  return (
      <Container className='mt-5'>
           <Row>
              {!products ? (<Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>) : (
                  products.map((product) => (
                      <Col  gap={2}>
                          <Card style={{ width: '16rem', height: '20rem' }} className='product'>
                              <Card.Img variant="top" className='product-image'key={product.id}  src={product.image} alt={product.name} onClick={()=>SingleProduct(product)}/>
                              <Card.Body>
                                  <p className='product-title'>{product?.title.length > 20 ? `${product?.title.substring(0, 20)}...` : product?.title}</p>
                                  <MyRating value={product.rating.rate} />
                                  <p className='product-price'>${product.price}</p>
                              </Card.Body>
                          </Card>
                      </Col>
                  )))}
      </Row>
    </Container>
  );
}

export default Product