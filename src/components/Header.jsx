// Import bootstrap components to use in navbar
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import logo from "../assets/images/productive-programming-logo.png";

// Import link container that allows bootstrap and react router to work together
import { LinkContainer } from 'react-router-bootstrap'

function Header () {
    return (
        <Navbar id="mainNavbar" expand="lg" className="navbar-dark fixed-top mb-5" collapseOnSelect>
          <LinkContainer to="/">
          <Navbar.Brand className="mx-3">
            <img src={logo} />
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="mx-3" id="basic-navbar-nav">
            <Nav className="m-1 gap-3">
              <LinkContainer to="/news">
              <Nav.Link>News</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/notes">
              <Nav.Link>Notes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/study">
              <Nav.Link>Study</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stack-overflow">
              <Nav.Link>Stack Overflow</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;