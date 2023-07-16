import CartWidget from "../CartWidget/CartWidget";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Todo", category: "all" },
  { name: "Funk", category: "funk" },
  { name: "Metal", category: "metal" },
  { name: "Nu-Metal", category: "numetal" },
  { name: "Post-Hardcore", category: "posthardcore" },
];

export const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" sticky="top" variant="light">
      <Container className="px-4 px-lg-4">
        <Navbar.Brand className="fst-italic fs-4">Vinyl Store</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0 ms-lg-4">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/category/vinilo">Vinilos</Nav.Link> */}
            <NavDropdown title="Productos">
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
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CartWidget />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};
