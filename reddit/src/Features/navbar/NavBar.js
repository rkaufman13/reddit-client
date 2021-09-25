import React from "react";
import { Navbar, Container } from 'react-bootstrap';
import { SearchBar } from "../../Features/searchBar/SearchBar";
import { Filter } from '../filter/Filter';
import calmRedditLogo from "../../images/calm_reddit_logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

export const NavBar = () => {
  return (
    <>
      <Navbar
        id="basic-navbar-nav"
        className="navbar"
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Container id="container" fluid>
          <Navbar.Brand id="brand">
            <img src={calmRedditLogo} alt="logo"/> Calm Reddit
          </Navbar.Brand>
          <Filter />
          <SearchBar />
        </Container>
      </Navbar>
    </>
  );
};

