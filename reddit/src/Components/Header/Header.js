import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBar from '../../Features/searchBar/SearchBar'


function Header() {
    return (
      <div className="row">
      <h1>Welcome to Calm Reddit</h1>
<Navbar >
<Container>
  Filter:
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav  >
      {/*  TODO: make clicking these actually apply filters */}
          <Nav.Link href="">Images</Nav.Link>
          <Nav.Link href="">Movies</Nav.Link>
          <Nav.Link href="">Gifs</Nav.Link>
          <SearchBar/>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </div>
    );
  }
  
  export default Header;