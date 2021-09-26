import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { SearchBar } from "../../Features/searchBar/SearchBar";
import { CalmToggle } from '../../Features/calmToggle/CalmToggle';
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
        expand="sm"
        variant="dark"
        fixed="top"
      >
        <Container id="container">
          <Navbar.Brand id="brand">
              <img src={calmRedditLogo} alt="logo"/> Calm Reddit
          </Navbar.Brand>
          <SearchBar />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Filter />
              <CalmToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

