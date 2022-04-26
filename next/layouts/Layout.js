import React, { Component } from 'react';
import Head from 'next/head';
import Footer from '../src/component/Footer';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default (props) => {
  //console.log('Layout.auth', props.auth);
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    console.log('logout call');
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    await router.push('/');
  };

  let menu;

  if (props.auth) {
    menu = (
      <li className="nav-item">
        <Link href="#">
          <a className="nav-link" onClick={logout}>
            logout
          </a>
        </Link>
      </li>
    );
  } else {
    menu = <li></li>;
  }

  return (
    <>
      <Head></Head>
      {/* <Top auth={props.auth} /> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Home</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/about">
                  <a className="nav-link" aria-current="page">
                    About
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin">
                  <a className="nav-link">Admin</a>
                </Link>
              </li>
              {menu}

              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link">login</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register">
                  <a className="nav-link">register</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <Footer />
    </>
  );
};
