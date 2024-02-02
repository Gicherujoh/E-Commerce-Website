import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import MyRating from './Rating';
import './Product.css'
const Product = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                if (response) {
                    setProducts(response.data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [])
    console.log(products);
  return (
      <Container className='mt-5'>
           <Row>
              {!products ? (<Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>) : (
                  products.map((product) => (
                      <Col key={product.id} gap={3}>
                          <Card style={{ width: '16rem', height: '25rem' }} className='product'>
                              <Card.Img variant="top" className='product-image' src={product.image} />
                              <Card.Body>
                                  <p className='product-title'>{product.title}</p>
                                  <MyRating value={product.rating.rate} />
                                  <p className='product-price'>${product.price}</p>
                                  <Button variant="primary">Add To Cart</Button>
                              </Card.Body>
                          </Card>
                      </Col>
                  )))}
      </Row>
    </Container>
  );
}

export default Product