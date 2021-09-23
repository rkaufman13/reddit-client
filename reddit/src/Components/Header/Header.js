import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "../../Features/searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setFilter } from "../../Features/filter/filterSlice";

function Header() {
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
    <div className="row">
      <h1>Welcome to Calm Reddit</h1>
      <Navbar>
        <Container className="col-12 text-center">
          Filter:
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify variant="pills">
              {/*  TODO: make clicking these actually apply filters */}
              <Nav.Link as="button" onClick={clickHandler} value="reddit_image">
                Images
              </Nav.Link>
              <Nav.Link as="button" onClick={clickHandler} value="reddit_video">Movies</Nav.Link>
              <Nav.Link as="button" onClick={clickHandler} value="gifs">Gifs</Nav.Link>
              <Navbar.Text>
                <SearchBar />
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
