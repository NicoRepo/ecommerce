import CartWidget from "../CartWidget/CartWidget";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context";

const categories = [
  { name: "Todo", category: "all" },
  { name: "Funk", category: "funk" },
  { name: "Metal", category: "metal" },
  { name: "Nu-Metal", category: "numetal" },
  { name: "Post-Hardcore", category: "posthardcore" },
  { name: "Pop Punk", category: "pop-punk" },
  { name: "Rock", category: "rock" },
];

export const NavBar = () => {
  const {
    state: { cart },
  } = useContext(Context);

  let itemsInCart = Object.values(cart).reduce((a, v) => a + v.qty, 0);
  const [showFullCart, setShowFullCart] = useState(false);

  const handleFullCartState = (state) => setShowFullCart(state);
  return (
    <>
      <Navbar expand="lg" bg="light" sticky="top" variant="light">
        <Container className="px-4 px-lg-4">
          <Navbar.Brand as={NavLink} to="/" className="fst-italic fs-4">
            <i className="bi bi-vinyl me-1"></i>
            Vinyl Store
          </Navbar.Brand>
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
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Button
            variant="outline-dark"
            onClick={() => handleFullCartState(true)}
          >
            <i className="bi-cart-fill me-1"></i> Carrito
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              {itemsInCart}
            </span>
          </Button>
        </Container>
      </Navbar>
      <CartWidget
        showFullCart={showFullCart}
        cart={cart}
        handleFullCartState={handleFullCartState}
      />
    </>
  );
};
