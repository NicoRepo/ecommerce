import CartWidget from "../CartWidget/CartWidget";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Todo", category: "all" },
  { name: "Funk", category: "funk" },
  { name: "Metal", category: "metal" },
  { name: "Nu-Metal", category: "numetal" },
  { name: "Post-Hardcore", category: "posthardcore" },
  { name: "Pop Punk", category: "pop-punk" },
];

export const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" sticky="top" variant="light">
      <Container className="px-4 px-lg-4">
        <Navbar.Brand as={NavLink} to="/" className="fst-italic fs-4">
          <i className="bi bi-vinyl me-1"></i>
          Vinyl Store</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0 ms-lg-4">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/category/vinilo">Vinilos</Nav.Link> */}
            <NavDropdown title="Categorias">
              {categories.map((c) => (
                <NavDropdown.Item
                  key={`nav-filter-${c.category}`}
                  as={NavLink}
                  to={`/category/${c.category}`}
                >
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link disabled as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <CartWidget />
      </Container>
    </Navbar>
  );
};
