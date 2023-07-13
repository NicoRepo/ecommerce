import { Container } from "react-bootstrap";

export const Body = ({ children }) => {
  return (
    <Container className="pt-5">
      <div className="d-flex flex-column">{children}</div>
    </Container>
  );
};
