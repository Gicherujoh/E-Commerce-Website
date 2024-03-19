import React,{useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { UserContext } from '../Context/UserContext';
import Col from 'react-bootstrap/Col'
import './Nav.css'
const Nav = () => {
  const {user} = useContext(UserContext)
  return (
      <Container>
          <Container className='mb-5'>
                <Navbar expand="lg"  fixed='top' className='nav-header'>
                  <h4 className='nav-title'>Online Shopping</h4>
           </Navbar>
          </Container>  
            <Container fluid>
  <Row className=' align-items-center'>
    <Col xs={12} sm={6} md={4} lg={3}>
      <img src='./onlineStore.jpeg' className='img' alt='Online Store' />
    </Col>
    <Col xs={12} sm={6} md={4} lg={3} className='mt-3 mt-sm-0'>
      <InputGroup>
        <Form.Control
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        
          <InputGroup.Text id="basic-addon2" className='bg-dark text-white'>Search</InputGroup.Text>
        
      </InputGroup>
    </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='mt-3 mt-sm-0'>
            
            {
              user ? (
                <Row>
                  <p className='nav-user'>Hello:{ user?.name }</p>
                </Row>
              ):
              (<Row>
              <Col xs={6}>
                <Link to='register' className='auth'>REGISTER</Link>
              </Col>
              <Col xs={6}>
                <Link to='login' className='auth'>LOGIN</Link>
              </Col>
              </Row>)
            }
    </Col>
  </Row>
</Container>

      </Container>
  )
}

export default Nav