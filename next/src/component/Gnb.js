import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'next/link';

function Gnb(props) {
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    await router.push('/');
  };

  //console.log(router);
  //setActiveItem(selectedKey)
  if (props.auth) {
    return (
      <div>
        <Navbar expand="sm" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <div
                onClick={() => router.push('/')}
                style={{ cursor: 'pointer' }}
                // style={{ flex: '100px 0 0', background: '#fff100', padding: 3 }}
              >
                HOME
              </div>
            </Navbar.Brand>
            <Nav
              className="ml-auto"
              onSelect={(eventKey) => router.push(eventKey)}
              activeKey={router.asPath}
            >
              {/* <Nav.Link eventKey="/">Home</Nav.Link> */}
              <Nav.Link eventKey="/about">About</Nav.Link>
              <Nav.Link eventKey="/admin">Admin</Nav.Link>
              <Nav.Link onClick={logout}>logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar expand="sm" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <div
                onClick={() => router.push('/')}
                style={{ cursor: 'pointer' }}
                // style={{ flex: '100px 0 0', background: '#fff100', padding: 3 }}
              >
                {/* <img
                  src="/images/vercel.svg"
                  alt="=logo"
                  style={{ display: 'block', height: 30 }}
                />
                 */}
                HOME
              </div>
            </Navbar.Brand>
            <Nav
              className="ml-auto"
              onSelect={(eventKey) => router.push(eventKey)}
              activeKey={router.asPath}
            >
              {/* <Nav.Link eventKey="/">Home</Nav.Link> */}
              <Nav.Link eventKey="/about">About</Nav.Link>
              <Nav.Link eventKey="/login">login</Nav.Link>
              <Nav.Link eventKey="/register">register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Gnb;
