import CartWidget from "../CartWidget/CartWidget";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../CartContext";
import { getCategories } from "../../API/API";

export const NavBar = () => {
  const {
    state: { cart },
  } = useContext(Context);

  let itemsInCart = Object.values(cart).reduce((a, v) => a + v.qty, 0);
  const [showFullCart, setShowFullCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleFullCartState = (state) => setShowFullCart(state);

  useState(() => {
    getCategories().then(categories => {
      setCategories(categories)
      setLoaded(true);
    })
  }, [loaded])
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
