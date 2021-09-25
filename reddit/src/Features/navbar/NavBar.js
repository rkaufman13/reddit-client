import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "../../Features/searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setFilter } from "../../Features/filter/filterSlice";
import calmRedditLogo from "../../images/calm_reddit_logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { types } from "../../services/mediatypes";

const categories = Object.entries(types).map(type=> {
  return {
    type:type[1].type,
    displayName:type[1].displayName
  }
})
console.log(categories);

export const NavBar = () => {
  const filterTerm = useSelector(selectFilter);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    const newFilter = e.target.value;
    if (!filterTerm || newFilter != filterTerm) {
      dispatch(setFilter(newFilter));
    }
    if (filterTerm === newFilter) {
      dispatch(setFilter(""));
    }
  };



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
          Filter:
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <NavDropdown title="Filter">
              {categories.map((category, i) => {
                return (
                  <NavDropdown.Item
                    as="button"
                    onClick={clickHandler}
                    key={i}
                    value={category.type}
                  >
                    {category.displayName}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <SearchBar />
        </Container>
      </Navbar>
    </>
  );
};
