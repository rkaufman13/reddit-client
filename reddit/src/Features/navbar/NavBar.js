import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import SearchBar from "../../Features/searchBar/SearchBar";
import calmRedditLogo from "../../images/calm_reddit_logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { Filter } from '../filter/Filter';


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

