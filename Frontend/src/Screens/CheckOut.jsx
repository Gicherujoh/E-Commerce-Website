import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import './CheckOut.css'
const CheckOut = () => {
  const navigate = useNavigate();
  const OnNavigate = () => {
      navigate('/mpesaform')
  }
  return (
    <Container className='mt-5'>
      <Row>
      <Card>
      <Card.Header className='payment_methods'>Payment Methods</Card.Header>
      <Card.Body>
        <Card.Title>Available Options</Card.Title>
        <Card.Text className='options'>
          1:Mpesa
        </Card.Text>
        <Button variant="primary" onClick={OnNavigate}>Continue</Button>
      </Card.Body>
    </Card>
    </Row>
    </Container>
  )
}

export default CheckOut