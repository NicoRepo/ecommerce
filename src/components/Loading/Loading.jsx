import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-5"
      style={{ height: "80vh" }}
    >
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
    </div>
  );
};
