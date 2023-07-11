import React, { useContext } from "react";
import { Context } from "../../../Context";
import { useLoaderData } from "react-router-dom";
import { Card, Button, Container, Tab, Tabs, ListGroup } from "react-bootstrap";

export const ProductPage = () => {
  const { dispatch } = useContext(Context);
  const loadedProduct = useLoaderData();
  return (
    <Container>
      <Card bg="light" style={{ minWidth: "335px" }}>
        {/* <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header> */}
        <Card.Body>
          <div className="d-flex justify-content-start justify-content-center gap-4 mb-5 flex-wrap">
            <div className="flex-shrink-0">
              <Card.Img
                variant="top"
                className="rounded"
                src={loadedProduct.img}
                style={{ width: "300px" }}
              />
            </div>
            <div className="flex-grow-1">
              <Tabs
                defaultActiveKey="product"
                id="uncontrolled-tab-example"
                fill
              >
                <Tab eventKey="product" title="Producto" className="pt-3 px-2">
                  <div
                    className="d-flex flex-column"
                    style={{ height: "240px" }}
                  >
                    <div className="mb-auto">
                      <Card.Title className="fs-3">
                        {loadedProduct.name}
                      </Card.Title>
                      <Card.Text className="fs-4 fst-italic text-secondary">
                        {loadedProduct.artist}
                      </Card.Text>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <Button
                        variant="outline-dark"
                        onClick={() => {
                          dispatch({
                            type: "ADD_TO_CART",
                            payload: loadedProduct,
                          });
                        }}
                      >
                        Añadir al Carrito
                      </Button>
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey="profile"
                  title="Tracklist"
                  style={{ height: "255px" }}
                  className="overflow-auto"
                >
                  <ListGroup as="ol" numbered >
                    {loadedProduct.tracklist.map((t) => (
                      <ListGroup.Item as="li">{t}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Tab>
              </Tabs>
            </div>
          </div>
          <Card.Title>Descripción</Card.Title>
          <Card.Text className="text-break ">
            {loadedProduct.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
