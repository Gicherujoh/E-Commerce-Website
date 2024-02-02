import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Nav.css'
const Nav = () => {
  return (
      <Container>
          <Container>
                <Navbar expand="lg"  fixed='top' className='nav-header'>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
           </Navbar>
          </Container>  
          <div className='main-content'>
               <Container>
              <Row>
                  <Col>
                      <img src='./onlineStore.jpeg' className='img'/>
                  </Col>
                  <Col className='mt-5'>
                       <InputGroup className="">
                    <Form.Control
                   placeholder="Search"
                   aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                   <InputGroup.Text id="basic-addon2" className='bg-dark text-white'>Search</InputGroup.Text>
                 </InputGroup>
                      </Col>
                      <Col className='mt-5'>
                          <Row>
                              <Col>
                                  <h4>REGISTER</h4>
                              </Col>
                              <Col>
                                  <h4>LOGIN</h4>
                              </Col>
                          </Row>
                      </Col>
              </Row>
          </Container>  
          </div>
          
     </Container>
  )
}

export default Nav