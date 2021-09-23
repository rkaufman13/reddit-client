import { Navbar, Container} from 'react-bootstrap'
import { SearchBar } from '../searchBar/SearchBar';
import calmRedditLogo from '../../images/calm_reddit_logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

export const NavBar = () => {
  return (
    <>
      <Navbar className="navbar" fixed="top">
      <Container id="container" fluid>
        <Navbar.Brand id="brand"><img src={calmRedditLogo}/>  Calm Reddit</Navbar.Brand>
        <SearchBar />
      </Container>
    </Navbar>
  </>
  )
}