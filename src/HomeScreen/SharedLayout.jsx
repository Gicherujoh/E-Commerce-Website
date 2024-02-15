import React from 'react';
import Nav from './Nav';
import Container from 'react-bootstrap/Container';
import {Outlet} from 'react-router-dom'
const SharedLayout = () => {
  return (
      <>
          <Nav />
          <Container>
              <Outlet/>
          </Container>
      </>
  )
}

export default SharedLayout