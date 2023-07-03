import CartWidget from "../CartWidget/CartWidget";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" sticky="top" variant="light">
      <Container className="px-4 px-lg-4">
        <Navbar.Brand className="fst-italic fs-4">Vinyl Store</Navbar.Brand>
    
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0 ms-lg-4">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Tienda</Nav.Link>
            <Nav.Link href="/">Nosotros</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CartWidget/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
